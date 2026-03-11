export type SpolupraceItem = {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
};

export const SPOLUPRACE_CONTENT = {
    eyebrow: "O škole",
    title: "Spolupráce",
    description:
        "Přehled institucí a partnerů, se kterými MŠ Tyršovka dlouhodobě spolupracuje. Obsah vychází z původní stránky školy a je upravený do nového přehlednějšího rozložení.",
    items: [
        {
            title: "DDM Modřany",
            description:
                "S DDM Modřany spolupracujeme již spoustu let, ať již zajišťují většinu kroužků u nás v MŠ, či návštěvou jejich divadla, nebo sportovních akcí.",
            image: "/spoluprace/placeholder.svg",
            imageAlt: "DDM Modřany",
        },
        {
            title: "ZUŠ Adolfa Voborského",
            description:
                "Již několik let spolupracujeme s ZUŠ A. Voborského, kde navštěvujeme zkoušky připravovaných vystoupení či zkrácené představení pro děti z MŠ. Několik dětí z naší MŠ začalo uměleckou školu navštěvovat.",
            image: "/spoluprace/placeholder.svg",
            imageAlt: "ZUŠ Adolfa Voborského",
        },
        {
            title: "KC Cílkova",
            description:
                "V letošním roce jsme navázali spolupráci s komunitním centrem Cílkova, v rámci spolupráce navštívili senioři děti v MŠ.",
            image: "/spoluprace/placeholder.svg",
            imageAlt: "KC Cílkova",
        },
        {
            title: "ZŠ TGM",
            description:
                "Se základní školou TGM spolupracujeme na provázanosti předškoláků a hladkému přechodu do ZŠ, každoročně navštěvujeme pavilonek, který děti v budoucnu navštěvují.",
            image: "/spoluprace/placeholder.svg",
            imageAlt: "ZŠ TGM",
        },
        {
            title: "ZŠ Mráčkovka",
            description:
                "Se základní školou Mráčkovka spolupracujeme na provázanosti mezi předškoláky a ZŠ, tak i deváté třídy zavítaly k nám do MŠ a strávily tvořivé dopoledne s předškoláky.",
            image: "/spoluprace/placeholder.svg",
            imageAlt: "ZŠ Mráčkovka",
        },
        {
            title: "ZŠ Wolfram",
            description:
                "Se ZŠ Wolfram spolupracujeme, ať již na provázanosti předškoláků se ZŠ, nebo dokonce studenti 8. ročníků nám v letošním roce pomohli s čerty a anděly.",
            image: "/spoluprace/placeholder.svg",
            imageAlt: "ZŠ Wolfram",
        },
    ] satisfies SpolupraceItem[],
} as const;
