import type { Metadata } from "next";
import FanZoneClient from "@/components/fanzone/FanZoneClient";

export const metadata: Metadata = {
    title: "फ्यान जोन",
    description: "१२औं गैंडा — नेपाली क्रिकेट प्रेमीहरूको अभिलेख",
};

export default function FanZonePage() {
    return <FanZoneClient />;
}
