"use client";

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SimpleTradingDashboardStarter() {
  // 建立一個抽屜，專門放「多個幣種」的陣列資料
  const [topCoins, setTopCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        // 這裡可以自訂你想監控的幣種，記得都要加上 USDT 結尾
        const symbols = '["BTCUSDT","ETHUSDT","SOLUSDT","BNBUSDT","DOGEUSDT","XRPUSDT"]';
        // 改用 ticker/24hr 這支 API，可以同時抓到價格和 24 小時漲跌幅
        const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${symbols}`);
        const data = await res.json();
        
        // 把抓到的資料放進抽屜裡
        setTopCoins(data);
      } catch (error) {
        console.error("讀取失敗", error);
      }
    };

    fetchCoins(); 
    // 一樣每 5 秒更新一次
    const interval = setInterval(fetchCoins, 5000);
    return () => clearInterval(interval);
  }, []);

  // 帳戶統計資料（恢復成個人資產狀態）
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

  const chartData = [
    { time: '09:00', value: 1150 },
    { time: '10:00', value: 1180 },
    { time: '11:00', value: 1160 },
    { time: '12:00', value: 1210 },
    { time: '13:00', value: 1190 },
    { time: '14:00', value: 1230 },
    { time: '15:00', value: 1252.64 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">交易 Web Dashboard</h1>
            <p className="text-slate-400 mt-2">上方為市場即時強勢幣監測，每 5 秒自動更新。</p>
          </div>
        </div>

        {/* ========== 新增：頂部強勢幣監測列 ========== */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {topCoins.length > 0 ? topCoins.map((coin) => {
            // 判斷漲跌來決定顯示綠色還是紅色
            const isUp = parseFloat(coin.priceChangePercent) >= 0;
            // 整理價格顯示格式（太便宜的幣顯示多一點小數點）
            const price = parseFloat(coin.lastPrice).toLocaleString('en-US', { 
              minimumFractionDigits: parseFloat(coin.lastPrice) < 1 ? 4 : 2, 
              maximumFractionDigits: parseFloat(coin.lastPrice) < 1 ? 4 : 2 
            });
            // 把 BTCUSDT 後面的 USDT 拿掉，顯示 BTC 就好
            const name = coin.symbol.replace('USDT', '');

            return (
              <div key={coin.symbol} className="min-w-[150px] rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-sm shrink-0">
                <div className="flex justify-between items-center">
                  <div className="font-bold text-slate-200">{name}</div>
                  <div className={`text-sm font-medium ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isUp ? '+' : ''}{parseFloat(coin.priceChangePercent).toFixed(2)}%
                  </div>
                </div>
                <div className="mt-2 text-xl font-semibold">${price}</div>
              </div>
            );
          }) : (
            <div className="text-slate-400 text-sm py-4">載入即時報價中...</div>
          )}
        </div>
        {/* ======================================= */}

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
              <h2 className="text-xl font-semibold">資產走勢 (測試資料)</h2>
              <div className="text-sm text-slate-400">近六小時</div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 50', 'dataMax + 50']} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#34d399' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
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
      </div>
    </div>
  );
}