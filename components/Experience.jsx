"use client";
import { motion } from "framer-motion";
import ScrollReveal, { revealItem } from "./ScrollReveal";

const experiences = [
    {
        role: "Full-Stack Software Developer",
        company: "Red Cloud ICT Solutions PLC",
        period: "July 2026 – Current",
        color: "#0EA5E9",
        responsibilities: [
            "Working as a Software Developer at Red Cloud ICT Solutions, contributing to the design, development, and maintenance of web-based software products.",
            "Collaborating in an agile team environment to deliver reliable, user-focused features across the full stack.",
            "Developing and maintaining RESTful APIs and frontend components based on project requirements and technical specifications.",
            "Participating in code reviews, providing constructive feedback, and incorporating senior developer guidance to improve code quality.",
            "Writing unit and integration tests to ensure reliability and catch regressions early in the development cycle.",
            "Troubleshooting and debugging issues across the codebase, documenting findings and fixes for future reference.",
            "Collaborating with cross-functional teams to translate business requirements into clean, maintainable technical solutions using React, Next.js, Node.js, Express.js, MongoDB, and Git.",
        ],
    },
    {
        role: "Software Engineer Intern",
        company: "Eskalate LLC",
        period: "2023",
        color: "#F97316",
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
        color: "#FB923C",
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
        color: "#F97316",
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
                    <span className="text-[#F97316] text-sm font-medium tracking-widest uppercase">
                        Where I&apos;ve Worked
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3">
                        Work <span className="gradient-text !from-[#F97316] !to-[#FB923C]">Experience</span>
                    </h2>
                </ScrollReveal>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#F97316] via-[#FB923C] to-transparent" />

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
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        className="glass rounded-2xl p-6 border border-white/5 hover:border-[#F97316]/50 transition-all duration-300 group cursor-default"
                                    >
                                        <span
                                            className="text-xs font-bold tracking-wider uppercase mb-2 block"
                                            style={{ color: exp.color }}
                                        >
                                            {exp.period}
                                        </span>
                                        <h3 className="font-heading text-xl font-bold text-white mb-1 group-hover:text-[#F97316] transition-colors">
                                            {exp.role}
                                        </h3>
                                        <p className="text-white/50 text-sm mb-4 font-medium">{exp.company}</p>
                                        <ul className="space-y-2">
                                            {exp.responsibilities.map((r, idx) => (
                                                <motion.li
                                                    key={r}
                                                    initial={{ opacity: 0.7 }}
                                                    whileHover={{ opacity: 1, x: 4 }}
                                                    className="flex items-start gap-2 text-white/70 text-sm group-hover:text-white/90 transition-all"
                                                >
                                                    <span style={{ color: exp.color }} className="mt-1 flex-shrink-0 font-bold group-hover:scale-125 transition-transform">▸</span>
                                                    {r}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
