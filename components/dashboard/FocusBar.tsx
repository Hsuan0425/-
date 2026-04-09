"use client";

import React from 'react';

export default function FocusBar({ botData }: { botData?: any }) {
  // 核心修正：移除所有不必要的引用標籤，只保留乾淨的數據讀取邏輯
  const displayTime = botData?.updated_at || "PENDING...";
  const isConnected = displayTime !== "PENDING...";

  return (
    <div className="bg-[#111827] text-white py-2 px-4 flex justify-between items-center text-xs sticky top-0 z-50 shadow-lg">
      <div className="flex items-center gap-2">
        <span className="bg-[#C7A86D] text-black px-2 py-0.5 rounded font-black tracking-tighter shadow-sm">
          FOCUS
        </span>
        <span className="text-[#E5E7EB] font-medium">
          策略運作中：目前版本 {botData?.bot_version || '0409V5'}，網格監控已就緒。
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="hidden md:inline text-[#9CA3AF] font-bold">LAST UPDATE:</span>
          <span className={`font-mono px-2 py-0.5 rounded ${isConnected ? 'bg-gray-800 text-[#F3F4F6]' : 'bg-red-900/30 text-red-400'}`}>
            {displayTime}
          </span>
        </div>
        
        {/* 狀態指示燈 */}
        <div className="flex items-center gap-2 bg-gray-800/50 px-2 py-1 rounded-full">
          <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isConnected ? 'bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]' : 'bg-[#EF4444]'}`}></div>
          <span className={`text-[10px] font-bold ${isConnected ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
            {isConnected ? 'LIVE' : 'OFFLINE'}
          </span>
        </div>
      </div>
    </div>
  );
}