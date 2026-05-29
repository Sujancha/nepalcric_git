import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import MatchDayClient from './MatchDayClient';

export const metadata: Metadata = {
    title: "म्याच डे | nepalCRIC",
    description: "नेपाल क्रिकेटका आगामी युद्धहरू",
};

export default function MatchDayPage() {
    const filePath = path.join(process.cwd(), 'content', 'pages', 'match-day.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    return <MatchDayClient data={data} />;
}
