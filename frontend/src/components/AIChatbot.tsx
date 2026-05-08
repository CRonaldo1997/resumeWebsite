"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/context";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIChatbot() {
  const { t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    { role: "assistant", content: t.chatbot.greeting },
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendQuestion = async (question: string) => {
    if (isLoading) return;
    const userMessage: Message = { role: "user", content: question };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      let assistantContent = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        assistantContent += chunk;
        
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: assistantContent };
          return updated;
        });
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      const isTimeout = error.message?.includes("timeout") || error.message?.includes("timed out");
      const errorMsg = isTimeout 
        ? "抱歉，我的大脑（AI模型）响应稍微慢了一点，请您再次尝试提问。" 
        : (error.message || "抱歉，我现在无法回答。请稍后再试。");
      setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput("");
    await sendQuestion(text);
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
            className="fixed bottom-24 right-7 w-[calc(100vw-40px)] sm:w-96 glass rounded-2xl overflow-hidden z-50 flex flex-col"
            style={{ 
              boxShadow: "0 8px 40px oklch(0 0 0 / 0.4)", 
              border: "1px solid var(--border)",
              maxHeight: "70vh" 
            }}
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
                  <p className="text-sm font-medium" style={{ color: "var(--text-1)" }}>
                    {t.chatbot.title}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-3)" }}>
                    {t.chatbot.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 transition-colors hover:bg-white/5"
                style={{ color: "var(--text-3)" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth min-h-[300px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className="max-w-[85%] text-sm leading-relaxed px-4 py-2.5 rounded-2xl shadow-sm"
                    style={
                      msg.role === "user"
                        ? { background: "var(--accent)", color: "oklch(1 0 0)", borderBottomRightRadius: "4px" }
                        : { background: "var(--bg-surface)", color: "var(--text-2)", borderBottomLeftRadius: "4px", border: "1px solid var(--border)" }
                    }
                  >
                    <div className="markdown-content">
                      <ReactMarkdown
                        components={{
                          p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                          ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-2" {...props} />,
                          ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                          strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                          a: ({ node, ...props }) => <a className="underline hover:opacity-80" target="_blank" rel="noopener noreferrer" {...props} />,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                  
                  {/* Suggested questions - only show after the initial greeting and if no other messages yet */}
                  {i === 0 && messages.length === 1 && t.chatbot.suggestedQuestions && (
                    <div className="flex flex-col gap-2 mt-3 w-full items-start px-2">
                      {t.chatbot.suggestedQuestions.map((q: string) => (
                        <button
                          key={q}
                          onClick={() => sendQuestion(q)}
                          className="text-xs text-left px-3 py-2 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                          style={{ 
                            background: "var(--accent-lo)", 
                            color: "var(--accent)", 
                            border: "1px solid oklch(from var(--accent) l c h / 0.2)",
                            maxWidth: "90%"
                          }}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && messages[messages.length - 1].role === "user" && (
                <div className="flex justify-start">
                  <div 
                    className="px-4 py-2.5 rounded-2xl flex items-center gap-2"
                    style={{ background: "var(--bg-surface)", color: "var(--text-3)", border: "1px solid var(--border)" }}
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-xs">Thinking...</span>
                  </div>
                </div>
              )}
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
                disabled={isLoading}
                className="flex-1 rounded-xl px-4 py-2 text-sm outline-none transition-colors disabled:opacity-50"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-1)",
                }}
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all active:scale-95 disabled:opacity-40"
                style={{ background: "var(--accent)", color: "oklch(1 0 0)" }}
                disabled={!input.trim() || isLoading}
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
