import Hero from "./components/hero";
import Aktuality from "./components/aktuality";
import ProcMy from "./components/proc-my";
import DostaneteZapisy from "./components/dostanete-zapisy";
import { buildPageMetadata, buildAbsoluteUrl } from "@/lib/seo";

const homeMetadata = buildPageMetadata({
    title: "MŠ Tyršovka",
    description:
        "Mateřská škola Tyršovka v Praze 4 – Modřanech. Zápisy, aktuality, režim dne a kontakty pro rodiče.",
    path: "/",
});
export const metadata = {
    ...homeMetadata,
    title: undefined,
};

function getOrganizationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Mateřská škola Tyršovka",
        url: buildAbsoluteUrl(""),
        logo: buildAbsoluteUrl("/logo.png"),
        address: {
            "@type": "PostalAddress",
            streetAddress: "Lysinská 184/45",
            addressLocality: "Praha 4 - Modřany",
            postalCode: "143 00",
            addressCountry: "CZ",
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+420-737-381-935",
            email: "reditelka@tyrsovka.cz",
            contactType: "customer service",
            areaServed: "CZ",
        },
    };
}

export default function Home() {
    return (
        <main className="flex min-h-screen flex-1 flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(getOrganizationJsonLd()),
                }}
            />
            <Hero />
            <ProcMy />
            <Aktuality />
            <DostaneteZapisy />
        </main>
    );
}
