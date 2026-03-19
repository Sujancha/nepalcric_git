import type { Metadata, ResolvingMetadata } from "next";
import StoryArticleClient from "./StoryArticleClient";
import { stories } from "@/lib/storiesData";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const story = stories.find(s => s.slug === slug);

    if (!story) {
        return {
            title: "Story Not Found",
        };
    }

    return {
        title: story.title,
        description: story.lede,
        openGraph: {
            type: "article",
            locale: "ne_NP",
            images: [story.heroImage],
        },
        twitter: {
            card: "summary_large_image",
        },
    };
}

export default async function StoryArticlePage({ params }: Props) {
    const { slug } = await params;
    const story = stories.find(s => s.slug === slug);

    if (!story) {
        notFound();
    }

    return <StoryArticleClient story={story as any} />;
}
