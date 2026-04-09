"use client";

import React from 'react';

interface TradingCalendarProps {
  botData?: {
    updated_at: string;
    history?: { [key: string]: number };
  };
}

export default function TradingCalendar({ botData }: TradingCalendarProps) {
  // 1. 取得台灣時區今日資訊
  const now = new Date();
  const taiwanTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Taipei" }));
  const currentYear = taiwanTime.getFullYear();
  const currentMonth = taiwanTime.getMonth(); 
  const todayDate = taiwanTime.getDate();

  // 2. 計算當月排版資訊
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // 計算月底後需要補齊多少空格到週日 (SUN)
  const lastDayOfMonth = new Date(currentYear, currentMonth, daysInMonth).getDay();
  const adjustedLastDay = lastDayOfMonth === 0 ? 7 : lastDayOfMonth; 
  const suffixEmptySlots = 7 - adjustedLastDay;

  // 3. 數據源
  const allMonthData: { [key: number]: number } = {
    1: 4, 2: 8, 3: 12, 4: 16, 6: 24, 8: 2, 9: 6, 10: 0
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const prefixEmptySlots = Array.from({ length: adjustedFirstDay }, (_, i) => i);
  // 產生下個月的補齊日期 (1, 2, 3...)
  const nextMonthDays = Array.from({ length: suffixEmptySlots }, (_, i) => i + 1);

  // 週小計計算邏輯
  const getWeeklyTotal = (dayOfSun: number) => {
    let total = 0;
    for (let i = dayOfSun - 6; i <= dayOfSun; i++) {
      if (i > 0 && i <= todayDate) {
        total += allMonthData[i] || 0;
      }
    }
    return total;
  };

  return (
    <div className="bg-white dark:bg-[#1C2127] rounded-3xl p-6 shadow-sm border border-[#ECE8E3] dark:border-[#2B3139] h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-black text-[#1F2937] dark:text-white">
            錢錢來時路 <span className="text-[#9CA3AF] font-normal text-sm ml-2">{currentYear} / {currentMonth + 1}</span>
          </h3>
          <p className="text-xs text-green-600 font-bold mt-1">
            當月累計獲利：+{days.reduce((acc, d) => acc + (d <= todayDate ? (allMonthData[d] || 0) : 0), 0)} USDT
          </p>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2">
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', '週小計'].map(d => (
          <div key={d} className="text-[10px] font-bold text-[#9CA3AF] text-center pb-2 uppercase">{d}</div>
        ))}

        {/* 1. 月初補白 (不顯示日期) */}
        {prefixEmptySlots.map(i => <div key={`pre-${i}`} />)}

        {/* 2. 當月日期循環 */}
        {days.map((day) => {
          const isToday = day === todayDate;
          const isFuture = day > todayDate;
          const pnl = allMonthData[day] || 0;
          const isSunday = (day + adjustedFirstDay) % 7 === 0;

          return (
            <React.Fragment key={day}>
              <div className={`aspect-square border rounded-xl flex flex-col items-center justify-center relative transition-all
                ${isToday ? 'border-[#C7A86D] bg-[#FFFBF2] ring-1 ring-[#C7A86D] z-10' : 'border-[#F3F2EE] dark:border-[#2B3139]'}
                ${isFuture ? 'bg-gray-50/30' : 'bg-white'}
              `}>
                <span className={`absolute top-1 left-1.5 text-[10px] ${isToday ? 'font-black text-[#C7A86D]' : 'text-[#9CA3AF]'}`}>
                  {day}
                </span>
                {!isFuture && (
                  <>
                    {isToday && pnl === 0 ? (
                      <span className="text-[9px] text-gray-400 italic">Trading...</span>
                    ) : pnl !== 0 ? (
                      <span className={`text-[11px] font-bold ${pnl > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {pnl > 0 ? `+${pnl}` : pnl}
                      </span>
                    ) : null}
                  </>
                )}
              </div>

              {/* 每週日顯示一次小計 */}
              {isSunday && (
                <div className="flex items-center justify-center border-l border-dashed border-gray-100">
                  <span className="text-[11px] font-black text-green-600">
                    +{getWeeklyTotal(day)}
                  </span>
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* 3. 月底補齊下個月日期 (直到 SUN) */}
        {nextMonthDays.map((nextDay) => (
          <div key={`next-${nextDay}`} className="aspect-square border border-[#F3F2EE] border-dashed rounded-xl bg-gray-50/10 flex items-center justify-center relative">
            <span className="absolute top-1 left-1.5 text-[10px] text-[#D1D5DB] font-light">
              {nextDay}
            </span>
            {/* 下個月日期不顯示任何 PNL */}
          </div>
        ))}

        {/* 4. 最後一週的週小計 (強行對齊到第 8 欄) */}
        {suffixEmptySlots > 0 && (
          <div className="flex items-center justify-center border-l border-dashed border-gray-100">
            <span className="text-[11px] font-black text-green-600">
              +{getWeeklyTotal(daysInMonth)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}