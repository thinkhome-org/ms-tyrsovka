import Hero from "./components/hero";
import Aktuality from "./components/aktuality";
import LogoLoop from "../components/LogoLoop";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";

const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            <Hero />
            <Aktuality />
            <LogoLoop logos={techLogos} speed={30} fadeOut scaleOnHover gap={60} logoHeight={40} />
        </main>
    );
}
