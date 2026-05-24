import type { Metadata } from "next";
import StoryArticleClient from "./StoryArticleClient";
import { getStoryBySlug } from "@/lib/getStories";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { slug } = await params;
    const storyData = getStoryBySlug(slug);

    if (!storyData) {
        return {
            title: "Story Not Found",
        };
    }

    return {
        title: storyData.data.title,
        description: storyData.data.lede,
        openGraph: {
            type: "article",
            locale: "ne_NP",
            images: [storyData.data.heroImage],
        },
        twitter: {
            card: "summary_large_image",
        },
    };
}

export default async function StoryArticlePage({ params }: Props) {
    const { slug } = await params;
    const storyData = getStoryBySlug(slug);

    if (!storyData) {
        notFound();
    }

    return <StoryArticleClient story={storyData.data} htmlContent={storyData.content} />;
}
