"use client";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { useEffect, useState, useCallback } from "react";

const allSkills = skillCategories.flatMap(cat => cat.skills);

const DIRECTIONS = [
    { name: "left-to-right", initial: { left: "-10%", top: "var(--top)" }, animate: { left: "110%" } },
    { name: "right-to-left", initial: { left: "110%", top: "var(--top)" }, animate: { left: "-10%" } },
    { name: "top-to-bottom", initial: { top: "-10%", left: "var(--left)" }, animate: { top: "110%" } },
    { name: "bottom-to-top", initial: { top: "110%", left: "var(--left)" }, animate: { top: "-10%" } },
];

export default function SkillBackground() {
    const [mounted, setMounted] = useState(false);
    const [activeIcons, setActiveIcons] = useState([]);
    const [counter, setCounter] = useState(0);

    const spawnIcon = useCallback(() => {
        const skill = allSkills[Math.floor(Math.random() * allSkills.length)];
        const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
        const id = Date.now() + Math.random();

        // Random placement along the orthogonal axis
        const offset = Math.random() * 80 + 10; // 10% to 90%

        const newIcon = {
            id,
            skill,
            direction,
            offset,
            duration: 15 + Math.random() * 15,
        };

        setActiveIcons(prev => [...prev.slice(-15), newIcon]); // Keep last 15 icons max for performance
    }, []);

    useEffect(() => {
        setMounted(true);
        // Spawn first few icons
        for (let i = 0; i < 5; i++) {
            setTimeout(spawnIcon, i * 2000);
        }

        const interval = setInterval(() => {
            spawnIcon();
        }, 4000); // Spawn a new icon every 4 seconds

        return () => clearInterval(interval);
    }, [spawnIcon]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
            <AnimatePresence>
                {activeIcons.map((icon) => {
                    const Icon = icon.skill.icon;
                    const style = {
                        "--top": `${icon.offset}%`,
                        "--left": `${icon.offset}%`,
                        color: icon.skill.color
                    };

                    return (
                        <motion.div
                            key={icon.id}
                            className="absolute pointer-events-none opacity-[0.08] text-5xl sm:text-7xl"
                            initial={icon.direction.initial}
                            animate={{
                                ...icon.direction.animate,
                                rotate: [0, 360]
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: icon.duration,
                                ease: "linear"
                            }}
                            onAnimationComplete={() => {
                                setActiveIcons(prev => prev.filter(i => i.id !== icon.id));
                            }}
                            style={style}
                        >
                            <Icon />
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
