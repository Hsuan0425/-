import MarketTicker from "@/components/dashboard/MarketTicker";
import AssetChart from "@/components/dashboard/AssetChart";
import TradingCalendar from "@/components/dashboard/TradingCalendar";
import AgentPanel from "@/components/dashboard/AgentPanel";
import StrategyTable from "@/components/dashboard/StrategyTable";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100 font-sans">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* 標題區 */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">交易 Dashboard</h1>
            <p className="mt-2 text-slate-400">
              專業版架構：已實現 API 代理、模組化組件與型別安全。
            </p>
          </div>
          <div className="hidden md:block rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300 shadow-lg">
            系統狀態：<span className="text-emerald-400 font-medium">連線中 (Binance API)</span>
          </div>
        </div>

        {/* 1. 即時行情監測 (自帶 API 輪詢) */}
        <MarketTicker />

        {/* 2. 中間層：圖表與 Agent 狀態 */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 shadow-2xl">
            <AssetChart />
          </div>
          <div className="shadow-2xl">
            <AgentPanel />
          </div>
        </div>

        {/* 3. 底部：交易日曆與策略表格 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="shadow-2xl">
            <TradingCalendar />
          </div>
          <div className="shadow-2xl">
            <StrategyTable />
          </div>
        </div>

      </div>
    </main>
  );
}