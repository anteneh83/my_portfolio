"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import ScrollReveal, { revealItem } from "./ScrollReveal";

const socials = [
    { label: "GitHub", icon: "🐙", href: "https://github.com/anteneh83", color: "#ffffff" },
    { label: "LinkedIn", icon: "💼", href: "https://www.linkedin.com/in/antig74/", color: "#0A66C2" },
    { label: "Telegram", icon: "✈️", href: "https://t.me/Yours_2123", color: "#229ED9" },
    { label: "Email", icon: "📧", href: "mailto:antenehgetnet83@gmail.com", color: "#EC4899" },
];

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle | sending | sent | error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const templateParams = {
                name: form.name,
                email: form.email,
                message: form.message,
            };

            const response = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            );

            if (response.status === 200) {
                setStatus("sent");
                setForm({ name: "", email: "", message: "" });
            } else {
                throw new Error(`EmailJS returned status ${response.status}`);
            }
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            console.error("EmailJS full error:", error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <section id="contact" className="section-padding">
            <div className="max-w-5xl mx-auto">
                <ScrollReveal className="text-center mb-16">
                    <span className="text-[#22D3EE] text-sm font-medium tracking-widest uppercase">
                        Let&apos;s Talk
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <p className="text-white/50 mt-4">
                        Open to opportunities, collaborations, and interesting conversations.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <ScrollReveal direction="left" delay={0.2}>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {[
                                { name: "name", label: "Name", type: "text", placeholder: "Your Name" },
                                { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                            ].map(({ name, label, type, placeholder }) => (
                                <div key={name}>
                                    <label className="block text-sm text-white/60 mb-1">{label}</label>
                                    <input
                                        type={type}
                                        id={name}
                                        required
                                        value={form[name]}
                                        onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
                                        placeholder={placeholder}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#8B5CF6] transition-colors"
                                    />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm text-white/60 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={5}
                                    value={form.message}
                                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                                    placeholder="Your message..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#8B5CF6] transition-colors resize-none"
                                />
                            </div>

                            <div className="flex gap-4">
                                <motion.button
                                    type="submit"
                                    disabled={status === "sending"}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex-1 py-3 rounded-xl font-medium bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white disabled:opacity-50 transition-all"
                                >
                                    {status === "sending" ? "Sending…" : status === "sent" ? "✓ Sent!" : "Send Message"}
                                </motion.button>
                                <a
                                    href="/files/Anteneh-Getnet-Tirfu-Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-3 rounded-xl font-medium border border-white/15 text-white hover:border-[#8B5CF6] transition-all text-center"
                                >
                                    Download CV
                                </a>
                            </div>

                            {status === "sent" && (
                                <p className="text-[#22D3EE] text-sm text-center">
                                    Thanks! I&apos;ll get back to you soon. 🚀
                                </p>
                            )}
                            {status === "error" && (
                                <p className="text-[#EC4899] text-sm text-center">
                                    Oops! Something went wrong. Please try again.
                                </p>
                            )}
                        </form>
                    </ScrollReveal>

                    {/* Socials */}
                    <div className="space-y-4">
                        <ScrollReveal direction="right" delay={0.3}>
                            <p className="text-white/60 leading-relaxed mb-8">
                                Whether you have a project in mind, a job opportunity, or just want to connect —
                                my inbox is always open. I&apos;ll do my best to respond promptly!
                            </p>
                        </ScrollReveal>
                        <ScrollReveal direction="right" delay={0.4} stagger={true} className="space-y-4">
                            {socials.map((s) => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variants={revealItem}
                                    whileHover={{ x: 6 }}
                                    className="flex items-center gap-4 glass rounded-xl px-5 py-4 hover:border-white/20 transition-all group"
                                >
                                    <span className="text-2xl">{s.icon}</span>
                                    <span className="text-white font-medium group-hover:text-[#8B5CF6] transition-colors">
                                        {s.label}
                                    </span>
                                    <span className="ml-auto text-white/30 group-hover:text-[#8B5CF6] transition-colors">
                                        →
                                    </span>
                                </motion.a>
                            ))}
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center text-white/30 text-sm mt-24">
                <p>© 2024 Anteneh Getnet · Built with Next.js, Three.js & ❤️</p>
            </div>
        </section>
    );
}
