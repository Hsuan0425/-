"use client";

import React, { useState, useEffect } from "react";
import KpiCard from "@/components/dashboard/KpiCard";
import AssetTrendPanel from "@/components/dashboard/AssetTrendPanel";
import AgentSummaryCard from "@/components/dashboard/AgentSummaryCard";
import RiskStatusPanel from "@/components/dashboard/RiskStatusPanel";
import StrategyTable from "@/components/dashboard/StrategyTable";
import MarketTicker from "@/components/dashboard/MarketTicker";
import TradingCalendar from "@/components/dashboard/TradingCalendar";

export default function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <main className="min-h-screen bg-[#ECE9E5] dark:bg-[#0B0E14] text-[#111827] dark:text-[#E2E8F0] p-6 md:p-10 font-sans tracking-wide transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto space-y-6">
          
          {/* Header 與 系統狀態拆分 */}
          <header className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-[#111827] dark:text-white">交易 Dashboard</h1>
            
            <div className="flex flex-wrap items-center gap-4">
              {/* 系統狀態監測點 */}
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
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                  <span className="text-[10px] font-bold text-[#6B7280] dark:text-[#94A3B8]">Bot</span>
                </div>
              </div>

              {/* 深色模式切換 */}
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

          {/* 頂部 FOCUS 提示 */}
          <div className="bg-[#111827] dark:bg-[#161A25] dark:border dark:border-[#2B3139] text-white rounded-xl p-3 flex items-center gap-3 text-sm shadow-md transition-colors">
             <span className="bg-[#C7A86D] text-[#111827] px-2 py-0.5 rounded text-xs font-black tracking-widest">FOCUS</span>
             <p className="font-medium text-[#E5E7EB] dark:text-[#94A3B8]">
               ETH RSI 已達 72 過熱區間，建議注意利潤回吐風險；目前整體風險水位健康。
             </p>
          </div>

          {/* 第一排：Agent 指令 與 Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
              <AgentSummaryCard />
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
                  1,148.32
                </div>
              </div>
            </div>
          </div>

          {/* 第二排：KPI 區塊（含回吐警示邏輯） */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <KpiCard title="今日已實現損益" value="+12.50" unit="USDT" isUp={true} />
            <KpiCard title="今日最大浮盈" value="+35.20" unit="USDT" isUp={true} />
            <KpiCard 
              title="利潤回吐 (Giveback)" 
              value="-22.70" 
              unit="USDT" 
              isUp={false} 
              isWarning={true} 
              subLabel="回吐率 64% (峰值 +35.20)" 
            />
            <KpiCard title="策略平均勝率" value="68" unit="%" isUp={true} />
          </div>

          {/* 資產圖表 */}
          <div className="w-full">
            <AssetTrendPanel />
          </div>

          {/* 風控與策略表 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <RiskStatusPanel />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <StrategyTable />
            </div>
          </div>

          {/* 市場監測與日曆 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
              <MarketTicker />
            </div>
            <div className="col-span-12 lg:col-span-8">
              <TradingCalendar />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}