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

                {/* Featured Projects Grid (2 columns for ZemaHub & NewsBrief) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {projects.filter((p) => p.featured && p.id <= 2).map((proj, fi) => (
                        <ScrollReveal
                            key={proj.id}
                            direction={fi % 2 === 0 ? "left" : "right"}
                            delay={0.2}
                        >
                            <motion.div
                                whileHover={{ y: -4 }}
                                className="relative glass rounded-2xl p-6 md:p-7 cursor-pointer overflow-hidden transition-all h-full flex flex-col group"
                                onClick={() => setSelectedProject(proj)}
                                style={{
                                    border: `1px solid ${proj.color}20`,
                                    boxShadow: `0 0 30px ${proj.color}08`,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.border = `1px solid ${proj.color}`;
                                    e.currentTarget.style.boxShadow = `0 0 40px ${proj.color}25`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.border = `1px solid ${proj.color}20`;
                                    e.currentTarget.style.boxShadow = `0 0 30px ${proj.color}08`;
                                }}
                            >
                                {/* Featured badge */}
                                <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full z-10"
                                    style={{ background: `${proj.color}15`, color: proj.color, border: `1px solid ${proj.color}30` }}>
                                    ⭐ FEATURED
                                </span>

                                <div className="relative z-10 flex flex-col h-full">
                                    <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-1">{proj.title}</h3>
                                    <p className="text-xs font-semibold mb-3 tracking-wider uppercase" style={{ color: proj.color }}>{proj.role}</p>
                                    <p className="text-white/60 leading-relaxed mb-5 text-xs md:text-sm line-clamp-3">{proj.description}</p>

                                    <div className="mt-auto">
                                        <div className="flex flex-wrap gap-1.5 mb-5">
                                            {proj.tech.slice(0, 4).map((t) => (
                                                <span key={t} className="text-[10px] px-2 py-0.5 rounded-md font-semibold"
                                                    style={{ background: `${proj.color}15`, color: proj.color }}>
                                                    {t}
                                                </span>
                                            ))}
                                            {proj.tech.length > 4 && (
                                                <span className="text-[10px] text-white/30 flex items-center">+{proj.tech.length - 4}</span>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 mb-5">
                                            {(proj.stats || []).slice(0, 4).map((stat) => (
                                                <div key={stat.label} className="bg-white/5 rounded-lg p-2 text-center border border-white/5 leading-tight">
                                                    <p className="text-white font-bold text-[10px] truncate">{stat.value}</p>
                                                    <p className="text-white/30 text-[9px] uppercase tracking-tighter">{stat.label}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex gap-2">
                                            <a
                                                href={proj.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex-1 text-center py-2 rounded-lg text-xs font-bold text-white transition-all"
                                                style={{ background: `linear-gradient(135deg, ${proj.color}, #F97316)` }}
                                            >
                                                DEMO
                                            </a>
                                            <a
                                                href={proj.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex-1 text-center py-2 rounded-lg text-xs font-bold border border-white/10 text-white hover:border-[#F97316] transition-all"
                                            >
                                                GITHUB
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Third Featured Project (Wekil AI) - Full Width or Balanced below */}
                {projects.filter((p) => p.featured && p.id === 3).map((proj) => (
                    <ScrollReveal
                        key={proj.id}
                        direction="up"
                        delay={0.3}
                        className="mb-8"
                    >
                        <motion.div
                            whileHover={{ y: -4 }}
                            className="relative glass rounded-2xl p-6 md:p-7 cursor-pointer overflow-hidden transition-all group"
                            onClick={() => setSelectedProject(proj)}
                            style={{
                                border: `1px solid ${proj.color}20`,
                                boxShadow: `0 0 30px ${proj.color}08`,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.border = `1px solid ${proj.color}`;
                                e.currentTarget.style.boxShadow = `0 0 40px ${proj.color}25`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.border = `1px solid ${proj.color}20`;
                                e.currentTarget.style.boxShadow = `0 0 30px ${proj.color}08`;
                            }}
                        >
                            <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full z-10"
                                style={{ background: `${proj.color}15`, color: proj.color, border: `1px solid ${proj.color}30` }}>
                                ⭐ FEATURED
                            </span>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                                <div className="md:col-span-3">
                                    <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-1">{proj.title}</h3>
                                    <p className="text-xs font-semibold mb-3 tracking-wider uppercase" style={{ color: proj.color }}>{proj.role}</p>
                                    <p className="text-white/60 leading-relaxed mb-5 text-sm">{proj.description}</p>
                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {proj.tech.map((t) => (
                                            <span key={t} className="text-[10px] px-2 py-0.5 rounded-md font-semibold"
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
                                            className="px-6 py-2 rounded-lg text-xs font-bold text-white transition-all shadow-lg"
                                            style={{ background: `linear-gradient(135deg, ${proj.color}, #F97316)` }}
                                        >
                                            🌐 LIVE DEMO
                                        </a>
                                        <a
                                            href={proj.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="px-6 py-2 rounded-lg text-xs font-bold border border-white/10 text-white hover:border-[#F97316] transition-all"
                                        >
                                            🐙 GITHUB
                                        </a>
                                    </div>
                                </div>
                                <div className="md:col-span-2 grid grid-cols-2 gap-3">
                                    {(proj.stats || []).map((stat) => (
                                        <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                                            <p className="text-white font-bold text-xs">{stat.value}</p>
                                            <p className="text-white/30 text-[10px] uppercase mt-1 tracking-tight">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </ScrollReveal>
                ))}

                {/* Other Projects - Infinite Auto-Rotating Carousel */}
                <div className="relative mt-12 overflow-hidden py-10">
                    <div className="flex w-max">
                        <motion.div
                            animate={{
                                x: [0, -100 * (projects.filter(p => !p.featured).length)],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 40,
                                    ease: "linear",
                                },
                            }}
                            className="flex gap-6"
                        >
                            {[...projects.filter((p) => !p.featured), ...projects.filter((p) => !p.featured)].map((proj, idx) => (
                                <ProjectCard
                                    key={`${proj.id}-${idx}`}
                                    proj={proj}
                                    setSelectedProject={setSelectedProject}
                                />
                            ))}
                        </motion.div>
                    </div>
                    {/* Gradient Overlays for smooth edges */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030014] to-transparent z-10 pointer-events-none" />
                </div>
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
                            <p className="text-white/70 leading-relaxed mb-6 text-sm">{selectedProject.description}</p>
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

function ProjectCard({ proj, setSelectedProject }) {
    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => setSelectedProject(proj)}
            className="w-[350px] flex-shrink-0 glass rounded-2xl p-6 cursor-pointer overflow-hidden transition-all border border-white/5 active:scale-95"
            style={{
                border: `1px solid ${proj.color}20`,
                boxShadow: `0 0 20px ${proj.color}05`,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.border = `1px solid ${proj.color}`;
                e.currentTarget.style.boxShadow = `0 0 30px ${proj.color}20`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.border = `1px solid ${proj.color}20`;
                e.currentTarget.style.boxShadow = `0 0 20px ${proj.color}05`;
            }}
        >
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="font-heading font-bold text-xl text-white truncate w-[240px]">{proj.title}</h3>
                    <span className="text-sm font-medium" style={{ color: proj.color }}>
                        {proj.role}
                    </span>
                </div>
                <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: proj.color, boxShadow: `0 0 8px ${proj.color}` }}
                />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2 h-10">{proj.description}</p>
            <div className="flex flex-wrap gap-2">
                {proj.tech.slice(0, 3).map((t) => (
                    <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: `${proj.color}15`, color: proj.color }}
                    >
                        {t}
                    </span>
                ))}
                {proj.tech.length > 3 && (
                    <span className="text-[10px] text-white/30 flex items-center">+{proj.tech.length - 3} more</span>
                )}
            </div>
        </motion.div>
    );
}
