"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { projects } from "@/data/projects";
import ScrollReveal, { revealItem } from "./ScrollReveal";

const ProjectScene = dynamic(() => import("@/components/three/ProjectScene"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center text-white/40">
            <div className="text-center">
                <div className="w-12 h-12 rounded-full border-2 border-[#8B5CF6] border-t-transparent animate-spin mx-auto mb-4" />
                <p className="text-sm">Loading 3D Gallery…</p>
            </div>
        </div>
    ),
});

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="projects" className="section-padding">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal className="text-center mb-8">
                    <span className="text-[#22D3EE] text-sm font-medium tracking-widest uppercase">
                        What I&apos;ve Built
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="text-white/50 mt-4 text-sm">
                        Drag to rotate · Click a card to explore
                    </p>
                </ScrollReveal>

                {/* 3D Gallery */}
                <ScrollReveal direction="up" delay={0.2} className="h-[480px] w-full rounded-3xl overflow-hidden glass mb-10">
                    <ProjectScene onSelect={setSelectedProject} />
                </ScrollReveal>

                {/* Featured Projects — ZemaHub & NewsBrief */}
                {projects.filter((p) => p.featured).map((proj, fi) => (
                    <ScrollReveal
                        key={proj.id}
                        direction={fi % 2 === 0 ? "left" : "right"}
                        delay={0.3}
                        className="mb-6"
                    >
                        <motion.div
                            whileHover={{ y: -4 }}
                            className="relative glass rounded-3xl p-7 md:p-9 cursor-pointer overflow-hidden transition-all"
                            onClick={() => setSelectedProject(proj)}
                            style={{
                                border: `1px solid ${proj.color}20`,
                                boxShadow: `0 0 40px ${proj.color}0D`,
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.border = `1px solid ${proj.color}50`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.border = `1px solid ${proj.color}20`; }}
                        >
                            {/* Featured badge */}
                            <span className="absolute top-5 right-5 text-xs font-semibold px-3 py-1 rounded-full"
                                style={{ background: `${proj.color}15`, color: proj.color, border: `1px solid ${proj.color}30` }}>
                                ⭐ Featured Project
                            </span>

                            {/* Background glow */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                                style={{ background: `${proj.color}12` }} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">{proj.title}</h3>
                                    <p className="text-sm font-medium mb-4" style={{ color: proj.color }}>{proj.role}</p>
                                    <p className="text-white/65 leading-relaxed mb-5 text-sm md:text-base">{proj.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {proj.tech.map((t) => (
                                            <span key={t} className="text-xs px-3 py-1 rounded-full font-medium"
                                                style={{ background: `${proj.color}15`, color: proj.color }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-3">
                                        <a
                                            href={proj.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all"
                                            style={{ background: `linear-gradient(135deg, ${proj.color}, #8B5CF6)` }}
                                        >
                                            🌐 Live Demo
                                        </a>
                                        <a
                                            href={proj.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-white/15 text-white hover:border-[#8B5CF6] transition-all"
                                        >
                                            🐙 GitHub
                                        </a>
                                    </div>
                                </div>
                                {/* Stats side */}
                                <div className="grid grid-cols-2 gap-4">
                                    {(proj.stats || []).map((stat) => (
                                        <div key={stat.label} className="glass rounded-xl p-4 text-center">
                                            <p className="text-white font-semibold text-sm">{stat.value}</p>
                                            <p className="text-white/40 text-xs mt-1">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </ScrollReveal>
                ))}

                {/* Other Project Cards */}
                <ScrollReveal stagger={true} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.filter((p) => !p.featured).map((proj) => (
                        <motion.div
                            key={proj.id}
                            variants={revealItem}
                            whileHover={{ y: -4 }}
                            onClick={() => setSelectedProject(proj)}
                            className="glass rounded-2xl p-6 cursor-pointer hover:border-white/20 transition-all"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="font-heading font-bold text-xl text-white">{proj.title}</h3>
                                    <span className="text-sm font-medium" style={{ color: proj.color }}>
                                        {proj.role}
                                    </span>
                                </div>
                                <div
                                    className="w-3 h-3 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: proj.color, boxShadow: `0 0 8px ${proj.color}` }}
                                />
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed mb-4">{proj.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {proj.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="text-xs px-2 py-0.5 rounded-full"
                                        style={{ background: `${proj.color}15`, color: proj.color }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </ScrollReveal>

            </div>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass rounded-3xl p-8 max-w-lg w-full"
                            style={{ borderColor: `${selectedProject.color}40` }}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-heading text-2xl font-bold text-white">
                                        {selectedProject.title}
                                    </h3>
                                    <p className="font-medium mt-1" style={{ color: selectedProject.color }}>
                                        {selectedProject.role}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="text-white/40 hover:text-white text-2xl leading-none"
                                >
                                    ×
                                </button>
                            </div>
                            <p className="text-white/70 leading-relaxed mb-6">{selectedProject.description}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedProject.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="text-xs px-3 py-1 rounded-full font-medium"
                                        style={{ background: `${selectedProject.color}20`, color: selectedProject.color }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-3">
                                {selectedProject.link && selectedProject.link !== "#" && (
                                    <a
                                        href={selectedProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-3 rounded-xl font-medium text-center text-white transition-all shadow-lg"
                                        style={{
                                            background: `linear-gradient(135deg, ${selectedProject.color}, #8B5CF6)`,
                                            boxShadow: `0 4px 15px ${selectedProject.color}30`
                                        }}
                                    >
                                        🌐 Live Demo
                                    </a>
                                )}
                                {selectedProject.github && selectedProject.github !== "#" && (
                                    <a
                                        href={selectedProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-3 rounded-xl font-medium text-center border border-white/15 text-white hover:border-[#8B5CF6] transition-all"
                                    >
                                        🐙 GitHub
                                    </a>
                                )}
                            </div>
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="w-full mt-4 py-2 text-sm font-medium text-white/40 hover:text-white transition-all"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
