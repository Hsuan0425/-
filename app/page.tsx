"use client";

import React, { useState, useEffect } from "react";
import KpiCard from "@/components/dashboard/KpiCard";
import AssetTrendPanel from "@/components/dashboard/AssetTrendPanel";
import AgentSummaryCard from "@/components/dashboard/AgentSummaryCard";
import RiskStatusPanel from "@/components/dashboard/RiskStatusPanel";
import StrategyTable from "@/components/dashboard/StrategyTable";
import MarketTicker from "@/components/dashboard/MarketTicker";
import TradingCalendar from "@/components/dashboard/TradingCalendar";
import FocusBar from "@/components/dashboard/FocusBar"; // 確保你有這個組件

export default function DashboardPage() {
  // 修改 1：預設改為亮色模式 (false)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [botData, setBotData] = useState<any>(null);

  // 修改 2：加入資料抓取邏輯
  useEffect(() => {
    setMounted(true);
const fetchData = async () => {
  try {
    // 使用 window.location.origin 確保路徑完全正確[cite: 1, 4]
    const res = await fetch(`${window.location.origin}/api/status`, { 
      cache: 'no-store',
      headers: { 'Pragma': 'no-cache' }
    });
    
    if (!res.ok) {
      console.error("API 回傳錯誤代碼:", res.status);
      return;
    }
    
    const data = await res.json();
    setBotData(data); // 你的 API 已是扁平格式，直接存入[cite: 1]
  } catch (e) {
    console.error("❌ 前端抓取失敗:", e);
  }
};
    fetchData();
    const timer = setInterval(fetchData, 60000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className={isDarkMode ? "dark" : ""}>
      {/* 修改 3：插入 FocusBar 置頂監控時間條 */}
      <FocusBar botData={botData} />

      <main className="min-h-screen bg-[#ECE9E5] dark:bg-[#0B0E14] text-[#111827] dark:text-[#E2E8F0] p-6 md:p-10 font-sans tracking-wide transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto space-y-6">
          
          <header className="flex justify-between items-center mb-2">
            {/* 修改 4：確認名稱為 宣宣兒的財富密碼 */}
            <h1 className="text-3xl font-black text-[#1F2937] dark:text-white tracking-tighter">
              宣宣兒的財富密碼
            </h1>
            
            <div className="flex flex-wrap items-center gap-4">
              {/* 這裡顯示串接時間的簡略版（如果不想看 FocusBar 的話） */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#161A25] border border-[#D8D2CA] dark:border-[#2B3139] text-[10px] font-mono shadow-sm">
                <span className="text-[#94A3B8]">SYNC:</span>
                <span className="text-[#10B981]">{botData?.updated_at || "CONNECTING..."}</span>
              </div>

              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-[#161A25] border border-[#D8D2CA] dark:border-[#2B3139] shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                  <span className="text-[10px] font-bold text-[#6B7280] dark:text-[#94A3B8]">交易所</span>
                </div>
                <div className="w-px h-3 bg-[#D8D2CA] dark:bg-[#374151]"></div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                  <span className="text-[10px] font-bold text-[#6B7280] dark:text-[#94A3B8]">LINE</span>
                </div>
                <div className="w-px h-3 bg-[#D8D2CA] dark:bg-[#374151]"></div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${botData ? 'bg-[#10B981] animate-pulse' : 'bg-red-500'}`}></span>
                  <span className="text-[10px] font-bold text-[#6B7280] dark:text-[#94A3B8]">Bot</span>
                </div>
              </div>

              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#161A25] border border-[#D8D2CA] dark:border-[#2B3139] shadow-sm hover:border-[#111827] dark:hover:border-[#4B5563] transition-all"
              >
                <span className="text-sm">{isDarkMode ? "🌙" : "☀️"}</span>
                <span className="text-[11px] font-bold text-[#111827] dark:text-[#94A3B8]">
                  {isDarkMode ? "Pro Dark" : "Light"}
                </span>
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
              {/* 修改 5：把資料傳下去 */}
              <AgentSummaryCard botData={botData} />
            </div>
            <div 
              className="col-span-12 lg:col-span-8 rounded-[24px] p-8 lg:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden border border-[#D8D2CA] dark:border-[#2B3139]"
              style={{ 
                background: isDarkMode 
                  ? "linear-gradient(135deg, #1E1A24 0%, #161A25 50%, #0F172A 100%)" 
                  : "linear-gradient(135deg, #EAD6D6 0%, #DCD0D6 40%, #D0CFD8 70%, #C9D6E3 100%)" 
              }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-40 dark:opacity-5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10">
                <h2 className="text-sm font-bold text-[#334155] dark:text-[#94A3B8] mb-2">總資產 (USDT)</h2>
                <div className="text-5xl lg:text-6xl font-black tracking-tighter text-[#111827] dark:text-white">
                  {botData?.total_assets || "1,148.32"}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <KpiCard title="今日已實現損益" value={botData?.today_pnl || "+12.50"} unit="USDT" isUp={true} />
            <KpiCard title="今日最大浮盈" value={botData?.max_drawdown || "+35.20"} unit="USDT" isUp={true} />
            <KpiCard 
              title="利潤回吐 (Giveback)" 
              value="-22.70" 
              unit="USDT" 
              isUp={false} 
              isWarning={true} 
              subLabel={`回吐率 ${botData?.giveback_rate || '64%'} (峰值 +35.20)`} 
            />
            <KpiCard title="策略平均勝率" value={botData?.win_rate || "68"} unit="%" isUp={true} />
          </div>

          <div className="w-full">
            <AssetTrendPanel botData={botData} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <RiskStatusPanel botData={botData} />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <StrategyTable botData={botData} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
              <MarketTicker botData={botData} />
            </div>
            <div className="col-span-12 lg:col-span-8">
              <TradingCalendar botData={botData} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}