const CZECH_MAP: Record<string, string> = {
    á: "a",
    ä: "a",
    č: "c",
    ď: "d",
    é: "e",
    ě: "e",
    í: "i",
    ň: "n",
    ó: "o",
    ö: "o",
    ř: "r",
    š: "s",
    ť: "t",
    ú: "u",
    ů: "u",
    ü: "u",
    ý: "y",
    ž: "z",
};

export function slugifyCs(input: string): string {
    const lowered = input.trim().toLowerCase();
    const transliterated = lowered.replace(/[áäčďéěíňóöřšťúůüýž]/g, (char) => {
        return CZECH_MAP[char] ?? char;
    });
    const slug = transliterated
        .normalize("NFD")
        .replace(/\p{M}/gu, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .replace(/-{2,}/g, "-");
    return slug || "aktualita";
}
