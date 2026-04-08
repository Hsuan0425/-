export default function SimpleTradingDashboardStarter() {
  const stats = [
    { label: "總資產", value: "$1,252.64", sub: "+12.4%" },
    { label: "今日損益", value: "+$54.41", sub: "已實現" },
    { label: "執行中策略", value: "3", sub: "BTC / ETH / SOL" },
    { label: "風控狀態", value: "正常", sub: "Protective Mode: Off" },
  ];

  const agents = [
    { name: "量化研究員", status: "工作中", desc: "策略構想與參數優化" },
    { name: "風控官", status: "正常", desc: "監控回撤、連虧、曝險" },
    { name: "執行工程師", status: "工作中", desc: "訊號接收與下單流程" },
    { name: "市場分析師", status: "待命", desc: "行情摘要與異常事件" },
  ];

  const logs = [
    "14:30 啟動 Dashboard 成功",
    "14:32 BTCUSDT 訊號更新完成",
    "14:35 風控檢查完成，系統正常",
    "14:40 無待處理指令",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">交易 Web Dashboard</h1>
            <p className="text-slate-400 mt-2">從 0 開始的簡易版控制台，可先接假資料，後續再串接 API 與資料庫。</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
            最後更新：2026-04-08 15:00
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
              <div className="text-sm text-slate-400">{item.label}</div>
              <div className="mt-2 text-2xl font-semibold">{item.value}</div>
              <div className="mt-1 text-sm text-emerald-400">{item.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">資產走勢</h2>
              <div className="text-sm text-slate-400">示意版</div>
            </div>
            <div className="h-72 rounded-2xl border border-dashed border-slate-700 flex items-center justify-center text-slate-500">
              這裡之後可接入圖表元件，例如 Recharts / TradingView
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-xl font-semibold mb-4">Agent 狀態</h2>
            <div className="space-y-3">
              {agents.map((agent) => (
                <div key={agent.name} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-medium">{agent.name}</div>
                    <span className="text-xs rounded-full px-2 py-1 border border-slate-700 text-slate-300">
                      {agent.status}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-slate-400">{agent.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-xl font-semibold mb-4">策略清單</h2>
            <div className="overflow-hidden rounded-xl border border-slate-800">
              <table className="w-full text-sm">
                <thead className="bg-slate-950 text-slate-400">
                  <tr>
                    <th className="text-left px-4 py-3">策略</th>
                    <th className="text-left px-4 py-3">幣種</th>
                    <th className="text-left px-4 py-3">狀態</th>
                    <th className="text-right px-4 py-3">績效</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["MA + RSI", "BTCUSDT", "執行中", "+12.4%"],
                    ["Hydra 3m", "ETHUSDT", "執行中", "+8.9%"],
                    ["Wave Regime", "SOLUSDT", "待觀察", "-1.7%"],
                  ].map((row) => (
                    <tr key={row[0] + row[1]} className="border-t border-slate-800">
                      <td className="px-4 py-3">{row[0]}</td>
                      <td className="px-4 py-3 text-slate-300">{row[1]}</td>
                      <td className="px-4 py-3 text-slate-300">{row[2]}</td>
                      <td className="px-4 py-3 text-right font-medium">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-xl font-semibold mb-4">系統事件</h2>
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log} className="rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}