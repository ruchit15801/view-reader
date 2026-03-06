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
import ReaderBackground from "./ReaderBackground";

gsap.registerPlugin(ScrollTrigger);

export default function ReaderPage({ children }: { children: React.ReactNode }) {

    const progress = useScrollProgress();
    const { range, clearSelection } = useTextSelection()
    const [fontSize, setFontSize] = useState(14);
    const [showFont, setShowFont] = useState(false);
    const [showTheme, setShowTheme] = useState(false);
    const [theme, setTheme] = useState("light");
    const storyRef = useRef<HTMLDivElement | null>(null);
    const [contentHtml, setContentHtml] = useState<string | null>(null);
    const triggersRef = useRef<ScrollTrigger[]>([]);

    const attachScrollAnimation = (node: HTMLElement, index = 0) => {

        const animate = () => {
            gsap.fromTo(
                node,
                { scale: 1 },
                {
                    scale: 20,
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1,
                    delay: index * 0.6,
                    ease: "power2.out"
                }
            )
        }

        const trigger = ScrollTrigger.create({
            trigger: node,
            start: "top 80%",
            onEnter: animate,
            onEnterBack: animate
        })
        triggersRef.current.push(trigger);

    }

    useEffect(() => {

        const saved = localStorage.getItem("reader-content");
        if (saved) setContentHtml(saved);
    }, []);

    useEffect(() => {
        if (!storyRef.current) return;

        // kill old triggers before re-creating
        triggersRef.current.forEach((t) => t.kill());
        triggersRef.current = [];

        const nodes = storyRef.current.querySelectorAll(".reaction-emoji");
        nodes.forEach((n, i) => {
            if (n instanceof HTMLElement) attachScrollAnimation(n, i);
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());
    }, [contentHtml]);

    useEffect(() => {
        return () => {
            triggersRef.current.forEach((t) => t.kill());
            triggersRef.current = [];
        };
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
            const count = storyRef.current?.querySelectorAll(".reaction-emoji").length ?? 0
            attachScrollAnimation(emojiNode, count)
            const html = storyRef.current?.innerHTML ?? "";
            localStorage.setItem("reader-content", html);
            setContentHtml(html);

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

        <div className={theme === "dark" ? "text-white min-h-screen" : "text-black min-h-screen"}>
            <ReaderBackground theme={theme} />

            {/* STORY */}

            <div
                ref={storyRef}
                className={`reader-content-panel max-w-4xl mx-auto pb-24 pt-10 px-6 leading-8 rounded-2xl mt-6 ${
                    theme === "dark"
                        ? "reader-panel-dark text-white"
                        : theme === "paper"
                            ? "reader-panel-paper text-black"
                            : "reader-panel-light text-black"
                }`}

                style={{ fontSize }}
            >
                {contentHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                ) : (
                    children
                )}
            </div>

            {/* CONTROLS */}

            <ReaderControls
                progress={progress}
                openFont={() => setShowFont(true)}
                openTheme={() => setShowTheme(true)}
                theme={theme}
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