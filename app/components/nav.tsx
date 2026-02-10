"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const NAV_ITEMS = [
    { label: "Aktuality", href: "#" },
    { label: "Informace", href: "#", hasDropdown: true },
    { label: "O škole", href: "#", hasDropdown: true },
    { label: "Jídelníček", href: "#" },
    { label: "Fotogalerie", href: "#", hasDropdown: true },
    { label: "Správa MŠ", href: "#", icon: true },
    { label: "Kontakt", href: "#" },
];

const DROPDOWN_CONTENT = {
    "Informace": [
        { label: "Důležité dokumenty", href: "#" },
        { label: "Provozní řád", href: "#" },
        { label: "Školní řád", href: "#" },
        { label: "Poplatky", href: "#" },
    ],
    "O skole": [
        { label: "Historie školy", href: "#" },
        { label: "Pedagogický tým", href: "#" },
        { label: "Vybavení", href: "#" },
        { label: "Akce a projekty", href: "#" },
    ],
    "Fotogalerie": [
        { label: "Školní rok 2025/26", href: "#" },
        { label: "Školní rok 2024/25", href: "#" },
        { label: "Školní akce", href: "#" },
        { label: "Výlety", href: "#" },
    ],
};

export default function Nav() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openDropdown && dropdownRefs.current[openDropdown]) {
                const dropdown = dropdownRefs.current[openDropdown];
                if (dropdown && !dropdown.contains(event.target as Node)) {
                    setOpenDropdown(null);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openDropdown]);

    const toggleDropdown = (label: string) => {
        setOpenDropdown(openDropdown === label ? null : label);
    };

    return (
        <header className="w-full bg-white">
            <nav className="w-full overflow-visible">
                <div className="flex w-full items-center justify-between bg-white px-6 py-2 overflow-visible">
                    <div className="flex flex-wrap items-center gap-4 overflow-visible">
                        <Link href="/" className="flex items-center">
                            <Image src="/logo.png" alt="MS Tyršovka logo" width={60} height={60} priority />
                        </Link>
                        {NAV_ITEMS.slice(0, 5).map((item) => (
                            <div 
                                key={item.label} 
                                className="relative"
                                ref={(el) => {
                                    if (item.hasDropdown) {
                                        dropdownRefs.current[item.label] = el;
                                    }
                                }}
                            >
                                {item.hasDropdown ? (
                                    <button
                                        onClick={() => toggleDropdown(item.label)}
                                        className="flex h-8 items-center gap-2 rounded-lg border border-black/10 bg-white/80 px-3 text-sm font-medium uppercase tracking-wide text-zinc-800 shadow-sm transition hover:bg-[#A0C4FF]"
                                    >
                                        {item.label}
                                        <span aria-hidden className="text-zinc-500">
                                            <svg 
                                                viewBox="0 0 12 8" 
                                                className={`h-2 w-3 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`}
                                                fill="none"
                                            >
                                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </button>
                                ) : (
                                    <Link href={item.href} className="flex h-8 items-center gap-2 rounded-lg border border-black/10 bg-white/80 px-3 text-sm font-medium uppercase tracking-wide text-zinc-800 shadow-sm transition hover:bg-[#A0C4FF]">
                                        {item.label}
                                    </Link>
                                )}
                                
                                {item.hasDropdown && openDropdown === item.label && (
                                    <div className="absolute top-full left-0 mt-2 w-56 z-50">
                                        <div className="rounded-xl border border-white/20 bg-white/70 backdrop-blur-md shadow-xl p-2">
                                            {DROPDOWN_CONTENT[item.label as keyof typeof DROPDOWN_CONTENT]?.map((dropdownItem) => (
                                                <Link
                                                    key={dropdownItem.label}
                                                    href={dropdownItem.href}
                                                    className="block px-4 py-2.5 text-sm font-medium text-zinc-700 rounded-lg transition-colors hover:bg-white/60 hover:text-zinc-900"
                                                    onClick={() => setOpenDropdown(null)}
                                                >
                                                    {dropdownItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={NAV_ITEMS[5].href} className="flex h-8 items-center gap-2 rounded-lg border border-black/10 bg-white/80 px-3 text-sm font-medium uppercase tracking-wide text-zinc-800 shadow-sm transition hover:bg-white">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100">
                                <svg viewBox="0 0 24 24" className="h-3 w-3 text-zinc-600" fill="none">
                                    <path d="M8 10.5C8 8.57 9.57 7 11.5 7C13.43 7 15 8.57 15 10.5C15 12.43 13.43 14 11.5 14C9.57 14 8 12.43 8 10.5Z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M5 18.5C6.5 16.5 9 15.5 11.5 15.5C14 15.5 16.5 16.5 18 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M11.5 2.5C6.53 2.5 2.5 6.53 2.5 11.5C2.5 16.47 6.53 20.5 11.5 20.5C16.47 20.5 20.5 16.47 20.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </span>
                            {NAV_ITEMS[5].label}
                        </Link>
                        <Link href={NAV_ITEMS[6].href} className="flex h-8 items-center gap-2 rounded-lg border border-black/10 bg-white/80 px-3 text-sm font-medium uppercase tracking-wide text-zinc-800 shadow-sm transition hover:bg-white">
                            {NAV_ITEMS[6].label}
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
