"use client";
import { motion } from "framer-motion";
import ScrollReveal, { revealItem } from "./ScrollReveal";

const achievements = [
    {
        icon: "🏛️",
        title: "Presidential Award",
        subtitle: "Addis Ababa Science and Technology University",
        desc: "Awarded by the President of AASTU for academic excellence. Recognized as top 1% of all students.",
        color: "#F59E0B",
    },
    {
        icon: "🏆",
        title: "GDG Hackathon — 2nd Place",
        subtitle: "Google Developer Groups",
        desc: "Competed against 48 teams and won 2nd place with an innovative technical solution.",
        color: "#8B5CF6",
    },
    {
        icon: "👩‍💻",
        title: "Technical Coach",
        subtitle: "SheCodes Hackathon",
        desc: "Mentored 47 teams across 14 universities as a Technical Coach, empowering the next generation of developers.",
        color: "#22D3EE",
    },
    {
        icon: "⚡",
        title: "A2SV Fellow",
        subtitle: "Africa to Silicon Valley",
        desc: "Selected for the prestigious Google-backed A2SV program, solving 400+ algorithmic problems.",
        color: "#EC4899",
    },
];

export default function Achievements() {
    return (
        <section id="achievements" className="section-padding">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal className="text-center mb-16">
                    <span className="text-[#22D3EE] text-sm font-medium tracking-widest uppercase">
                        Milestones
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3">
                        Achievements & <span className="gradient-text">Awards</span>
                    </h2>
                </ScrollReveal>

                <ScrollReveal stagger={true} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {achievements.map((ach) => (
                        <motion.div
                            key={ach.title}
                            variants={revealItem}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="glass rounded-2xl p-6 text-center cursor-default transition-all group"
                            style={{ borderColor: `${ach.color}20` }}
                        >
                            <div
                                className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl"
                                style={{ background: `${ach.color}15`, border: `1px solid ${ach.color}30` }}
                            >
                                {ach.icon}
                            </div>
                            <h3 className="font-heading font-bold text-white text-lg mb-1 group-hover:text-[color:var(--c)] transition-colors"
                                style={{ "--c": ach.color }}>
                                {ach.title}
                            </h3>
                            <p className="text-xs font-medium mb-3" style={{ color: ach.color }}>
                                {ach.subtitle}
                            </p>
                            <p className="text-white/60 text-sm leading-relaxed">{ach.desc}</p>
                        </motion.div>
                    ))}
                </ScrollReveal>
            </div>
        </section>
    );
}
