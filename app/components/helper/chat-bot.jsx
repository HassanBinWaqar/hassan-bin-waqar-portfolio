"use client";

import { useEffect, useRef, useState } from "react";
import AnimationLottie from "./animation-lottie";
import botAnim from "@/app/assets/lottie/code.json";
import { trackChatbotOpen, trackChatbotQuestion, trackChatbotClose } from "@/utils/analytics";

const accent = "#16f2b3";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Hassan's AI assistant. How can I help?" },
  ]);
  const endRef = useRef(null);
  const sessionStartRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (res.ok && data?.reply) {
        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      } else if (data?.error) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: `Error: ${data.error}. Check API key or try again later.` },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "Hmm, I couldn’t get a response. Try again in a moment." },
        ]);
      }
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "There was an error reaching the chat service." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating animated chatbot button */}
      <button
        aria-label="Open chat bot"
        onClick={() => {
          const newOpenState = !open;
          setOpen(newOpenState);
          
          if (newOpenState) {
            // Track chatbot opened
            trackChatbotOpen();
            sessionStartRef.current = Date.now();
          } else {
            // Track chatbot closed with session stats
            if (sessionStartRef.current) {
              const sessionDuration = Date.now() - sessionStartRef.current;
              const messagesCount = messages.filter(m => m.role === 'user').length;
              trackChatbotClose(messagesCount, sessionDuration);
            }
          }
        }}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Animated pulsing ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 opacity-75 animate-ping"></div>
          
          {/* Main button with gradient background */}
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 shadow-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
            {/* Inner robot face */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              {/* Eyes */}
              <div className="flex gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
            
            {/* Speech bubble indicator */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-bounce">
              💬
            </div>
          </div>
        </div>
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[22rem] sm:w-[26rem] rounded-xl border border-[#353951] bg-[#0d1224] text-white shadow-2xl overflow-hidden">
          <header className="px-4 py-3 border-b border-[#353951] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full" style={{ background: accent }}></div>
              <div>
                <p className="text-sm font-semibold">Hassan’s AI Assistant</p>
                <p className="text-xs text-gray-400">Ask about experience, skills, projects, contact…</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-300 hover:text-white">✕</button>
          </header>

          <div className="max-h-80 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === "user" ? "text-right" : "text-left"}>
                <div
                  className="inline-block rounded-lg px-3 py-2 text-sm"
                  style={{
                    background: m.role === "user" ? "#141a33" : "#0f1530",
                    border: "1px solid #353951",
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-[#353951]">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={loading ? "Thinking…" : "Type your question and press Enter"}
                disabled={loading}
                rows={2}
                className="flex-1 resize-none rounded-md bg-[#0b1022] text-sm p-2 outline-none border border-[#353951] focus:border-[--accent]"
                style={{
                  // Tailwind CSS var fallback for focus ring
                  ['--accent']: accent,
                }}
              />
              <button
                onClick={send}
                disabled={loading}
                className="h-9 px-3 rounded-md text-sm font-medium"
                style={{ background: accent, opacity: loading ? 0.7 : 1 }}
              >
                {loading ? '...' : 'Send'}
              </button>
            </div>
            <p className="mt-2 text-[10px] text-gray-400">Powered by Groq AI · Be concise, no personal data.</p>
          </div>
        </div>
      )}
    </>
  );
}
