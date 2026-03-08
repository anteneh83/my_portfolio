"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const welcomeMessage = {
    role: "assistant",
    content:
        "Hi 👋 I'm Anteneh AI!\n\nI can tell you about Anteneh's:\n• Skills & Tech Stack\n• Projects\n• Experience\n• Achievements\n\nAsk me anything!",
};

const quickQuestions = [
    "Who is Anteneh?",
    "What are his skills?",
    "Tell me about his projects",
    "How can I contact him?",
];

export default function AntenehAI() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([welcomeMessage]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (text) => {
        const userMsg = text || input.trim();
        if (!userMsg || loading) return;
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg }),
            });
            const data = await res.json();
            setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, something went wrong. Please try again!" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating button */}
            <motion.button
                id="anteneh-ai-btn"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2, type: "spring" }}
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm shadow-xl"
                style={{
                    background: "linear-gradient(135deg, #8B5CF6, #22D3EE)",
                    boxShadow: "0 0 24px rgba(139,92,246,0.5)",
                }}
            >
                <span>🤖</span>
                <span className="hidden sm:inline">Anteneh AI</span>
            </motion.button>

            {/* Chat Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.9 }}
                        className="fixed bottom-20 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                        style={{
                            background: "rgba(15,23,42,0.97)",
                            border: "1px solid rgba(139,92,246,0.4)",
                            maxHeight: "520px",
                        }}
                    >
                        {/* Header */}
                        <div
                            className="flex items-center justify-between px-4 py-3"
                            style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(34,211,238,0.1))" }}
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                                    style={{ background: "linear-gradient(135deg, #8B5CF6, #22D3EE)" }}
                                >
                                    🤖
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">Anteneh AI</p>
                                    <p className="text-[#22D3EE] text-xs">Ask me anything about Anteneh</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-white/40 hover:text-white transition-colors text-xl leading-none"
                                aria-label="Close chat"
                            >
                                ×
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ minHeight: 0, maxHeight: 300 }}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] text-sm px-3 py-2 rounded-2xl whitespace-pre-line leading-relaxed ${msg.role === "user"
                                                ? "text-white rounded-br-sm"
                                                : "text-white/90 rounded-bl-sm border border-white/10"
                                            }`}
                                        style={
                                            msg.role === "user"
                                                ? { background: "linear-gradient(135deg, #8B5CF6, #7C3AED)" }
                                                : { background: "rgba(255,255,255,0.05)" }
                                        }
                                    >
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="glass px-4 py-2 rounded-2xl rounded-bl-sm">
                                        <div className="flex gap-1 items-center">
                                            {[0, 0.2, 0.4].map((d, i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ y: [0, -4, 0] }}
                                                    transition={{ repeat: Infinity, duration: 0.8, delay: d }}
                                                    className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {/* Quick questions */}
                        {messages.length <= 1 && (
                            <div className="px-4 pb-2 flex flex-wrap gap-2">
                                {quickQuestions.map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => sendMessage(q)}
                                        className="text-xs px-3 py-1 rounded-full border border-[#8B5CF6]/40 text-[#8B5CF6] hover:bg-[#8B5CF6]/10 transition-colors"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="px-4 pb-4 pt-2 border-t border-white/5">
                            <form
                                onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    id="ai-chat-input"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask something…"
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#8B5CF6] transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={loading || !input.trim()}
                                    className="px-4 py-2 rounded-xl font-medium text-sm text-white disabled:opacity-40 transition-all"
                                    style={{ background: "linear-gradient(135deg, #8B5CF6, #22D3EE)" }}
                                >
                                    ↗
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
