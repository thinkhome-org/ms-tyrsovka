import Hero from "./components/hero";
import Aktuality from "./components/aktuality";
import ProcMy from "./components/proc-my";
import DostaneteZapisy from "./components/dostanete-zapisy";
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
        <main className="flex min-h-screen flex-1 flex-col">
            <Hero />
            <ProcMy />
            <Aktuality />

            <DostaneteZapisy />
        </main>
    );
}
