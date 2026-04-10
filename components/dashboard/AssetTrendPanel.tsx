"use client";

import { useState, useEffect } from "react";

interface AssetTrendPanelProps {
  botData?: any;
}

export default function AssetTrendPanel({ botData }: AssetTrendPanelProps) {
  const [isClient, setIsClient] = useState(false);
  const now = new Date();
  
  // 狀態管理
  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  const [range, setRange] = useState("30日");

  useEffect(() => { setIsClient(true); }, []);

  // 月份切換 (僅在非 7/30/90 模式下有效，或自動跳回當月)
  const adjustMonth = (offset: number) => {
    const newDate = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + offset, 1);
    if (offset > 0 && newDate > now) return;
    setCurrentViewDate(newDate);
    setRange("月份"); // 切換月份時，取消 7/30/90 的選中狀態
  };

  // ── 動態計算座標與標籤 ──────────────────────
  const getChartConfig = () => {
    const mm = String(currentViewDate.getMonth() + 1).padStart(2, '0');
    const daysOfWeek = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];

    if (range === "7日") {
      // 往前推 6 天到今天
      const labels = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(now.getDate() - i);
        const dayName = i === 0 ? "今天" : daysOfWeek[d.getDay()];
        labels.push(`${dayName} ${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`);
      }
      return labels;
    }

    if (range === "30日") {
      // 顯示 4 個時間點：30天前、20天前、10天前、今天
      return [30, 20, 10, 0].map(i => {
        const d = new Date();
        d.setDate(now.getDate() - i);
        // 如果是 0 代表今天，放最後面
        return i === 0 ? "今天" : `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
      });
    }

    if (range === "90日") {
      // 顯示前三個月的月份標籤
      const labels = [];
      for (let i = 2; i >= 0; i--) {
        const d = new Date();
        d.setMonth(now.getMonth() - i);
        labels.push(`${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}月`);
      }
      labels.push("至今");
      return labels;
    }

    if (range === "ALL") {
      return ["2025 Q3", "2025 Q4", "2026 Q1", "現在"];
    }

    // 月份模式：顯示該月的 01, 10, 20, 28/30/31
    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();
    return [`${mm}/01`, `${mm}/10`, `${mm}/20`, `${mm}/${lastDay}`];
  };

  const labels = getChartConfig();

  if (!isClient) return <div className="rounded-[24px] border border-[#ECE8E3] dark:border-[#2B3139] bg-white dark:bg-[#161A25] p-8 h-[450px] animate-pulse"></div>;

  return (
    <div className="rounded-[24px] border border-[#D8D2CA] dark:border-[#2B3139] bg-white dark:bg-[#161A25] p-6 lg:p-8 shadow-sm transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h3 className="text-xl font-bold text-[#111827] dark:text-[#F8FAFC]">錢錢來時的路</h3>
          <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-1 font-medium">包含進出場點位與回撤標記</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* 月份導覽：在 7/30/90 模式下按箭頭會跳回月份模式 */}
          <div className="flex items-center h-9 bg-[#F9FAFB] dark:bg-[#1E2330] rounded-lg border border-[#ECE8E3] dark:border-[#2B3139] p-1">
            <button onClick={() => adjustMonth(-1)} className="px-2 h-full flex items-center hover:bg-white dark:hover:bg-[#2B3139] rounded-md text-[#9CA3AF]">←</button>
            <div className="px-3 h-full flex items-center text-xs font-bold dark:text-[#E2E8F0] border-x border-[#ECE8E3] dark:border-[#2B3139] mx-1">
              {currentViewDate.getFullYear()} / {currentViewDate.getMonth() + 1}
            </div>
            <button onClick={() => adjustMonth(1)} className="px-2 h-full flex items-center hover:bg-white dark:hover:bg-[#2B3139] rounded-md text-[#9CA3AF]">→</button>
          </div>

          {/* 天數過濾器 */}
          <div className="flex items-center h-9 bg-[#F9FAFB] dark:bg-[#1E2330] p-1 rounded-lg border border-[#ECE8E3] dark:border-[#2B3139]">
            {['7日', '30日', '90日', 'ALL'].map(t => (
              <button 
                key={t} 
                onClick={() => {
                  setRange(t);
                  setCurrentViewDate(now); // 選天數時自動跳回當前月份
                }}
                className={`px-4 h-full flex items-center text-xs font-bold rounded-md transition-all ${range === t ? "bg-white dark:bg-[#2B3139] text-[#111827] dark:text-white shadow-sm" : "text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"}`}
              >{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[320px] w-full relative flex">
        {/* Y 軸 */}
        <div className="w-12 h-[280px] flex flex-col justify-between text-[10px] font-mono text-[#9CA3AF] dark:text-[#64748B] pr-2 text-right pt-2 pb-4">
          <span>1,200</span><span>1,150</span><span>1,100</span><span>1,050</span>
        </div>

        <div className="flex-1 h-[300px] relative border-l border-b border-[#ECE8E3] dark:border-[#2B3139]">
          {/* 背景格線 */}
          <div className="absolute inset-0 flex flex-col justify-between pt-2 pb-5 z-0">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full border-t border-dashed border-[#F3F4F6] dark:border-[#2B3139]/50"></div>
            ))}
          </div>

          {/* 圖表曲線 (示意) */}
          <svg viewBox="0 0 1000 300" className="w-full h-[280px] z-20 relative" preserveAspectRatio="none">
            <path d="M 0,250 C 150,220 250,150 400,180 C 550,210 650,80 850,30 C 900,40 950,90 1000,100" fill="none" stroke="#7C8CA5" strokeWidth="2.5" />
          </svg>

          {/* 動態 X 軸座標 */}
          <div className="absolute bottom-0 left-0 w-full flex justify-between text-[9px] sm:text-[10px] font-mono text-[#9CA3AF] dark:text-[#64748B] pt-2 px-1">
            {labels.map((label, idx) => (
              <span key={idx} className="whitespace-nowrap">{label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}