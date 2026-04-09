"use client";

import React, { useState, useEffect } from "react";

export default function TradingCalendar() {
  const [isClient, setIsClient] = useState(false);
  const now = new Date();
  const [currentViewDate, setCurrentViewDate] = useState(new Date());

  // 設定一年前為邊界
  const entryDate = new Date();
  entryDate.setFullYear(now.getFullYear() - 1);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 計算該月資訊
  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    // 修正為週一開始 (0:一, 1:二... 6:日)
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const days = new Date(year, month + 1, 0).getDate();
    return { startOffset, days };
  };

  const { startOffset, days } = getDaysInMonth(currentViewDate.getFullYear(), currentViewDate.getMonth());

  // 模擬損益獲取函式 (未來對接 status.json)
  const getDailyPnL = (day: number) => {
    const seed = (currentViewDate.getMonth() + 1) * day;
    if (seed % 7 === 0) return 0;
    return (seed % 5 === 0) ? -(seed % 20) : (seed % 30);
  };

  // 💡 新增：計算當月總盈虧
  const calculateMonthlyTotal = () => {
    let total = 0;
    for (let d = 1; d <= days; d++) {
      total += getDailyPnL(d);
    }
    return total;
  };

  const monthlyTotal = calculateMonthlyTotal();

  const adjustMonth = (offset: number) => {
    const newDate = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + offset, 1);
    if (offset > 0 && newDate > now) return;
    if (offset < 0 && newDate < new Date(entryDate.getFullYear(), entryDate.getMonth(), 1)) return;
    setCurrentViewDate(newDate);
  };

  const isRightDisabled = currentViewDate.getFullYear() === now.getFullYear() && currentViewDate.getMonth() === now.getMonth();
  const isLeftDisabled = currentViewDate.getFullYear() === entryDate.getFullYear() && currentViewDate.getMonth() === entryDate.getMonth();

  if (!isClient) return <div className="h-[450px] animate-pulse bg-white dark:bg-[#161A25] rounded-[24px]"></div>;

  const numWeeks = Math.ceil((startOffset + days) / 7);

  return (
    <div className="rounded-[24px] border border-[#D8D2CA] dark:border-[#2B3139] bg-white dark:bg-[#161A25] p-6 lg:p-8 shadow-sm transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        {/* 💡 修改：動態標題與總計顯示 */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-[#111827] dark:text-[#F8FAFC]">錢錢去哪了</h3>
            <span className="text-xs font-mono text-[#9CA3AF] dark:text-[#64748B]">
              ({currentViewDate.getFullYear()} / {currentViewDate.getMonth() + 1})
            </span>
          </div>
          <div className={`text-sm font-black mt-1 ${monthlyTotal >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
            當月累計損益：{monthlyTotal > 0 ? "+" : ""}{monthlyTotal.toFixed(1)} USDT
          </div>
        </div>

        <div className="flex items-center h-8 bg-[#F9FAFB] dark:bg-[#1E2330] rounded-lg border border-[#ECE8E3] dark:border-[#2B3139] p-1">
          <button 
            onClick={() => adjustMonth(-1)} 
            disabled={isLeftDisabled} 
            className={`px-2 transition-opacity ${isLeftDisabled ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white dark:hover:bg-[#2B3139]'}`}
          >←</button>
          <div className="px-3 text-[11px] font-bold text-[#111827] dark:text-[#E2E8F0] border-x border-[#ECE8E3] dark:border-[#2B3139] mx-1">
            {currentViewDate.getFullYear()} / {currentViewDate.getMonth() + 1}
          </div>
          <button 
            onClick={() => adjustMonth(1)} 
            disabled={isRightDisabled} 
            className={`px-2 transition-opacity ${isRightDisabled ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white dark:hover:bg-[#2B3139]'}`}
          >→</button>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2">
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(h => (
          <div key={h} className="text-[10px] text-center font-bold text-[#9CA3AF] mb-2">{h}</div>
        ))}
        <div className="text-[10px] text-center font-bold text-[#111827] dark:text-[#94A3B8] border-l border-[#ECE8E3] dark:border-[#2B3139] pl-2 mb-2">週小計</div>

        {Array.from({ length: numWeeks }).map((_, weekIdx) => {
          let currentWeekSum = 0;
          
          return (
            <React.Fragment key={weekIdx}>
              {Array.from({ length: 7 }).map((_, dayIdx) => {
                const pos = weekIdx * 7 + dayIdx;
                const dateNum = pos - startOffset + 1;
                const isValidDate = dateNum > 0 && dateNum <= days;
                
                const pnl = isValidDate ? getDailyPnL(dateNum) : 0;
                currentWeekSum += pnl;

                const isToday = isValidDate && 
                                currentViewDate.getFullYear() === now.getFullYear() && 
                                currentViewDate.getMonth() === now.getMonth() && 
                                dateNum === now.getDate();

                if (!isValidDate) return <div key={pos} className="aspect-square opacity-0"></div>;

                return (
                  <div key={pos} className={`aspect-square flex flex-col justify-between p-1.5 rounded-lg border transition-all bg-white dark:bg-[#1E2330] ${
                    isToday ? 'border-[#C7A86D] ring-1 ring-[#C7A86D]' : 'border-[#ECE8E3] dark:border-[#2B3139]'
                  } hover:border-[#111827] dark:hover:border-[#94A3B8]`}>
                    <span className="text-[9px] text-[#9CA3AF] dark:text-[#64748B] font-bold">{dateNum}</span>
                    <span className={`text-[10px] text-center font-bold ${pnl > 0 ? 'text-[#10B981]' : pnl < 0 ? 'text-[#EF4444]' : 'text-[#94A3B8]'}`}>
                      {pnl !== 0 ? (pnl > 0 ? `+${pnl}` : pnl) : "0"}
                    </span>
                  </div>
                );
              })}

              <div className={`aspect-square flex flex-col justify-center items-center rounded-lg border-l-4 ml-1 transition-colors ${
                currentWeekSum >= 0 
                  ? 'bg-[#F9FAFB] dark:bg-[#10B981]/10 border-[#10B981]' 
                  : 'bg-[#FAF0EF] dark:bg-[#EF4444]/10 border-[#EF4444]'
              }`}>
                <span className="text-[8px] font-bold text-[#6B7280] dark:text-[#94A3B8]">Total</span>
                <span className={`text-[10px] font-black ${currentWeekSum >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                  {currentWeekSum > 0 ? "+" : ""}{currentWeekSum.toFixed(1)}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}