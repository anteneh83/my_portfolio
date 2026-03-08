"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("#hero");

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNav = (href) => {
        setActiveLink(href);
        setMenuOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "glass border-b border-white/10 py-3"
                : "bg-transparent py-5"
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <motion.a
                    href="#hero"
                    onClick={(e) => { e.preventDefault(); handleNav("#hero"); }}
                    className="font-heading text-xl font-bold gradient-text"
                    whileHover={{ scale: 1.05 }}
                >
                    AG
                </motion.a>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map(({ label, href }) => (
                        <li key={href}>
                            <button
                                onClick={() => handleNav(href)}
                                className={`text-sm font-medium transition-all duration-200 hover:text-[#8B5CF6] relative group ${activeLink === href ? "text-[#8B5CF6]" : "text-white/70"
                                    }`}
                            >
                                {label}
                                <span
                                    className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] transition-all duration-300 ${activeLink === href ? "w-full" : "w-0 group-hover:w-full"
                                        }`}
                                />
                            </button>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <a
                    href="/files/Anteneh-Getnet-Tirfu-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-all duration-200"
                >
                    Resume ↗
                </a>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-1"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/10"
                    >
                        <ul className="px-6 py-4 flex flex-col gap-4">
                            {navLinks.map(({ label, href }) => (
                                <li key={href}>
                                    <button
                                        onClick={() => handleNav(href)}
                                        className="text-white/80 hover:text-[#8B5CF6] transition-colors w-full text-left"
                                    >
                                        {label}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <a href="/resume.pdf" target="_blank" className="text-[#8B5CF6]">
                                    Download Resume
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
