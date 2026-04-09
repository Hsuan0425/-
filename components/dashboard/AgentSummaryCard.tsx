"use client";

export default function AgentSummaryCard() {
  return (
    <div className="h-full rounded-[24px] bg-white dark:bg-[#161A25] border border-[#D8D2CA] dark:border-[#2B3139] p-6 lg:p-8 shadow-sm flex flex-col justify-between transition-colors duration-300">
      <div>
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-lg font-bold dark:text-[#F8FAFC]">Agent 網格指令</h3>
          <div className="text-right">
            <div className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] font-bold mb-0.5 uppercase tracking-wider">信心指數</div>
            <div className="text-xl font-mono font-black text-[#10B981]">72%</div>
            <div className="text-[9px] text-[#9CA3AF] mt-0.5">0409V5 網格引擎</div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="text-[11px] font-bold text-[#6B7280] dark:text-[#94A3B8] mb-2 uppercase tracking-widest">當前策略狀態</div>
          <div className="text-4xl font-black text-[#111827] dark:text-white mb-2 tracking-tighter">網格低接</div>
          <div className="text-[11px] text-[#C7A86D] font-bold mb-4">RSI 低於 55 尋求金叉或超賣進場</div>
          
          <div className="flex flex-wrap gap-2">
            {["RSI 網格", "多層停利", "5 幣監控", "冷卻 15m"].map(tag => (
              <span key={tag} className="text-[10px] px-2.5 py-1 rounded-md bg-[#F9FAFB] dark:bg-[#1E2330] text-[#6B7280] dark:text-[#94A3B8] border border-[#ECE8E3] dark:border-[#374151] font-bold transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#F3F4F6] dark:divide-[#2B3139] flex items-center justify-between">
         <span className="text-[10px] text-[#9CA3AF] font-bold uppercase">Strategy: 0409V5</span>
         <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
      </div>
    </div>
  );
}