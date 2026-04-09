"use client";

import { useState, useEffect } from "react";

export default function AssetTrendPanel() {
  const [isClient, setIsClient] = useState(false);
  
  // 台北時間與邊界設定
  const now = new Date();
  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  const [range, setRange] = useState("30日");

  // 假設進場日期 (可從後端取得，這裡預設為 14 個月前以測試一年限制)
  const entryDate = new Date();
  entryDate.setFullYear(now.getFullYear() - 1, now.getMonth() - 2); 

  // 限制：最早只能看到一年前 (或進場日)
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  const minDate = entryDate > oneYearAgo ? entryDate : oneYearAgo;

  useEffect(() => { setIsClient(true); }, []);

  // 月份切換邏輯 (含邊界檢查)
  const adjustMonth = (offset: number) => {
    const newDate = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + offset, 1);
    
    // 往右不能超過現在
    if (offset > 0 && newDate > now) return;
    // 往左不能超過限制日期 (一年前或進場日)
    if (offset < 0 && newDate < new Date(minDate.getFullYear(), minDate.getMonth(), 1)) return;

    setCurrentViewDate(newDate);
  };

  // 判斷按鈕是否該禁用
  const isRightDisabled = currentViewDate.getFullYear() === now.getFullYear() && currentViewDate.getMonth() === now.getMonth();
  const isLeftDisabled = currentViewDate.getFullYear() === minDate.getFullYear() && currentViewDate.getMonth() === minDate.getMonth();

  if (!isClient) return <div className="rounded-[24px] border border-[#ECE8E3] dark:border-[#2B3139] bg-white dark:bg-[#161A25] p-8 h-[450px] animate-pulse"></div>;

  const monthLabel = `${currentViewDate.getFullYear()} / ${currentViewDate.getMonth() + 1}`;

  return (
    <div className="rounded-[24px] border border-[#D8D2CA] dark:border-[#2B3139] bg-white dark:bg-[#161A25] p-6 lg:p-8 shadow-sm transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h3 className="text-xl font-bold text-[#111827] dark:text-[#F8FAFC]">資產與策略軌跡</h3>
          <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-1 font-medium">包含進出場點位與回撤標記</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* 月份切換器 (具備邊界限制) */}
          <div className="flex items-center h-9 bg-[#F9FAFB] dark:bg-[#1E2330] rounded-lg border border-[#ECE8E3] dark:border-[#2B3139] p-1">
            <button 
              onClick={() => adjustMonth(-1)} 
              disabled={isLeftDisabled}
              className={`px-2 h-full flex items-center rounded-md transition-all ${
                isLeftDisabled ? "opacity-20 cursor-not-allowed" : "hover:bg-white dark:hover:bg-[#2B3139] text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"
              }`}
            >
              ←
            </button>
            <div className="px-3 h-full flex items-center text-xs font-bold text-[#111827] dark:text-[#E2E8F0] border-x border-[#ECE8E3] dark:border-[#2B3139] mx-1">
              {monthLabel}
            </div>
            <button 
              onClick={() => adjustMonth(1)} 
              disabled={isRightDisabled}
              className={`px-2 h-full flex items-center rounded-md transition-all ${
                isRightDisabled ? "opacity-20 cursor-not-allowed" : "hover:bg-white dark:hover:bg-[#2B3139] text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"
              }`}
            >
              →
            </button>
          </div>

          {/* 日期區間切換 */}
          <div className="flex items-center h-9 bg-[#F9FAFB] dark:bg-[#1E2330] p-1 rounded-lg border border-[#ECE8E3] dark:border-[#2B3139]">
            {['7日', '30日', '90日', 'ALL'].map(t => (
              <button 
                key={t} 
                onClick={() => setRange(t)}
                className={`px-4 h-full flex items-center text-xs font-bold rounded-md transition-all ${
                  range === t 
                    ? "bg-white dark:bg-[#2B3139] text-[#111827] dark:text-white shadow-sm border border-[#ECE8E3] dark:border-[#374151]" 
                    : "text-[#9CA3AF] dark:text-[#64748B] hover:text-[#111827] dark:hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 圖表渲染內容 (保持與之前一致) */}
      <div className="h-[320px] w-full relative flex">
        <div className="w-12 h-[280px] flex flex-col justify-between text-[10px] font-mono text-[#9CA3AF] dark:text-[#64748B] pr-2 text-right pt-2 pb-4">
          <span>1,200</span><span>1,150</span><span>1,100</span><span>1,050</span>
        </div>
        <div className="flex-1 h-[300px] relative border-l border-b border-[#ECE8E3] dark:border-[#2B3139]">
          <div className="absolute inset-0 flex flex-col justify-between pt-2 pb-5 z-0">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full border-t border-dashed border-[#F3F4F6] dark:border-[#2B3139]/50"></div>
            ))}
          </div>
          <svg viewBox="0 0 1000 300" className="w-full h-[280px] z-20 relative" preserveAspectRatio="none">
            <defs>
              <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C9D6E3" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#C9D6E3" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path d="M 0,250 C 150,220 250,150 400,180 C 550,210 650,80 850,30 C 900,40 950,90 1000,100 L 1000,300 L 0,300 Z" fill="url(#curveGradient)" />
            <path d="M 0,250 C 150,220 250,150 400,180 C 550,210 650,80 850,30 C 900,40 950,90 1000,100" fill="none" stroke="#7C8CA5" strokeWidth="2.5" />
          </svg>
          <div className="absolute right-[0%] top-[33%] z-30 flex items-center translate-x-1.5 -translate-y-1/2">
            <div className="w-3 h-3 bg-[#111827] dark:bg-white rounded-full shadow-md border-2 border-white dark:border-[#161A25]"></div>
            <div className="bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-mono font-bold px-2 py-1 rounded-md ml-2 shadow-lg">1,148.32</div>
          </div>
          <div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px] font-mono text-[#9CA3AF] dark:text-[#64748B] pt-2 px-2">
            <span>04/01</span><span>04/03</span><span>04/05</span><span>04/07</span><span>04/09 (Today)</span>
          </div>
        </div>
      </div>
    </div>
  );
}