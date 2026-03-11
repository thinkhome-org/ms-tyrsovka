import Hero from "./components/hero";
import Aktuality from "./components/aktuality";
import ProcMy from "./components/proc-my";
import DostaneteZapisy from "./components/dostanete-zapisy";

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
