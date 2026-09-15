import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Redakce",
    robots: { index: false, follow: false },
};

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div data-admin-shell className="admin-shell flex min-h-screen flex-1 flex-col">
            {children}
        </div>
    );
}
