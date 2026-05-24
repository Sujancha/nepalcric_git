import Link from 'next/link';
import { getAllStories } from '@/lib/getStories';

export default function AdminStoriesPage() {
    const stories = getAllStories();
    const featured = stories.filter((s) => s.featured);
    const rest = stories.filter((s) => !s.featured);

    return (
        <div style={{ minHeight: '100vh', background: '#07080F', padding: '2.5rem 1.5rem' }}>
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>

                {/* Header */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginBottom: '2.5rem',
                        paddingBottom: '1.25rem',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                    }}
                >
                    <div>
                        <Link
                            href="/admin/dashboard"
                            style={{
                                fontFamily: 'var(--font-barlow), sans-serif',
                                fontSize: '0.65rem',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                color: '#6B7280',
                                textDecoration: 'none',
                                display: 'block',
                                marginBottom: '0.5rem',
                            }}
                        >
                            ← ड्यासबोर्ड
                        </Link>
                        <h1
                            style={{
                                fontFamily: 'var(--font-bebas), sans-serif',
                                fontSize: '1.75rem',
                                letterSpacing: '0.08em',
                                color: '#C9A84C',
                                margin: 0,
                                lineHeight: 1,
                            }}
                        >
                            कथाहरू
                        </h1>
                    </div>
                </div>

                {/* Add Story Button could go here */}
                <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <Link
                        href="#"
                        style={{
                            fontFamily: 'var(--font-barlow), sans-serif',
                            fontSize: '0.75rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            background: '#C41E3A',
                            color: 'white',
                            padding: '0.6rem 1.2rem',
                            borderRadius: '4px',
                            textDecoration: 'none',
                        }}
                    >
                        + नयाँ कथा थप्नुस्
                    </Link>
                </div>

                {/* Featured stories */}
                {featured.length > 0 && (
                    <div style={{ marginBottom: '2.5rem' }}>
                        <span
                            style={{
                                fontFamily: 'var(--font-barlow), sans-serif',
                                fontSize: '0.6rem',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: '#C9A84C',
                                display: 'block',
                                marginBottom: '0.75rem',
                            }}
                        >
                            फिचर्ड कथाहरू
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {featured.map((story) => (
                                <StoryRow key={story.slug} story={story} />
                            ))}
                        </div>
                    </div>
                )}

                {/* All stories */}
                <div>
                    <span
                        style={{
                            fontFamily: 'var(--font-barlow), sans-serif',
                            fontSize: '0.6rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: '#6B7280',
                            display: 'block',
                            marginBottom: '0.75rem',
                        }}
                    >
                        सबै कथाहरू ({stories.length})
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {rest.map((story) => (
                            <StoryRow key={story.slug} story={story} />
                        ))}
                    </div>
                </div>

                <p
                    style={{
                        marginTop: '2.5rem',
                        fontFamily: 'var(--font-barlow), sans-serif',
                        fontSize: '0.65rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#6B7280',
                        textAlign: 'center',
                    }}
                >
                    <Link href="/" style={{ color: '#6B7280', textDecoration: 'none' }}>
                        ← साइटमा फर्किनुस्
                    </Link>
                </p>
            </div>
        </div>
    );
}

function StoryRow({ story }: { story: { slug: string; title: string; category: string; date: string; featured: boolean } }) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.875rem 1rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                gap: '1rem',
            }}
        >
            <div style={{ flex: 1, minWidth: 0 }}>
                <p
                    style={{
                        fontFamily: 'var(--font-mukta), sans-serif',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        color: '#E8E8E8',
                        margin: '0 0 0.2rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {story.title}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span
                        style={{
                            fontFamily: 'var(--font-barlow), sans-serif',
                            fontSize: '0.6rem',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: '#C9A84C',
                        }}
                    >
                        {story.category}
                    </span>
                    <span
                        style={{
                            fontFamily: 'var(--font-barlow), sans-serif',
                            fontSize: '0.6rem',
                            letterSpacing: '0.1em',
                            color: '#6B7280',
                        }}
                    >
                        {story.date}
                    </span>
                </div>
            </div>
            <Link
                href={`/admin/story/${story.slug}`}
                rel="noopener noreferrer"
                style={{
                    fontFamily: 'var(--font-barlow), sans-serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#6B7280',
                    textDecoration: 'none',
                    flexShrink: 0,
                    padding: '0.3rem 0.6rem',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'color 0.15s, border-color 0.15s',
                }}
            >
                हेर्नुस् ↗
            </Link>
        </div>
    );
}
