"use client";

export default function RiskStatusPanel() {
  return (
    <div className="h-full rounded-[24px] border border-[#D8D2CA] dark:border-[#2B3139] bg-white dark:bg-[#161A25] p-6 lg:p-8 shadow-sm flex flex-col justify-between transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-[#111827] dark:text-[#F8FAFC]">風控決策中心</h3>
        
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F9FAFB] dark:bg-[#1E2330] border border-[#ECE8E3] dark:border-[#2B3139] hover:border-[#C7A86D] dark:hover:border-[#C7A86D] transition-all group">
          <span className="w-2 h-2 rounded-full bg-[#C7A86D] group-hover:animate-pulse"></span>
          <span className="text-[11px] font-bold text-[#C7A86D]">Protective Mode: 待命中</span>
          <span className="text-[10px] text-[#9CA3AF] dark:text-[#64748B] ml-1">⚙️</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="p-5 rounded-xl bg-[#FAF0EF] dark:bg-[#EF4444]/10 border border-[#F5E1DF] dark:border-[#EF4444]/20 relative overflow-hidden flex flex-col justify-between transition-colors">
          <div className="flex justify-between items-start mb-2">
            <div className="text-xs font-bold text-[#C98F8B] dark:text-[#EF4444]">當前回撤 (Drawdown)</div>
            <div className="text-lg font-black font-mono text-[#C98F8B] dark:text-[#EF4444]">
              -8.16% <span className="text-xs font-medium opacity-70 ml-1">/ 極限 15%</span>
            </div>
          </div>
          <div className="w-full bg-white/60 dark:bg-[#161A25]/50 h-2 rounded-full mb-4 overflow-hidden border border-[#F5E1DF] dark:border-[#EF4444]/20">
            <div className="bg-[#C98F8B] dark:bg-[#EF4444] h-full rounded-full" style={{ width: "54%" }}></div>
          </div>
          <button className="w-full py-2 bg-white dark:bg-[#161A25] border border-[#F5E1DF] dark:border-[#EF4444]/30 text-[#C98F8B] dark:text-[#EF4444] text-xs font-bold rounded-lg hover:bg-[#C98F8B] dark:hover:bg-[#EF4444] hover:text-white dark:hover:text-white transition-colors">
            立即降低部位 (Reduce Risk)
          </button>
        </div>

        <div className="p-5 rounded-xl bg-[#F9FAFB] dark:bg-[#1E2330] border border-[#ECE8E3] dark:border-[#2B3139] flex flex-col justify-between transition-colors">
          <div className="flex justify-between items-start mb-2">
            <div className="text-xs font-bold text-[#6B7280] dark:text-[#94A3B8]">系統總曝險 (Exposure)</div>
            <div className="text-lg font-black font-mono text-[#C7A86D]">
              62% <span className="text-xs font-medium text-[#9CA3AF] dark:text-[#64748B] ml-1">/ 上限 80%</span>
            </div>
          </div>
          <div className="w-full bg-[#ECE8E3] dark:bg-[#0B0E14] h-2 rounded-full mb-4 overflow-hidden">
            <div className="bg-[#C7A86D] h-full rounded-full" style={{ width: "77%" }}></div>
          </div>
          <div className="text-[10px] text-[#9CA3AF] dark:text-[#64748B] text-right font-medium">距離強制停牌尚餘 18% 空間</div>
        </div>

      </div>
    </div>
  );
}