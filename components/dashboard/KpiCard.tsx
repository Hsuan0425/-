"use client";

interface KpiCardProps {
  title: string;
  value: string;
  unit: string;
  isUp?: boolean;
  isWarning?: boolean; // 新增：是否觸發警示
  subLabel?: string;   // 新增：輔助文字（如：回吐率 64%）
}

export default function KpiCard({ title, value, unit, isUp = true, isWarning = false, subLabel }: KpiCardProps) {
  return (
    <div className={`h-full rounded-[16px] border p-5 shadow-sm transition-all duration-300 ${
      isWarning 
        ? "bg-[#FAF0EF] dark:bg-[#EF4444]/10 border-[#C98F8B] dark:border-[#EF4444]/50 animate-pulse-slow" 
        : "bg-white dark:bg-[#161A25] border-[#ECE8E3] dark:border-[#2B3139]"
    }`}>
      <div className={`text-xs font-bold mb-3 uppercase tracking-wider ${
        isWarning ? "text-[#C98F8B] dark:text-[#EF4444]" : "text-[#9CA3AF] dark:text-[#64748B]"
      }`}>{title}</div>
      
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-black tracking-tight ${
          isWarning ? "text-[#C98F8B] dark:text-[#EF4444]" : "text-[#111827] dark:text-[#F8FAFC]"
        }`}>{value}</span>
        <span className={`text-xs font-bold ${
          isWarning ? "text-[#C98F8B] dark:text-[#EF4444]" : "text-[#6B7280] dark:text-[#94A3B8]"
        }`}>{unit}</span>
      </div>

      {subLabel && (
        <div className={`mt-2 text-[10px] font-bold ${
          isWarning ? "text-[#C98F8B] dark:text-[#EF4444]" : "text-[#9CA3AF]"
        }`}>
          {subLabel}
        </div>
      )}
    </div>
  );
}