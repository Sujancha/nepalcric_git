import BalenShahClient from './BalenShahClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'उनले आफैलाई मेटाए — बालेन्द्र शाहको कथा | NepalCric',
    description:
        'तहखानाको र्‍यापरबाट नेपालको ४० औं प्रधानमन्त्रीसम्म — बालेन्द्र शाहको कथा। नेपालको पहिलो मधेशी प्रधानमन्त्री। सबैभन्दा कान्छो प्रधानमन्त्री। यो नेपालको सबैभन्दा अप्रत्याशित कथा हो।',
    openGraph: {
        title: 'उनले आफैलाई मेटाए — बालेन्द्र शाहको कथा',
        description: 'तहखानाको र्‍यापरबाट नेपालको ४० औं प्रधानमन्त्रीसम्म — नेपालको पहिलो मधेशी प्रधानमन्त्री।',
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
        description: 'तहखानाको र्‍यापरबाट नेपालको ४० औं प्रधानमन्त्रीसम्म — नेपालको पहिलो मधेशी प्रधानमन्त्री।',
        images: ['/images/balen_profile.jpg'],
    },
};

export default function BalenShahPage() {
    return <BalenShahClient />;
}
