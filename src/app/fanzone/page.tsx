import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import FanZoneClient from "@/components/fanzone/FanZoneClient";

export const metadata: Metadata = {
    title: "फ्यान जोन",
    description: "१२औं गैंडा — नेपाली क्रिकेट प्रेमीहरूको अभिलेख",
};

export default function FanZonePage() {
    const filePath = path.join(process.cwd(), "content", "pages", "fanzone.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return <FanZoneClient fans={data.fans} chants={data.chants} />;
}
