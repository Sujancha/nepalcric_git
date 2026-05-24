import type { Metadata } from "next";
import StoryArticleClient from "./StoryArticleClient";
import { getStoryBySlug, getAllStories } from "@/lib/getStories";
import type { StoryFrontmatter } from "@/lib/storyTypes";
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

    // Compute recommendation on the server so the Client Component never imports `fs`
    const allStories = getAllStories();
    const currentIndex = allStories.findIndex(s => s.slug === slug);
    const recoStory = allStories.length > 1
        ? allStories[(currentIndex + 1) % allStories.length]
        : null;

    return <StoryArticleClient story={storyData.data} htmlContent={storyData.content} recoStory={recoStory} />;
}
