"use client";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PlanetScene = dynamic(() => import("@/components/three/PlanetScene"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#8B5CF6] border-t-transparent animate-spin" />
        </div>
    ),
});

const badges = [
    { label: "A2SV Fellow", color: "border-[#22D3EE] text-[#22D3EE]" },
    { label: "Competitive Programmer", color: "border-[#8B5CF6] text-[#8B5CF6]" },
    { label: "400+ Problems Solved", color: "border-[#EC4899] text-[#EC4899]" },
];

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative min-h-screen flex items-center overflow-hidden"
        >
            {/* Background gradient blobs */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-6 pt-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Text */}
                <motion.div 
                    style={{ y: y2, opacity }}
                    className="order-2 lg:order-1"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block text-[#22D3EE] text-sm font-medium tracking-widest uppercase mb-4">
                            Hello — I&apos;m
                        </span>

                        <h1 className="font-heading text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-tight mb-4">
                            Anteneh{" "}
                            <span className="gradient-text">Getnet</span>
                        </h1>

                        <div className="flex gap-3 flex-wrap mb-6">
                            <span className="font-heading text-xl text-white/80">Software Engineer</span>
                            <span className="text-white/30">·</span>
                            <span className="font-heading text-xl text-white/80">Full-Stack Developer</span>
                        </div>

                        <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-lg">
                            I design and build scalable digital systems, interactive web platforms,
                            and high-performance applications that make an impact.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {badges.map((b) => (
                                <span
                                    key={b.label}
                                    className={`text-xs font-medium px-3 py-1 rounded-full border ${b.color} bg-white/5`}
                                >
                                    {b.label}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-4 flex-wrap">
                            <motion.button
                                onClick={() =>
                                    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
                                }
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-6 py-3 rounded-full font-medium bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white shadow-lg hover:shadow-purple-500/30 transition-all"
                            >
                                Explore My Work
                            </motion.button>
                            <motion.button
                                onClick={() =>
                                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                                }
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-6 py-3 rounded-full font-medium border border-white/20 text-white hover:border-[#8B5CF6] transition-all"
                            >
                                Contact Me
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right: Profile Image */}
                <motion.div
                    style={{ y: y1, scale, opacity }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="order-1 lg:order-2 flex items-center justify-center"
                >
                    <div className="relative flex items-center justify-center">
                        {/* Outer animated glow ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full"
                            style={{
                                background:
                                    "conic-gradient(from 0deg, #8B5CF6, #22D3EE, #EC4899, #8B5CF6)",
                                padding: "3px",
                                borderRadius: "50%",
                            }}
                        >
                            <div className="w-full h-full rounded-full bg-[#0F172A]" />
                        </motion.div>

                        {/* Second slower counter-rotating ring */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[360px] h-[360px] md:w-[445px] md:h-[445px] rounded-full"
                            style={{
                                border: "1px dashed rgba(139, 92, 246, 0.3)",
                                borderRadius: "50%",
                            }}
                        />

                        {/* Floating profile image */}
                        <motion.div
                            animate={{ y: [0, -14, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10 w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full overflow-hidden"
                            style={{
                                boxShadow:
                                    "0 0 40px rgba(139,92,246,0.6), 0 0 80px rgba(34,211,238,0.25), 0 0 0 4px rgba(139,92,246,0.3)",
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/Anteneh_Getnet.jpg"
                                alt="Anteneh Getnet"
                                className="w-full h-full object-cover object-top"
                            />
                            {/* Subtle gradient overlay at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#0F172A]/60 to-transparent" />
                        </motion.div>

                        {/* Floating badge: A2SV */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute top-4 -right-4 md:right-2 glass px-3 py-1.5 rounded-full text-xs font-medium text-[#22D3EE] border border-[#22D3EE]/40 z-20"
                        >
                            🚀 A2SV Fellow
                        </motion.div>

                        {/* Floating badge: 400+ */}
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-6 -left-4 md:left-0 glass px-3 py-1.5 rounded-full text-xs font-medium text-[#EC4899] border border-[#EC4899]/40 z-20"
                        >
                            ⚡ 400+ Problems
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs"
            >
                <span>Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-px h-8 bg-gradient-to-b from-[#8B5CF6] to-transparent"
                />
            </motion.div>
        </section>
    );
}
