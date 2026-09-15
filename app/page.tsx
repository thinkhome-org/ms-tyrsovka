import Hero from "./components/hero";
import { HomePaths } from "./components/home-paths";
import { HomeParentLinks } from "./components/home-parent-links";
import Aktuality from "./components/aktuality";
import ProcMy from "./components/proc-my";
import { HomeGallery } from "./components/home-gallery";
import HomeLocation from "./components/home-location";
import { buildPageMetadata, buildAbsoluteUrl } from "@/lib/seo";

const homeMetadata = buildPageMetadata({
    title: "MŠ Tyršovka",
    description:
        "Mateřská škola Tyršovka v Praze 4 – Modřanech. Informace pro zájemce i rodiče, aktuality a kontakty.",
    path: "/",
});
export const metadata = {
    ...homeMetadata,
    title: { absolute: "MŠ Tyršovka" },
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
            <HomePaths />
            <HomeParentLinks />
            <Aktuality />
            <ProcMy />
            <HomeGallery />
            <HomeLocation />
        </main>
    );
}
