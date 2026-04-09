"use client";

export default function StrategyTable() {
  const strategies = [
    { name: "MA + RSI", coin: "BTCUSDT", hitRate: "68.5%", profitFactor: "2.14", avgRvR: "1.5 : 1", pnl: "+12.4%", status: "RUNNING" },
    { name: "Hydra 3m", coin: "ETHUSDT", hitRate: "52.0%", profitFactor: "1.85", avgRvR: "2.8 : 1", pnl: "+8.9%", status: "RUNNING" },
    { name: "Wave Trend", coin: "SOLUSDT", hitRate: "41.2%", profitFactor: "0.82", avgRvR: "0.9 : 1", pnl: "-1.7%", status: "STOPPED" }
  ];

  return (
    <div className="h-full rounded-[24px] border border-[#D8D2CA] dark:border-[#2B3139] bg-white dark:bg-[#161A25] p-6 lg:p-8 shadow-sm overflow-x-auto transition-colors duration-300">
      <div className="flex justify-between items-center mb-6 min-w-[500px]">
        <h3 className="text-lg font-bold text-[#111827] dark:text-[#F8FAFC]">策略績效評估</h3>
        <button className="text-[10px] font-bold text-[#111827] dark:text-[#94A3B8] border border-[#D8D2CA] dark:border-[#374151] px-3 py-1 rounded-md hover:bg-[#F9FAFB] dark:hover:bg-[#1E2330] transition-colors">
          + 新增策略
        </button>
      </div>
      
      <div className="min-w-[500px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] border-b border-[#ECE8E3] dark:border-[#2B3139] tracking-wider uppercase transition-colors">
              <th className="pb-3 font-bold">策略模型</th>
              <th className="pb-3 font-bold text-right">勝率</th>
              <th className="pb-3 font-bold text-right group cursor-help relative">
                Profit Factor
                <span className="ml-1 text-[#C7A86D] border-b border-dashed border-[#C7A86D]">?</span>
              </th>
              <th className="pb-3 font-bold text-right">平均盈虧比</th>
              <th className="pb-3 font-bold text-right">累計績效</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F4F6] dark:divide-[#2B3139]">
            {strategies.map((s, i) => {
              const isGoodPF = parseFloat(s.profitFactor) > 1.5;
              const isBadPF = parseFloat(s.profitFactor) < 1.0;
              
              return (
                <tr key={i} className={`hover:bg-[#F9FAFB] dark:hover:bg-[#1E2330] transition-colors ${s.status === 'STOPPED' ? 'opacity-50 grayscale' : ''}`}>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${s.status === 'RUNNING' ? 'bg-[#10B981]' : 'bg-[#64748B]'}`}></div>
                      <div className="font-bold text-[#111827] dark:text-[#E2E8F0] text-sm">{s.name}</div>
                    </div>
                    <div className="text-[10px] text-[#9CA3AF] dark:text-[#64748B] mt-0.5 ml-3.5">{s.coin}</div>
                  </td>
                  
                  <td className="py-4 text-right">
                    <span className="font-mono text-xs font-semibold text-[#6B7280] dark:text-[#94A3B8]">{s.hitRate}</span>
                  </td>
                  
                  <td className="py-4 text-right">
                    <span className={`font-mono text-sm font-black px-2 py-1 rounded-md transition-colors ${
                      isGoodPF ? 'bg-[#EDF5F1] dark:bg-[#10B981]/10 text-[#5B8A72] dark:text-[#10B981]' 
                      : isBadPF ? 'bg-[#FAF0EF] dark:bg-[#EF4444]/10 text-[#C98F8B] dark:text-[#EF4444]' 
                      : 'bg-[#F9FAFB] dark:bg-[#1E2330] text-[#111827] dark:text-[#E2E8F0]'
                    }`}>
                      {s.profitFactor}
                    </span>
                  </td>
                  
                  <td className="py-4 text-right">
                    <span className="text-xs font-mono font-medium text-[#9CA3AF] dark:text-[#64748B]">{s.avgRvR}</span>
                  </td>
                  
                  <td className={`py-4 text-right font-mono font-bold text-sm ${s.pnl.startsWith('+') ? 'text-[#5B8A72] dark:text-[#10B981]' : 'text-[#C98F8B] dark:text-[#EF4444]'}`}>
                    {s.pnl}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}