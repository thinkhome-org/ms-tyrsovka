import type { Metadata } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";
import Footer from "./components/footer";
import { CookieBanner } from "./components/cookie-banner";
import { SiteAnalytics } from "./components/site-analytics";
import { getBaseUrl, defaultMetadata } from "@/lib/seo";

const lora = Lora({
    variable: "--font-heading-serif",
    subsets: ["latin", "latin-ext"],
});

const sourceSans3 = Source_Sans_3({
    variable: "--font-source-sans",
    subsets: ["latin"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    metadataBase: new URL(getBaseUrl()),
    title: {
        default: defaultMetadata.siteName,
        template: `%s | ${defaultMetadata.siteName}`,
    },
    description: defaultMetadata.defaultDescription,
    icons: {
        icon: "/logo.png",
    },
    openGraph: {
        title: defaultMetadata.siteName,
        description: defaultMetadata.defaultDescription,
        locale: "cs_CZ",
        type: "website",
        images: [{ url: "/logo.png", width: 548, height: 520, alt: defaultMetadata.siteName }],
    },
    twitter: {
        card: "summary_large_image",
        title: defaultMetadata.siteName,
        description: defaultMetadata.defaultDescription,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="cs" data-scroll-behavior="smooth">
            <body
                className={`${lora.variable} ${sourceSans3.variable} flex min-h-screen flex-col antialiased font-sans`}
            >
                <Nav />
                {children}
                <Footer />
                <CookieBanner />
                <SiteAnalytics />
            </body>
        </html>
    );
}
