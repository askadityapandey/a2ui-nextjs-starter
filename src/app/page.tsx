"use client";

import { useState, useRef, useEffect } from "react";
import CryptoCard from "./components/CryptoCard";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: React.ReactNode }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsLoading(true);

    // MOCK LATENCY
    setTimeout(() => {
      let responseComponent;
      if (userMsg.toLowerCase().includes("btc") || userMsg.toLowerCase().includes("bitcoin")) {
        responseComponent = <CryptoCard coin="Bitcoin" code="BTC" price="$94,230.00" trend="up" />;
      } else if (userMsg.toLowerCase().includes("eth")) {
        responseComponent = <CryptoCard coin="Ethereum" code="ETH" price="$3,450.00" trend="down" />;
      } else {
        responseComponent = <div className="text-gray-300">I can only provide real-time pricing for <b>Bitcoin</b> and <b>Ethereum</b> currently. Try asking for one of those.</div>;
      }
      setMessages((prev) => [...prev, { role: "agent", content: responseComponent }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="flex flex-col h-screen bg-[#343541] text-gray-100 font-sans">

      <div className="w-full p-4 text-center border-b border-white/5 text-sm font-medium text-gray-400">
        CryptoScout <span className="text-gray-600 mx-2">|</span> Model: A2UI-Preview
      </div>


      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-3xl mx-auto flex flex-col gap-6 p-6">
          
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-32 opacity-20">
              <div className="w-16 h-16 bg-white rounded-full mb-4"></div>
              <p className="text-lg font-medium">How can I help you today?</p>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex gap-4 ${m.role === 'agent' ? 'bg-[#444654] -mx-6 px-6 py-6' : 'py-6'}`}>
              {/* Avatar */}
              <div className={`w-8 h-8 min-w-[32px] rounded-sm flex items-center justify-center text-xs ${m.role === 'agent' ? 'bg-green-500' : 'bg-purple-600'}`}>
                {m.role === 'agent' ? 'AI' : 'U'}
              </div>
              
              {/* Content */}
              <div className="flex-1 leading-7">
                {m.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 bg-[#444654] -mx-6 px-6 py-6 animate-pulse">
               <div className="w-8 h-8 rounded-sm bg-green-500 flex items-center justify-center text-xs">AI</div>
               <div className="flex items-center gap-1">
                 <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
               </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      {/* Input Area (Pinned to bottom) */}
      <div className="w-full border-t border-white/10 bg-[#343541] p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <input
              className="w-full bg-[#40414F] text-white rounded-md border border-black/10 px-4 py-3 pr-12 focus:outline-none focus:ring-1 focus:ring-gray-500 shadow-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send a message..."
            />
            <button 
              type="submit"
              disabled={!input}
              className="absolute right-2 top-2 p-1.5 text-gray-400 hover:text-white hover:bg-black/20 rounded disabled:opacity-40 transition-colors"
            >
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
          <div className="text-center text-xs text-gray-500 mt-2">
            A2UI Demo. AI may produce inaccurate information about prices.
          </div>
        </div>
      </div>
    </main>
  );
}