// Admin mirror for /scoreboard/[id] — inherits AdminBar via admin layout
import ScoreboardDetail from '@/app/scoreboard/[id]/page';
export { generateStaticParams, generateMetadata } from '@/app/scoreboard/[id]/page';
export default ScoreboardDetail;
