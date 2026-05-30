import Navbar from "@/components/layout/Navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col pt-16">
            <Navbar />
            <main className="flex-grow">{children}</main>
        </div>
    );
}
