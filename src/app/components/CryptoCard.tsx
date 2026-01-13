"use client";

import { useState } from 'react';

export default function CryptoCard({ coin, price, trend, code }: { coin: string, price: string, trend: 'up' | 'down', code: string }) {
  const [buying, setBuying] = useState(false);

  return (
    <div className="w-full max-w-sm mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500 font-sans">
      <div className="bg-[#202123] rounded-md border border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${code === 'BTC' ? 'bg-orange-500/20 text-orange-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
              {code[0]}
            </div>
            <div>
              <h2 className="text-sm text-gray-400 font-medium">{coin}</h2>
              <div className="text-2xl font-semibold text-gray-100">{price}</div>
            </div>
          </div>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${trend === 'up' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
            {trend === 'up' ? '+2.4%' : '-1.2%'}
          </span>
        </div>

        {/* Minimal Chart Line */}
        <div className="h-12 w-full mb-6 border-b border-gray-700/50 pb-2">
           {trend === 'up' ? (
             <svg viewBox="0 0 100 40" className="w-full h-full stroke-green-500 fill-none" preserveAspectRatio="none">
               <path d="M0 35 Q 20 35, 40 20 T 100 5" strokeWidth="1.5" strokeLinecap="round" />
             </svg>
           ) : (
             <svg viewBox="0 0 100 40" className="w-full h-full stroke-red-500 fill-none" preserveAspectRatio="none">
               <path d="M0 5 Q 20 5, 40 20 T 100 35" strokeWidth="1.5" strokeLinecap="round" />
             </svg>
           )}
        </div>
        
        {/* Actions */}
        {buying ? (
          <div className="w-full py-2 bg-green-600/20 text-green-400 text-sm font-medium text-center rounded animate-pulse">
            Order Executed
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setBuying(true)}
              className="py-2 bg-white text-black hover:bg-gray-200 rounded text-sm font-medium transition-colors"
            >
              Buy {code}
            </button>
            <button className="py-2 bg-transparent border border-gray-600 hover:bg-gray-700 text-white rounded text-sm font-medium transition-colors">
              View Chart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}