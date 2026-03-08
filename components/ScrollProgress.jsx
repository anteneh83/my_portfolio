"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    // Smooth out the progress bar movement
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B5CF6] via-[#22D3EE] to-[#EC4899] origin-left z-[100]"
            style={{ scaleX }}
        />
    );
}
