import type { Metadata } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";
import Footer from "./components/footer";

const lora = Lora({
    variable: "--font-heading-serif",
    subsets: ["latin", "latin-ext"],
});

const sourceSans3 = Source_Sans_3({
    variable: "--font-source-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "MŠ Tyršovka",
    description: "Moderní web mateřské školy MŠ Tyršovka.",
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="cs">
            <body
                className={`${lora.variable} ${sourceSans3.variable} flex min-h-screen flex-col antialiased font-sans`}
            >
                <Nav />
                {children}
                <Footer />
            </body>
        </html>
    );
}
