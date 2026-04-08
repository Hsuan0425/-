"use client";

import { useEffect, useState } from "react";
import type { MarketTickerItem } from "@/lib/types";

export default function MarketTicker() {
  const [items, setItems] = useState<MarketTickerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchCoins = async () => {
      try {
        setError("");
        // 優先嘗試自己的 API，如果失敗就改用前端直連
        let res = await fetch("/api/market");
        
        if (!res.ok) {
           // 如果雲端 API 被擋，直接從前端抓取幣安資料 (備援方案)
           const symbols = '["BTCUSDT","ETHUSDT","SOLUSDT","BNBUSDT","DOGEUSDT","XRPUSDT"]';
           res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${symbols}`);
        }

        const data = await res.json();
        const formattedData = Array.isArray(data) ? data : data.data;

        if (isMounted && formattedData) {
          const processed = formattedData.map((item: any) => ({
            symbol: item.symbol,
            lastPrice: Number(item.lastPrice),
            priceChangePercent: Number(item.priceChangePercent),
          }));
          setItems(processed);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError("市場連線不穩，請稍後");
          setLoading(false);
        }
      }
    };

    fetchCoins();
    const interval = setInterval(fetchCoins, 5000);
    return () => { isMounted = false; clearInterval(interval); };
  }, []);

  // ... 下方的 return UI 部分保持不變 ...
  if (loading) return <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400">行情載入中...</div>;
  if (error) return <div className="rounded-2xl border border-red-900 bg-slate-900 p-4 text-sm text-red-400">{error}</div>;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="mb-3 text-sm font-medium text-slate-300">即時行情監測列</div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {items.map((item) => {
          const isUp = item.priceChangePercent >= 0;
          return (
            <div key={item.symbol} className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
              <div className="text-sm text-slate-300">{item.symbol}</div>
              <div className="mt-1 text-lg font-semibold text-slate-100">{item.lastPrice.toLocaleString()}</div>
              <div className={`mt-1 text-sm ${isUp ? "text-rose-400" : "text-emerald-400"}`}>{isUp ? "+" : ""}{item.priceChangePercent.toFixed(2)}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}