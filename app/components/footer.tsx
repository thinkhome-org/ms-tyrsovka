import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FOOTER_COLUMNS } from "@/lib/site-nav";
import { getSchoolContact } from "@/lib/cms/settings";

export default async function Footer() {
    const contact = await getSchoolContact();

    return (
        <footer data-site-footer id="kontakt" className="w-full bg-black text-white">
            <div className="page-shell py-14 sm:py-16">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="relative h-14 w-14 overflow-hidden rounded-md bg-white/10">
                                <Image
                                    src="/logo.png"
                                    alt="MŠ Tyršovka"
                                    fill
                                    className="object-contain p-2"
                                    sizes="56px"
                                />
                            </div>
                            <div>
                                <div className="text-xl font-semibold tracking-tight text-white">
                                    {contact.name}
                                </div>
                                <div className="text-sm text-white/65">Mateřská škola</div>
                            </div>
                        </div>
                        <div className="space-y-1 text-sm leading-relaxed text-white/75">
                            <p>{contact.address}</p>
                            <p>
                                <a href={contact.phoneHref} className="hover:text-white">
                                    {contact.phone}
                                </a>
                            </p>
                            <p>
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="hover:text-white"
                                >
                                    {contact.email}
                                </a>
                            </p>
                        </div>
                    </div>

                    {FOOTER_COLUMNS.map((column) => (
                        <div key={column.title} className="space-y-3">
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/55">
                                {column.title}
                            </p>
                            <ul className="space-y-2 text-sm text-white/75">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            target={link.external ? "_blank" : undefined}
                                            rel={link.external ? "noopener noreferrer" : undefined}
                                            className="inline-flex items-center gap-1 hover:text-white"
                                        >
                                            {link.label}
                                            {link.external ? (
                                                <ArrowUpRight className="size-3.5 opacity-70" />
                                            ) : null}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center border-t border-white/10 pt-8">
                    <a
                        href="https://www.thinkhome.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-6 items-center gap-2 opacity-50 transition-opacity hover:opacity-70"
                        aria-label="Vytvořeno Thinkhome"
                    >
                        <span className="text-xs leading-none text-white">Vytvořeno</span>
                        <Image
                            src="https://raw.githubusercontent.com/thinkhome-org/web-new/master/images/logo/primary/SVG%20Transparent/primary_white-on-transparent.svg"
                            alt="Thinkhome"
                            width={100}
                            height={21}
                            className="block h-5 w-auto"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
}
