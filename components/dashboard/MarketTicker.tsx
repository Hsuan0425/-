"use client";

export default function MarketTicker() {
  const tickers = [
    { coin: "BTC", price: "71,363.78", high: "71,713", low: "67,760", rsi: 45, rsiDir: "↓", status: "趨勢轉弱", statusColor: "text-[#C98F8B] dark:text-[#EF4444]" },
    { coin: "ETH", price: "2,185.28", high: "2,219", low: "2,183", rsi: 72, rsiDir: "↑", status: "動能過熱", statusColor: "text-[#C7A86D] dark:text-[#F59E0B]" },
    { coin: "SOL", price: "82.21", high: "83.58", low: "82.19", rsi: 52, rsiDir: "→", status: "橫盤整理", statusColor: "text-[#9CA3AF] dark:text-[#94A3B8]" }
  ];

  return (
    <div className="h-full rounded-[24px] border border-[#ECE8E3] dark:border-[#2B3139] bg-white dark:bg-[#161A25] p-6 shadow-sm">
      <h3 className="text-lg font-bold text-[#111827] dark:text-[#F8FAFC] mb-5">市場動能監測</h3>
      <div className="space-y-3">
        {tickers.map((t, i) => (
          <div key={i} className="p-3 rounded-xl border border-[#ECE8E3] dark:border-[#2B3139] bg-[#F9FAFB] dark:bg-[#1E2330]">
            <div className="flex items-center justify-between">
              <div className="w-1/3">
                <div className="text-xs font-bold text-[#111827] dark:text-[#E2E8F0]">{t.coin}</div>
                <div className="font-mono text-sm font-bold text-[#334155] dark:text-[#94A3B8]">{t.price}</div>
                {/* 新增：日內高低點 */}
                <div className="text-[9px] text-[#9CA3AF] dark:text-[#64748B] mt-0.5 font-mono">
                  H {t.high} / L {t.low}
                </div>
              </div>
              <div className="w-1/3 flex flex-col items-center">
                <div className="text-[10px] font-bold text-[#6B7280] dark:text-[#64748B] mb-0.5">RSI {t.rsi} {t.rsiDir}</div>
                <div className={`text-[11px] font-semibold ${t.statusColor}`}>{t.status}</div>
              </div>
              <div className="w-1/4 text-right">
                {/* 修正：語意按鈕 */}
                <button className="text-[10px] font-bold text-[#6B7280] dark:text-[#94A3B8] hover:text-[#111827] dark:hover:text-white border border-[#ECE8E3] dark:border-[#374151] bg-white dark:bg-[#2B3139] px-2 py-1 rounded transition-all">
                  K線圖 →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}