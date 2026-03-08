"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleHover = (e) => {
            const target = e.target;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.getAttribute("role") === "button" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleHover);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleHover);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Main Circle */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#8B5CF6] pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    scale: isHovering ? 2.5 : 1,
                    backgroundColor: isHovering ? "rgba(139, 92, 246, 0.3)" : "transparent",
                }}
            />
            {/* Inner Dot */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#22D3EE] pointer-events-none z-[10000] hidden md:block"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: 13,
                    translateY: 13,
                }}
            />
        </>
    );
}
