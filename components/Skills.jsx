"use client";
import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import SkillsCloud from "./three/SkillsCloud";
import ScrollReveal, { revealItem } from "./ScrollReveal";

export default function Skills() {
    return (
        <section id="skills" className="section-padding relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#22D3EE]/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto">
                <ScrollReveal className="text-center mb-16">
                    <span className="text-[#22D3EE] text-sm font-medium tracking-widest uppercase">
                        The Tools of My Trade
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3">
                        Technical <span className="gradient-text">Skills</span>
                    </h2>
                    <p className="text-white/50 mt-4 max-w-2xl mx-auto">
                        A mix of technologies I've mastered and use daily to build high-performance applications.
                    </p>
                </ScrollReveal>

                {/* 3D Skills Cloud */}
                <ScrollReveal direction="up" delay={0.3} duration={1} className="mb-20 glass rounded-3xl overflow-hidden border border-white/5 relative">
                    <SkillsCloud />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
                        <span className="text-[10px] uppercase tracking-tighter text-white/60 font-medium">Interactive 3D Skills Orbit</span>
                    </div>
                </ScrollReveal>

                {/* Categories Grid */}
                <ScrollReveal stagger={true} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skillCategories.map((cat) => (
                        <motion.div
                            key={cat.category}
                            variants={revealItem}
                            className="glass rounded-2xl p-7 border border-white/5 hover:border-[#8B5CF6]/30 transition-all duration-300 relative group"
                        >
                            <h3 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-gradient-to-r from-[#8B5CF6] to-transparent rounded-full" />
                                {cat.category}
                            </h3>
                            <div className="grid grid-cols-3 gap-6">
                                {cat.skills.map((skill) => {
                                    const Icon = skill.icon;
                                    return (
                                        <motion.div
                                            key={skill.name}
                                            whileHover={{ y: -5, scale: 1.1 }}
                                            className="flex flex-col items-center gap-2 group/skill"
                                        >
                                            <div
                                                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl transition-all duration-300 group-hover/skill:bg-white/10 group-hover/skill:border-white/20 shadow-lg"
                                                style={{ color: skill.color }}
                                            >
                                                <Icon />
                                            </div>
                                            <span className="text-[10px] text-white/40 font-medium truncate w-full text-center group-hover/skill:text-white/80 transition-colors">
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </ScrollReveal>
            </div>
        </section>
    );
}
