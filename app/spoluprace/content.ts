const F = "https://files.site.site3.eu";

export type SpolupraceItem = {
    title: string;
    category: string;
    description: string;
    logo: string;
};

export const SPOLUPRACE_CONTENT = {
    eyebrow: "O škole",
    title: "Spolupráce",
    description:
        "Přehled institucí a partnerů, se kterými MŠ Tyršovka dlouhodobě spolupracuje.",
    items: [
        {
            title: "DDM Modřany",
            category: "Volnočasové centrum",
            description:
                "S DDM Modřany spolupracujeme již spoustu let, ať již zajišťují většinu kroužků u nás v MŠ, či návštěvou jejich divadla, nebo sportovních akcí.",
            logo: `${F}/0e/c8/0ec837a4-fe8a-4ad7-8c3e-8a7963d19888.jpg`,
        },
        {
            title: "ZUŠ Adolfa Voborského",
            category: "Umělecká škola",
            description:
                "Již několik let spolupracujeme s ZUŠ A. Voborského, kde navštěvujeme zkoušky připravovaných vystoupení či zkrácené představení pro děti z MŠ. Několik dětí z naší MŠ začalo uměleckou školu navštěvovat.",
            logo: `${F}/9b/df/9bdf7e51-e0b3-49b2-b216-95b32956d1d8.png`,
        },
        {
            title: "KC Cílkova",
            category: "Komunitní centrum",
            description:
                "V letošním roce jsme navázali spolupráci s komunitním centrem Cílkova, v rámci spolupráce navštívili senioři děti v MŠ.",
            logo: `${F}/3e/03/3e03bf36-e732-4bb2-b727-c7fd3f30a287.jpg`,
        },
        {
            title: "ZŠ TGM",
            category: "Základní škola",
            description:
                "Se základní školou TGM spolupracujeme na provázanosti předškoláků a hladkému přechodu do ZŠ, každoročně navštěvujeme pavilonek, který děti v budoucnu navštěvují.",
            logo: `${F}/76/c7/76c7d817-1bcd-4fc7-a4c8-7ffb81a39878.jpeg`,
        },
        {
            title: "ZŠ Mráčkovka",
            category: "Základní škola",
            description:
                "Se základní školou Mráčkovka spolupracujeme na provázanosti mezi předškoláky a ZŠ, tak i deváté třídy zavítaly k nám do MŠ a strávily tvořivé dopoledne s předškoláky.",
            logo: `${F}/24/53/24539a08-cf50-47a4-a8b6-a41da8b7fc79.jpg`,
        },
        {
            title: "ZŠ Wolfram",
            category: "Základní škola",
            description:
                "Se ZŠ Wolfram spolupracujeme na provázanosti předškoláků se ZŠ. Studenti 8. ročníků nám v letošním roce pomohli s čerty a anděly.",
            logo: `${F}/f9/19/f919aec1-f495-4290-aa5d-38b1c8d72cfe.jpg`,
        },
    ] satisfies SpolupraceItem[],
} as const;
