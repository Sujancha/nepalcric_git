import BalenShahClient from './BalenShahClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'उनले आफैलाई मेटाए — बालेन्द्र शाहको कथा | NepalCric',
    description:
        'काठमाडौंको हिरो बन्नका लागि, बालेन्द्र शाहले पहिले आफैलाई मेटाउनु पर्यो। र्यापरदेखि इन्जिनियर, मेयरदेखि प्रधानमन्त्री-मनोनीत — यो नेपालको सबैभन्दा अप्रत्याशित कथा हो।',
    openGraph: {
        title: 'उनले आफैलाई मेटाए — बालेन्द्र शाहको कथा',
        description: 'काठमाडौंको हिरो बन्नका लागि, उनले पहिले आफैलाई मेटाउनु पर्यो।',
        url: 'https://nepalcric.com/balen-shah',
        siteName: 'NepalCric',
        images: [
            {
                url: '/images/balen_profile.jpg',
                width: 1200,
                height: 630,
                alt: 'बालेन्द्र शाह — NepalCric',
            },
        ],
        locale: 'ne_NP',
        type: 'article',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'उनले आफैलाई मेटाए — बालेन्द्र शाहको कथा',
        description: 'काठमाडौंको हिरो बन्नका लागि, उनले पहिले आफैलाई मेटाउनु पर्यो।',
        images: ['/images/balen_profile.jpg'],
    },
};

export default function BalenShahPage() {
    return <BalenShahClient />;
}
