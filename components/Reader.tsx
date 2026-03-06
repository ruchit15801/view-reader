"use client";

import ReaderControls from "@/components/ReaderControls";
import FontModal from "@/components/FontModal";
import ThemeModal from "@/components/ThemeModal";
import useScrollProgress from "@/hooks/useScrollProgress";
import { useEffect, useRef, useState } from "react";
import useTextSelection from "@/hooks/useTextSelection";
import ReactionPopup from "./ReactionPopup";
import confetti from "canvas-confetti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ReaderPage() {

    const progress = useScrollProgress();
    const { range, clearSelection } = useTextSelection()
    const [fontSize, setFontSize] = useState(18);
    const [showFont, setShowFont] = useState(false);
    const [showTheme, setShowTheme] = useState(false);
    const [theme, setTheme] = useState("light");
    const storyRef = useRef<HTMLDivElement | null>(null);

    const attachScrollAnimation = (node: HTMLElement) => {
        gsap.to(node, {
            scale: 20,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: node,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    };

    useEffect(() => {
        const saved = localStorage.getItem("reader-content");
        if (saved && storyRef.current) {
            storyRef.current.innerHTML = saved;

            const nodes = storyRef.current.querySelectorAll(".reaction-emoji");
            nodes.forEach((n) => {
                if (n instanceof HTMLElement) {
                    attachScrollAnimation(n);
                }
            });

            ScrollTrigger.refresh();
        }
    }, []);

    const addReaction = (emoji: string) => {

        const sel = window.getSelection()
        if (!sel || sel.rangeCount === 0) return

        const range = sel.getRangeAt(0)

        const text = range.toString()
        const wrapper = document.createElement("span")
        wrapper.className = "reaction-wrapper"
        wrapper.style.display = "inline-block"
        wrapper.style.position = "relative"

        const letters = text.split("")

        letters.forEach((l) => {
            const span = document.createElement("span")
            span.textContent = l
            span.className = "particle-letter"
            span.style.display = "inline-block"
            wrapper.appendChild(span)

        })

        range.deleteContents()
        range.insertNode(wrapper)

        const particles = wrapper.querySelectorAll(".particle-letter")

        gsap.fromTo(
            wrapper,
            { x: -3 },
            { x: 3, duration: 0.07, repeat: 4, yoyo: true }
        )

        const tl = gsap.timeline()

        tl.to(particles, {
            x: () => gsap.utils.random(-50, 50),
            y: () => gsap.utils.random(-60, -20),
            rotation: () => gsap.utils.random(-180, 180),
            scale: () => gsap.utils.random(0.6, 1.3),
            opacity: 0,
            duration: 2,
            ease: "power3.out"
        })

        tl.add(() => {

            wrapper.innerHTML = text

            let emojiNode: HTMLElement

            if (emoji.startsWith("/")) {

                const img = document.createElement("img")
                img.src = emoji
                img.className = "reaction-emoji"

                img.style.width = "32px"
                img.style.height = "32px"
                img.style.marginLeft = "6px"
                img.style.display = "inline-block"
                img.style.verticalAlign = "middle"
                img.style.objectFit = "contain"

                emojiNode = img

            } else {

                const span = document.createElement("span")
                span.textContent = emoji
                span.className = "reaction-emoji"

                span.style.marginLeft = "6px"
                span.style.fontSize = "30px"
                span.style.lineHeight = "1"
                span.style.display = "inline-block"
                span.style.verticalAlign = "middle"

                emojiNode = span

            }

            wrapper.appendChild(emojiNode)
            attachScrollAnimation(emojiNode);
            const html = storyRef.current?.innerHTML ?? "";
            localStorage.setItem("reader-content", html);

        })

        // confetti
        const rect = wrapper.getBoundingClientRect()

        confetti({
            particleCount: 120,
            spread: 70,
            origin: {
                x: rect.left / window.innerWidth,
                y: rect.top / window.innerHeight
            }
        })

    }

    return (

        <div className={theme === "dark"
            ? "bg-black text-white min-h-screen"
            : "bg-white text-black min-h-screen"}>

            {/* STORY */}

            <div ref={storyRef}
                className="max-w-3xl mx-auto pb-24 pt-10 px-6 leading-8"
                style={{ fontSize }}
            >

                <h1 className="text-[36px] text-center font-bold mb-2">
                    Wicked Resonance
                </h1>

                <h2 className="text-gray-500 text-center mb-8 text-[24px]">
                    Mira Hartley
                </h2>

                <h3 className="font-semibold text-center mb-4 text-[20px]">
                    Table of Contents
                </h3>

                <ul className="text-blue-600 mb-10">
                    <li>Chapter One</li>
                    <li>Chapter Two</li>
                    <li>Chapter Three</li>
                    <li>Chapter Four</li>
                    <li>Chapter Five</li>
                    <li>Chapter Six</li>
                    <li>Chapter Seven</li>
                    <li>Chapter Eight</li>
                    <li>Chapter Nine</li>
                    <li>Chapter Ten</li>
                    <li>Chapter Eleven</li>
                    <li>Chapter Twelve</li>
                    <li>Chapter Thirteen</li>
                    <li>Chapter Fourteen</li>
                    <li>Chapter Fifteen</li>
                    <li>Chapter Sixteen</li>
                    <li>Chapter Seventeen</li>
                    <li>Chapter Eighteen</li>
                    <li>Chapter Nineteen</li>
                    <li>Chapter Twenty</li>
                    <li>Chapter Twenty-One</li>
                    <li>Chapter Twenty-Two</li>
                    <li>Chapter Twenty-Three</li>
                    <li>Chapter Twenty-Four</li>
                    <li>Chapter Twenty-Five</li>
                    <li>Chapter Twenty-Six</li>
                    <li>Chapter Twenty-Seven</li>
                    <li>Chapter Twenty-Eight</li>
                </ul>

                <div className="text-center my-8">
                    ━━━━༻❁༺━━━━
                </div>

                <h1 className="text-5xl font-semibold mb-6">
                    Chapter One
                </h1>

                <p className="mb-6">
                    I could tell it was going to be bad by the way Dave smiled.
                </p>
                <p className="mb-6">
                    Not his ‘congrats on the Pulitzer’ smile. His ‘brace yourself’ smile.
                </p>
                <p className="mb-6">
                    He stood politely, waving me to one of the two empty chairs before his desk. One might expect courtesy from one’s Editor-in-Chief, but in Dave’s case, it meant he wanted something—and that didn’t bode well either.
                </p>
                <p className="mb-6">
                    “Great work on the airline exposé.”
                </p>
                <p className="mb-6">
                    “Thank you,” I said carefully, wishing he’d skip the pleasantries and drop the shoe.
                </p>
                <p className="mb-6">
                    “Do you have anything else on the go right now?”
                </p>

                <p className="mb-6">
                    He knew I didn’t. “No… Looking for something new. Meaningful. A challenge.” Hopefully, that should dissuade him from asking me to cover a local ‘hero’ or some such crap. Feel-good social pieces really weren’t my forte.
                </p>

                <p className="mb-6">
                    “Grand! I have just the thing.” He was far too enthusiastic, as if trying to instil the same fervour in me. I knew him too well; it had the opposite effect.
                </p>
                <p className="mb-6">
                    I folded my arms. “Okay. Lay it on me.”
                </p>

                <p className="mb-6">
                    He reclined back in his chair, resting his elbows on the arms and steepling his fingers.
                </p>

                <p className="mb-6">
                    “You know Tyler Stone, I presume?”
                </p>

                <p className="mb-6">
                    Oh, crap. “I know of him, of course. Songwriter and lead vocalist for Wicked Resonance. Why?” I already knew why.
                </p>

                <p className="mb-6">
                    “He’s on tour across the States, and I think we should write a profile on him for the annual special in December.”
                </p>

                <p className="mb-6">
                    “Oh, that’s interesting,” I kept my tone apathetic. It probably wouldn’t make any difference, but I could at least try to get out of this.
                </p>

                <p className="mb-6">
                    He smiled again. “I’m glad you think so.” He knew I didn’t. “You’d be the perfect person for the job.”
                </p>

                <p className="mb-6">
                    “It’s a kind offer, but—”
                </p>

                <p className="mb-6">
                    “It’s not an offer, Miss Mitchell.” The smile had gone, and he’d used my surname. Crap, crap.
                </p>

            </div>

            {/* CONTROLS */}

            <ReaderControls
                progress={progress}
                openFont={() => setShowFont(true)}
                openTheme={() => setShowTheme(true)}
            />

            <ReactionPopup
                selection={range}
                onReact={(emoji) => {
                    addReaction(emoji)
                    window.getSelection()?.removeAllRanges()
                    clearSelection()
                }}
            />
            {/* MODALS */}

            {showFont && (
                <FontModal
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    close={() => setShowFont(false)}
                />
            )}

            {showTheme && (
                <ThemeModal
                    setTheme={setTheme}
                    close={() => setShowTheme(false)}
                />
            )}

        </div>
    );
}