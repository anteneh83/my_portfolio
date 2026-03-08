"use client";
import { motion } from "framer-motion";

/**
 * ScrollReveal Component
 * 
 * A reusable wrapper that reveals content as it scrolls into view.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to reveal
 * @param {string} props.direction - 'up', 'down', 'left', 'right' (default: 'up')
 * @param {number} props.delay - Animation delay in seconds (default: 0)
 * @param {number} props.duration - Animation duration in seconds (default: 0.6)
 * @param {number} props.distance - Distance to move in pixels (default: 40)
 * @param {boolean} props.stagger - If true, children will be staggered (default: false)
 * @param {number} props.staggerDelay - Delay between children if staggered (default: 0.1)
 * @param {string} props.className - Additional CSS classes
 */
export default function ScrollReveal({
    children,
    direction = "up",
    delay = 0,
    duration = 0.6,
    distance = 40,
    stagger = false,
    staggerDelay = 0.1,
    className = "",
    once = true,
}) {
    const directions = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
    };

    const initial = {
        opacity: 0,
        ...directions[direction],
    };

    const animate = {
        opacity: 1,
        x: 0,
        y: 0,
    };

    const containerVariants = {
        hidden: initial,
        visible: {
            ...animate,
            transition: {
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for premium feel
                staggerChildren: stagger ? staggerDelay : 0,
                delayChildren: delay,
            },
        },
    };

    const childVariants = {
        hidden: initial,
        visible: {
            ...animate,
            transition: {
                duration,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    if (stagger) {
        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once, margin: "-50px" }}
                className={className}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={initial}
            whileInView={animate}
            viewport={{ once, margin: "-50px" }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Reusable variant for staggered children to be used inside <ScrollReveal stagger={true}>
export const revealItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
};
