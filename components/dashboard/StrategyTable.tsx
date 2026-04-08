import { mockStrategies } from "@/constants/mock-data";

export default function StrategyTable() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-100">策略管理清單</h2>
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full">
          <thead className="bg-slate-950 text-slate-400">
            <tr><th className="px-4 py-3 text-left">策略</th><th className="px-4 py-3 text-left">幣種</th><th className="px-4 py-3 text-right">績效</th></tr>
          </thead>
          <tbody>
            {mockStrategies.map((item) => (
              <tr key={item.name} className="border-t border-slate-800">
                <td className="px-4 py-3 text-slate-100">{item.name}</td>
                <td className="px-4 py-3 text-slate-300">{item.symbol}</td>
                <td className={`px-4 py-3 text-right font-medium ${item.pnl >= 0 ? "text-rose-400" : "text-emerald-400"}`}>{item.pnl >= 0 ? "+" : ""}{item.pnl}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}