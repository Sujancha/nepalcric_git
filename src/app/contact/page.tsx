import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: "सम्पर्क",
    description: "नेपालक्रिकसँग सम्पर्कमा रहनुहोस्",
};

export default function ContactPage() {
    return <ContactClient />;
}
