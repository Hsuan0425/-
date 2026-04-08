import { mockCalendarPnL } from "@/constants/mock-data";

export default function TradingCalendar() {
  // 設定 2026 年 4 月 1 號是星期三，所以前面要補 3 個空格
  const startDayOffset = 3; 

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-slate-100">交易分析日曆</h2>
        <div className="text-sm text-slate-400 bg-slate-800 px-3 py-1 rounded-lg">2026-04</div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {/* 星期標題 */}
        {["日", "一", "二", "三", "四", "五", "六"].map((d) => (
          <div key={d} className="py-2 text-slate-500 font-medium">
            {d}
          </div>
        ))}

        {/* 補足月初的空白格 */}
        {Array(startDayOffset).fill(null).map((_, i) => (
          <div key={`empty-${i}`} className="p-2"></div>
        ))}

        {/* 渲染全月份日期 */}
        {mockCalendarPnL.map((item) => {
          const isProfit = item.pnl > 0;
          const isLoss = item.pnl < 0;
          const isZero = item.pnl === 0;

          // 根據盈虧決定顏色：賺錢紅、賠錢綠、沒賺沒賠深灰
          let boxClass = "bg-slate-950/50 border border-slate-800 text-slate-500";
          if (isProfit) boxClass = "bg-rose-500/10 border border-rose-500/30 text-rose-400";
          if (isLoss) boxClass = "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400";

          return (
            <div
              key={item.date}
              className={`rounded-xl p-2 flex flex-col items-center justify-center min-h-[60px] transition-all hover:scale-105 ${boxClass}`}
            >
              <div className="text-[10px] opacity-60 mb-1">{item.date.slice(-2)}</div>
              <div className="text-xs font-bold">
                {isProfit ? "+" : ""}{item.pnl}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 底部圖例說明 */}
      <div className="mt-6 flex gap-4 text-[10px] text-slate-500 justify-center border-t border-slate-800 pt-4">
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500/50"></span> 獲利</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500/50"></span> 虧損</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-800"></span> 無交易</div>
      </div>
    </div>
  );
}