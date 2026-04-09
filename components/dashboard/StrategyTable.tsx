"use client";

export default function StrategyTable() {
  const activePositions = [
    { coin: "BTCUSDT", qty: "0.015", pnl: "+2.4%", tpStatus: "TP1 DONE" },
    { coin: "ETHUSDT", qty: "0.12", pnl: "+4.1%", tpStatus: "TP2 DONE" },
    { coin: "SOLUSDT", qty: "5.0", pnl: "-1.2%", tpStatus: "HOLDING" },
    { coin: "BNBUSDT", qty: "2.1", pnl: "0.0%", tpStatus: "INITIALIZED" }
  ];

  return (
    <div className="h-full rounded-[24px] border border-[#D8D2CA] dark:border-[#2B3139] bg-white dark:bg-[#161A25] p-6 lg:p-8 shadow-sm transition-colors duration-300">
      <h3 className="text-lg font-bold dark:text-[#F8FAFC] mb-5">即時網格持倉進度</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] text-[#6B7280] border-b border-[#ECE8E3] dark:border-[#2B3139] uppercase font-bold tracking-wider">
              <th className="pb-3">幣種</th>
              <th className="pb-3 text-right">當前進度</th>
              <th className="pb-3 text-right">損益</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F4F6] dark:divide-[#2B3139]">
            {activePositions.map((pos) => (
              <tr key={pos.coin} className="hover:bg-[#F9FAFB] dark:hover:bg-[#1E2330] transition-colors">
                <td className="py-4 font-bold dark:text-[#E2E8F0] text-sm">{pos.coin}</td>
                <td className="py-4 text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    pos.tpStatus.includes('DONE') ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#64748B]/10 text-[#64748B]'
                  }`}>
                    {pos.tpStatus}
                  </span>
                </td>
                <td className={`py-4 text-right font-mono font-bold text-sm ${pos.pnl.startsWith('+') ? 'text-[#10B981]' : pos.pnl === '0.0%' ? 'text-[#94A3B8]' : 'text-[#EF4444]'}`}>
                  {pos.pnl}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}