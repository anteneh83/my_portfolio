"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal, { revealItem } from "./ScrollReveal";

const stats = [
    { value: 400, suffix: "+", label: "Algorithmic Problems Solved" },
    { value: 5, suffix: "+", label: "Production Projects" },
    { value: 70, suffix: "+", label: "Students Mentored" },
    { value: 200, suffix: "+", label: "Active Users" },
];

function AnimatedCounter({ target, suffix, inView }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const duration = 1800;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target]);
    return (
        <span>
            {count}
            {suffix}
        </span>
    );
}

export default function About() {
    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

    return (
        <section id="about" className="section-padding">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal className="text-center mb-16">
                    <span className="text-[#F97316] text-sm font-medium tracking-widest uppercase">
                        Get To Know Me
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-0">
                        About <span className="gradient-text !from-[#F97316] !to-[#FB923C]">Me</span>
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Text */}
                    <ScrollReveal direction="left" delay={0.2} className="space-y-5 text-white/70 text-lg leading-relaxed">
                        <p>
                            I am a <span className="text-white font-medium">Software Engineer</span> specializing in
                            full-stack web development and scalable system design.
                        </p>
                        <p>
                            Currently completing my Software Engineering degree at{" "}
                            <span className="text-[#F97316] font-medium">
                                Addis Ababa Science and Technology University
                            </span>{" "}
                            while participating in the{" "}
                            <span className="text-[#FB923C] font-medium">
                                Africa to Silicon Valley (A2SV)
                            </span>{" "}
                            program backed by Google.
                        </p>
                        <p>
                            I have solved{" "}
                            <span className="text-[#F97316] font-medium">400+ algorithmic challenges</span> and
                            built multiple production-level applications using modern technologies like React,
                            Next.js, Node.js, and Docker.
                        </p>
                        <p>
                            I enjoy building efficient systems, mentoring developers, and solving complex
                            engineering problems that create real-world impact.
                        </p>

                        <div className="flex flex-wrap gap-3 pt-4">
                            {["ASTU Student", "A2SV Fellow", "Google-backed", "Hackathon Winner"].map((tag) => (
                                <span
                                    key={tag}
                                    className="glass px-3 py-1 rounded-full text-sm text-white/80 border border-white/5 hover:border-[#F97316]/30 transition-colors"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </ScrollReveal>

                    {/* Stats */}
                    <div ref={statsRef}>
                        <ScrollReveal direction="right" delay={0.4} stagger={true} className="grid grid-cols-2 gap-6">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    variants={revealItem}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="glass rounded-2xl p-6 text-center border border-white/5 hover:border-[#F97316]/50 transition-all duration-300 group"
                                    style={{ boxShadow: "0 0 0 rgba(249, 115, 22, 0)" }}
                                >
                                    <div className="font-heading text-4xl font-bold gradient-text !from-[#F97316] !to-[#FB923C] mb-2 group-hover:scale-110 transition-transform">
                                        <AnimatedCounter
                                            target={stat.value}
                                            suffix={stat.suffix}
                                            inView={statsInView}
                                        />
                                    </div>
                                    <p className="text-white/60 text-sm leading-snug group-hover:text-white/80 transition-colors">{stat.label}</p>
                                </motion.div>
                            ))}
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
