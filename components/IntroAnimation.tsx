"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

interface IntroAnimationProps {
    onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {

    const title = useRef<HTMLHeadingElement>(null);

    useEffect(() => {

        const tl = gsap.timeline({
            onComplete: () => onComplete()
        });

        // LEFT CLOUDS
        tl.to(".cloud-left", {
            xPercent: -200,
            duration: 2,
            ease: "power3.inOut",
            stagger: 0.15
        });

        // RIGHT CLOUDS
        tl.to(
            ".cloud-right",
            {
                xPercent: 200,
                duration: 2,
                ease: "power3.inOut",
                stagger: 0.15
            },
            "<"
        );

        tl.fromTo(
            title.current,
            { opacity: 0, y: 80 },
            { opacity: 1, y: 0, duration: 1 }
        );

    }, [onComplete]);

    return (

        <div className="relative h-screen w-full overflow-hidden">

            {/* BACKGROUND IMAGE */}

            <Image
                src="/bg1.png"  
                alt="hero"
                fill
                className="object-cover"
                priority
            />

            {/* CLOUDS */}

            <div className="absolute inset-0 pointer-events-none">

                <Image
                    src="/Cloud2.png"
                    alt="cloud"
                    width={700}
                    height={300}
                    className="cloud cloud-left absolute top-[5%] left-[5%]"
                />

                <Image
                    src="/Cloud2.png"
                    alt="cloud"
                    width={500}
                    height={250}
                    className="cloud cloud-left absolute top-[20%] left-[18%]"
                />

                <Image
                    src="/Cloud2.png"
                    alt="cloud"
                    width={600}
                    height={280}
                    className="cloud cloud-left absolute top-[35%] left-[8%]"
                />

                <Image
                    src="/Cloud2.png"
                    alt="cloud"
                    width={700}
                    height={300}
                    className="cloud cloud-right absolute top-[8%] right-[5%]"
                />

                <Image
                    src="/Cloud2.png"
                    alt="cloud"
                    width={500}
                    height={250}
                    className="cloud cloud-right absolute top-[22%] right-[15%]"
                />

                <Image
                    src="/Cloud2.png"
                    alt="cloud"
                    width={600}
                    height={280}
                    className="cloud cloud-right absolute top-[38%] right-[8%]"
                />

            </div>

            {/* TITLE */}

            <div className="absolute inset-0 flex items-center justify-center z-10">

                <h1
                    ref={title}
                    className="text-white text-6xl font-bold drop-shadow-lg"
                >
                    Wicked Resonance
                </h1>

            </div>

        </div>

    );
}