import type { Metadata } from 'next';
import MatchDayClient from './MatchDayClient';

export const metadata: Metadata = {
    title: "म्याच डे | NepalCric",
    description: "नेपाल क्रिकेटका आगामी युद्धहरू",
};

export default function MatchDayPage() {
    return <MatchDayClient />;
}
