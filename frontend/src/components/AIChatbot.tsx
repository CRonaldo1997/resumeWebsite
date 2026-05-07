"use client";

import { useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/context";

export default function AIChatbot() {
  const { t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>(() => [
    { role: "ai", text: t.chatbot.greeting },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const next = [...messages, { role: "user" as const, text: input }];
    setMessages(next);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai" as const, text: t.chatbot.response }]);
    }, 800);
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-7 right-7 w-14 h-14 rounded-full flex items-center justify-center z-50 shadow-lg"
        style={{
          background: "var(--accent)",
          boxShadow: "0 0 28px var(--accent-glow)",
          color: "oklch(1 0 0)",
        }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-7 w-80 sm:w-96 glass rounded-2xl overflow-hidden z-50 flex flex-col"
            style={{ boxShadow: "0 8px 40px oklch(0 0 0 / 0.4)", border: "1px solid var(--border)" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{ background: "var(--tag-bg)", color: "var(--tag-text)", border: "1px solid color-mix(in oklch, var(--tag-text) 30%, transparent 70%)" }}
                >
                  AI
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {t.chatbot.title}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {t.chatbot.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 h-60 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[82%] text-sm leading-relaxed px-4 py-2.5 rounded-2xl"
                    style={
                      msg.role === "user"
                        ? { background: "var(--accent)", color: "oklch(1 0 0)", borderBottomRightRadius: "4px" }
                        : { background: "var(--bg-surface)", color: "var(--text-secondary)", borderBottomLeftRadius: "4px", border: "1px solid var(--border)" }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="flex gap-2 p-3"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chatbot.placeholder}
                className="flex-1 rounded-xl px-4 py-2 text-sm outline-none transition-colors"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-opacity disabled:opacity-40"
                style={{ background: "var(--accent)", color: "oklch(1 0 0)" }}
                disabled={!input.trim()}
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
