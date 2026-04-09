"use client";

import { useState, useEffect } from "react";

export default function TradingCalendar() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 模擬數據
  const calendarData = [
    { week: 1, days: [{ d: 1, v: 12.5 }, { d: 2, v: -3.2 }, { d: 3, v: 45.1 }, { d: 4, v: 0.0 }, { d: 5, v: -11.2 }, { d: 6, v: 8.4 }, { d: 7, v: -19.3 }], sum: 32.3 },
    { week: 2, days: [{ d: 8, v: 5.1 }, { d: 9, v: 14.2 }, { d: 10, v: -8.5 }, { d: 11, v: -42.3 }, { d: 12, v: 7.1 }, { d: 13, v: -2.3 }, { d: 14, v: -6.2 }], sum: -32.9 },
    { week: 3, days: [{ d: 15, v: 67.5 }, { d: 16, v: 45.4 }, { d: 17, v: -10.4 }, { d: 18, v: 5.5 }, { d: 19, v: 35.8 }, { d: 20, v: -2.0 }, { d: 21, v: -15.3 }], sum: 126.5 },
    { week: 4, days: [{ d: 22, v: -21.0 }, { d: 23, v: 57.8 }, { d: 24, v: 12.4 }, { d: 25, v: -5.6 }, { d: 26, v: 8.9 }, { d: 27, v: 11.2 }, { d: 28, v: 18.5 }], sum: 82.2 },
  ];

  const getHeatmapOpacity = (val: number) => {
    const absVal = Math.abs(val);
    if (absVal === 0) return "opacity-30";
    if (absVal < 10) return "opacity-60";
    if (absVal < 30) return "opacity-80";
    return "opacity-100 font-black";
  };

  if (!isClient) return <div className="rounded-[24px] border border-[#ECE8E3] dark:border-[#2B3139] bg-white dark:bg-[#161A25] p-6 h-[400px] animate-pulse"></div>;

  return (
    <div className="h-full rounded-[24px] border border-[#D8D2CA] dark:border-[#2B3139] bg-white dark:bg-[#161A25] p-6 lg:p-8 shadow-sm overflow-x-auto transition-colors duration-300">
      <div className="flex justify-between items-center mb-6 min-w-[500px]">
        {/* 修改主題文字 */}
        <h3 className="text-lg font-bold text-[#111827] dark:text-[#F8FAFC]">錢錢去哪了</h3>
        <span className="text-[10px] font-bold text-[#9CA3AF] dark:text-[#94A3B8] bg-[#F9FAFB] dark:bg-[#1E2330] px-3 py-1 rounded-md border border-[#ECE8E3] dark:border-[#374151]">
          2026 / 04
        </span>
      </div>
      
      <div className="min-w-[500px]">
        <div className="grid grid-cols-8 gap-2 mb-2 text-[10px] font-bold text-[#9CA3AF] dark:text-[#64748B] text-center tracking-wider">
          <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div><div>SUN</div>
          <div className="text-[#111827] dark:text-[#94A3B8] border-l border-[#ECE8E3] dark:border-[#2B3139] pl-2">週小計</div>
        </div>

        <div className="space-y-2">
          {calendarData.map((weekData) => (
            <div key={weekData.week} className="grid grid-cols-8 gap-2">
              {weekData.days.map((day) => {
                const today = 9; // 模擬今天是 4/9
                const isFuture = day.d > today;
                const isProfit = day.v > 0;
                const isLoss = day.v < 0;

                return (
                  <div key={day.d} className="aspect-square flex flex-col justify-between p-1.5 rounded-lg border border-[#ECE8E3] dark:border-[#2B3139] bg-white dark:bg-[#1E2330] hover:border-[#111827] dark:hover:border-[#94A3B8] transition-colors relative group">
                    <span className="text-[9px] text-[#9CA3AF] dark:text-[#64748B] font-medium">{day.d}</span>
                    
                    {/* 數值渲染邏輯：未來日期不顯示數字，0.0 顯示灰色 0 */}
                    <span className={`text-xs text-center transition-opacity duration-300 ${
                      isFuture ? 'opacity-0' : 
                      isProfit ? 'text-[#5B8A72] dark:text-[#10B981]' : 
                      isLoss ? 'text-[#C98F8B] dark:text-[#EF4444]' : 
                      'text-[#9CA3AF] dark:text-[#4B5563]'
                    } ${getHeatmapOpacity(day.v)}`}>
                      {!isFuture && (isProfit ? `+${day.v}` : (day.v === 0 ? "0" : day.v))}
                    </span>

                    {/* 熱力底線：未來不顯示 */}
                    {!isFuture && day.v !== 0 && (
                      <div className={`absolute bottom-0 left-0 h-0.5 w-full rounded-b-lg transition-colors ${
                        isProfit ? 'bg-[#5B8A72] dark:bg-[#10B981]' : 'bg-[#C98F8B] dark:bg-[#EF4444]'
                      } ${getHeatmapOpacity(day.v)}`}></div>
                    )}
                  </div>
                );
              })}

              <div className={`aspect-square flex flex-col justify-center items-center p-1.5 rounded-lg border-l-4 ml-1 shadow-sm transition-colors ${
                weekData.sum >= 0 
                  ? 'bg-[#F9FAFB] dark:bg-[#10B981]/10 border-[#5B8A72] dark:border-[#10B981]' 
                  : 'bg-[#FAF0EF] dark:bg-[#EF4444]/10 border-[#C98F8B] dark:border-[#EF4444]'
              }`}>
                <span className="text-[9px] text-[#6B7280] dark:text-[#94A3B8] font-bold mb-1">Total</span>
                <span className={`text-sm font-black ${weekData.sum >= 0 ? 'text-[#5B8A72] dark:text-[#10B981]' : 'text-[#C98F8B] dark:text-[#EF4444]'}`}>
                  {weekData.sum > 0 ? "+" : ""}{weekData.sum.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}