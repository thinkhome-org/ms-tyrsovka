"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Photo {
    src: string;
    alt: string;
    rotation: number;
    x: number;
    y: number;
    z: number;
    scale: number;
}

const photos: Photo[] = [
    {
        src: "/tyrsovka-1.jpg",
        alt: "Tyršovka 1",
        rotation: -12,
        x: -8,
        y: -5,
        z: 2,
        scale: 1,
    },
    {
        src: "/tyrsovka-2.jpg",
        alt: "Tyršovka 2",
        rotation: 7,
        x: 12,
        y: -12,
        z: 3,
        scale: 0.95,
    },
    {
        src: "/tyrsovka-1.jpg",
        alt: "Tyršovka 3",
        rotation: -4,
        x: 5,
        y: 8,
        z: 1,
        scale: 1.02,
    },
    {
        src: "/tyrsovka-2.jpg",
        alt: "Tyršovka 4",
        rotation: 14,
        x: -5,
        y: -16,
        z: 4,
        scale: 0.93,
    },
    {
        src: "/tyrsovka-1.jpg",
        alt: "Tyršovka 5",
        rotation: -9,
        x: 18,
        y: 5,
        z: 5,
        scale: 0.97,
    },
];

function PhotoCard({
    photo,
    index,
    mouseX,
    mouseY,
}: {
    photo: Photo;
    index: number;
    mouseX: ReturnType<typeof useMotionValue<number>>;
    mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
    const [isHovered, setIsHovered] = useState(false);

    const parallaxX = useTransform(mouseX, (value) => {
        if (typeof window === "undefined") return 0;
        return (value - window.innerWidth / 2) * 0.01 * (index + 1);
    });
    const parallaxY = useTransform(mouseY, (value) => {
        if (typeof window === "undefined") return 0;
        return (value - window.innerHeight / 2) * 0.01 * (index + 1);
    });

    return (
        <motion.div
            className="absolute cursor-pointer"
            style={{
                x: parallaxX,
                y: parallaxY,
                zIndex: isHovered ? 50 : photo.z,
                left: `calc(50% + ${photo.x}%)`,
                top: `calc(50% + ${photo.y}%)`,
                marginLeft: "-115px",
                marginTop: "-145px",
            }}
            initial={{
                opacity: 0,
                scale: 0.5,
                rotate: photo.rotation + 20,
                y: 80,
            }}
            animate={{
                opacity: 1,
                scale: photo.scale,
                rotate: isHovered ? 0 : photo.rotation,
                y: 0,
            }}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
                delay: index * 0.12,
                rotate: { type: "spring", stiffness: 200, damping: 15 },
            }}
            whileHover={{
                scale: 1.12,
                y: -15,
                transition: { duration: 0.25 },
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div
                className={`
                    relative bg-white p-2 sm:p-3 rounded-sm
                    w-[160px] h-[200px]
                    sm:w-[180px] sm:h-[230px]
                    md:w-[200px] md:h-[260px]
                    lg:w-[230px] lg:h-[290px]
                    transition-shadow duration-300
                    ${isHovered
                        ? "shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
                        : "shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                    }
                `}
            >
                <div className="relative w-full h-full overflow-hidden rounded-[1px]">
                    <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 240px, 260px"
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default function Hero() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section className="relative flex min-h-screen w-full overflow-hidden bg-[#f5f5f5] px-6 text-zinc-900">
            <div className="flex w-full max-w-6xl items-center">
                {/* Text Content */}
                <div className="z-10 flex max-w-2xl flex-col justify-start text-left gap-8 pt-20 pb-32 ml-28">
                    <h1 className="text-6xl font-bold tracking-tight text-black sm:text-7xl md:text-8xl">
                        MŠ Tyršovka
                    </h1>
                    <p className="max-w-xl text-lg leading-relaxed text-zinc-700 sm:text-xl">
                        Jsme MŠ zaměřená na výchovu a vzdělávání ke zdravému
                        životnímu stylu. Klademe důraz na sportovní a pohybové
                        aktivity, pestré stravování, prevenci rizikového
                        chování, rozvoj emoční a sociální inteligence a
                        psychické odolnosti.
                    </p>
                    <div className="mt-12 text-sm text-zinc-500">
                        popojedte nize
                    </div>
                </div>
            </div>

            {/* Photo Pile */}
            <div className="absolute right-0 top-0 w-[40%] h-full flex items-center justify-center pointer-events-none">
                <div className="relative w-full h-full pointer-events-auto">
                    {photos.map((photo, index) => (
                        <PhotoCard
                            key={index}
                            photo={photo}
                            index={index}
                            mouseX={mouseX}
                            mouseY={mouseY}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
