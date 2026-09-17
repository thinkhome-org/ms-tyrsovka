import { SCHOOL_CONTACT } from "@/lib/site-nav";

export function SchoolMap({
    className,
    address = SCHOOL_CONTACT.address,
}: {
    className?: string;
    address?: string;
}) {
    return (
        <div className={className}>
            <div className="overflow-hidden rounded-xl bg-muted">
                <div className="aspect-16/10 w-full">
                    <iframe
                        title="Mapa – MŠ Tyršovka"
                        src="https://www.google.com/maps?q=M%C5%A0+Tyr%C5%A1ovka,+Lysinsk%C3%A1+184%2F45,+Praha+4&z=16&output=embed"
                        className="h-full w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {address}
            </p>
        </div>
    );
}
