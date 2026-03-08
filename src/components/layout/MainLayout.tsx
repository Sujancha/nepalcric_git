import Navbar from "@/components/layout/Navbar";
import AudioFAB from "@/components/layout/AudioFAB";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col pt-16">
            <Navbar />
            <AudioFAB />
            <main className="flex-grow">{children}</main>
        </div>
    );
}
