"use client";

import React from 'react';

// 定義 Props 介面，讓 page.tsx 可以把 botData 傳進來
interface RiskStatusPanelProps {
  botData?: any;
}

export default function RiskStatusPanel({ botData }: RiskStatusPanelProps) {
  // 核心改動：從 botData 抓取版本號，若無資料則顯示預設值[cite: 1, 3]
  const currentVersion = botData?.bot_version || "0409V5";
  
  // 保持你原本的數值邏輯
  const exposure = 62; 
  const limit = 85; 

  return (
    <div className="h-full rounded-[24px] border border-[#D8D2CA] dark:border-[#2B3139] bg-white dark:bg-[#161A25] p-6 lg:p-8 shadow-sm transition-colors duration-300">
      <h3 className="text-lg font-bold dark:text-[#F8FAFC] mb-6">風控決策中心</h3>
      <div className="space-y-6">
        <div className="p-5 rounded-xl bg-[#F9FAFB] dark:bg-[#1E2330] border border-[#ECE8E3] dark:border-[#2B3139]">
          <div className="flex justify-between items-end mb-3">
            <span className="text-xs font-bold dark:text-[#94A3B8]">總曝險水位</span>
            <span className="text-xl font-black font-mono text-[#C7A86D]">
              {exposure}% <span className="text-[10px] opacity-40">/ {limit}%</span>
            </span>
          </div>
          
          <div className="w-full bg-[#ECE8E3] dark:bg-[#0B0E14] h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#C7A86D] h-full transition-all duration-700 ease-out" 
              style={{ width: `${(exposure/limit)*100}%` }}
            ></div>
          </div>
          
          {/* 修正：將 0409V2 改為動態變數 {currentVersion} */}
          <p className="text-[10px] text-[#6B7280] dark:text-[#64748B] mt-3 text-right italic font-medium">
            距 {currentVersion} 警戒線尚餘 {limit - exposure}%
          </p>
        </div>
      </div>
    </div>
  );
}