import { cn } from "@/lib/utils";

export function AktualitaBody({
    html,
    className,
}: {
    html: string;
    className?: string;
}) {
    if (!html) return null;
    return (
        <div
            className={cn("aktualita-body", className)}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
