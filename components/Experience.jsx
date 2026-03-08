"use client";
import { motion } from "framer-motion";
import ScrollReveal, { revealItem } from "./ScrollReveal";

const experiences = [
    {
        role: "Software Engineer Intern",
        company: "Eskalate LLC",
        period: "2023",
        color: "#8B5CF6",
        responsibilities: [
            "Built a job listing application using React and TypeScript",
            "Implemented Jest and Cypress testing suites",
            "Improved frontend performance by 30%",
            "Collaborated with a 7-member engineering team",
        ],
    },
    {
        role: "React Mentor",
        company: "Google Developer Groups (GDG)",
        period: "2023 – 2024",
        color: "#22D3EE",
        responsibilities: [
            "Mentored 70+ students in React development",
            "Coached 8 developers individually to production-level projects",
            "Organized hackathon training sessions",
            "Achieved 90% project completion rate",
        ],
    },
    {
        role: "A2SV Software Engineering Fellow",
        company: "Africa to Silicon Valley (A2SV)",
        period: "2022 – Present",
        color: "#EC4899",
        responsibilities: [
            "Solved 400+ algorithmic challenges on LeetCode and Codeforces",
            "Built production-grade applications in team sprints",
            "Participated in Google-backed technical training programs",
            "Mentored incoming fellows on data structures and algorithms",
        ],
    },
];

export default function Experience() {
    return (
        <section id="experience" className="section-padding">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal className="text-center mb-16">
                    <span className="text-[#22D3EE] text-sm font-medium tracking-widest uppercase">
                        Where I&apos;ve Worked
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3">
                        Work <span className="gradient-text">Experience</span>
                    </h2>
                </ScrollReveal>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#8B5CF6] via-[#22D3EE] to-transparent" />

                    <ScrollReveal stagger={true} className="space-y-12">
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={exp.role}
                                variants={revealItem}
                                className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* Dot */}
                                <div
                                    className="absolute left-6 md:left-1/2 top-6 w-4 h-4 rounded-full border-2 border-white -translate-x-1/2 z-10"
                                    style={{ backgroundColor: exp.color, boxShadow: `0 0 12px ${exp.color}` }}
                                />

                                {/* Card */}
                                <div className={`ml-16 md:ml-0 md:w-5/12 ${i % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"}`}>
                                    <div className="glass rounded-2xl p-6 hover:border-white/20 transition-colors">
                                        <span
                                            className="text-xs font-medium tracking-wide uppercase mb-2 block"
                                            style={{ color: exp.color }}
                                        >
                                            {exp.period}
                                        </span>
                                        <h3 className="font-heading text-xl font-bold text-white mb-1">
                                            {exp.role}
                                        </h3>
                                        <p className="text-white/50 text-sm mb-4">{exp.company}</p>
                                        <ul className="space-y-2">
                                            {exp.responsibilities.map((r) => (
                                                <li key={r} className="flex items-start gap-2 text-white/70 text-sm">
                                                    <span style={{ color: exp.color }} className="mt-1 flex-shrink-0">▸</span>
                                                    {r}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
