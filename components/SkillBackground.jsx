"use client";
import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { useEffect, useState } from "react";

const allSkills = skillCategories.flatMap(cat => cat.skills);

const FloatingIcon = ({ skill, index }) => {
    // Randomize initial position and animation parameters
    const [initialX, setInitialX] = useState(0);
    const [initialY, setInitialY] = useState(0);
    const [duration, setDuration] = useState(25);
    const [delay, setDelay] = useState(0);

    useEffect(() => {
        setInitialX(Math.random() * 100);
        setInitialY(Math.random() * 100);
        setDuration(20 + Math.random() * 30);
        setDelay(Math.random() * -20); // Negative delay to start mid-animation
    }, []);

    const Icon = skill.icon;

    return (
        <motion.div
            className="absolute pointer-events-none opacity-[0.03] text-4xl sm:text-6xl"
            initial={{
                left: `${initialX}%`,
                top: `${initialY}%`
            }}
            animate={{
                left: ["-10%", "110%"],
                top: [`${initialY}%`, `${(initialY + 20) % 100}%`],
                rotate: [0, 360]
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay
            }}
            style={{ color: skill.color }}
        >
            <Icon />
        </motion.div>
    );
};

export default function SkillBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
            {allSkills.map((skill, i) => (
                <FloatingIcon key={`${skill.name}-${i}`} skill={skill} index={i} />
            ))}
            {/* Duplicate icons for better coverage with different patterns */}
            {allSkills.slice(0, 10).map((skill, i) => (
                <motion.div
                    key={`dup-${i}`}
                    className="absolute pointer-events-none opacity-[0.02] text-5xl"
                    initial={{ left: "110%", top: `${(i * 10) % 100}%` }}
                    animate={{
                        left: ["110%", "-10%"],
                        top: [`${(i * 10) % 100}%`, `${((i * 10) + 15) % 100}%`],
                        rotate: [360, 0]
                    }}
                    transition={{
                        duration: 35 + i * 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ color: skill.color }}
                >
                    <skill.icon />
                </motion.div>
            ))}
        </div>
    );
}
