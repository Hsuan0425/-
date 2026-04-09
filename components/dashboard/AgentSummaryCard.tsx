"use client";

export default function AgentSummaryCard() {
  return (
    <div className="h-full rounded-[24px] bg-white dark:bg-[#161A25] border border-[#D8D2CA] dark:border-[#2B3139] p-6 lg:p-8 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-lg font-bold text-[#111827] dark:text-[#F8FAFC]">Agent 決策指令</h3>
          <div className="text-right">
            <div className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] font-bold mb-0.5">信心指數</div>
            <div className="text-xl font-mono font-black text-[#5B8A72] dark:text-[#10B981]">72%</div>
            <div className="text-[9px] text-[#9CA3AF] mt-0.5">基於 1,243 筆回測</div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="text-[11px] font-bold text-[#6B7280] dark:text-[#94A3B8] mb-2 uppercase">當前操作建議</div>
          <div className="text-4xl font-black text-[#111827] dark:text-white mb-1">保持觀望</div>
          <div className="text-[11px] text-[#C7A86D] font-bold mb-3">等待 70,500 回測支撐</div>
          
          {/* 新增：決策依據標籤 */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {["MA 均線背離", "RSI 45 趨弱", "支撐 70,500"].map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#F9FAFB] dark:bg-[#1E2330] text-[#6B7280] dark:text-[#94A3B8] border border-[#ECE8E3] dark:border-[#374151]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#F3F4F6] dark:border-[#2B3139]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[10px] text-[#6B7280] font-bold">建議倉位</p>
            <p className="text-lg font-black dark:text-white">30%</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-[#6B7280] font-bold">系統風險</p>
            <span className="text-xs font-bold text-[#5B8A72]">LOW</span>
          </div>
        </div>
        <p className="text-[9px] text-[#9CA3AF] text-right font-mono tracking-tighter">
          最後更新：17:44:46
        </p>
      </div>
    </div>
  );
}