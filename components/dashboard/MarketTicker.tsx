"use client";

import React from 'react';

// 定義 Props 介面，讓組件能接收來自 page.tsx 的 botData
interface MarketTickerProps {
  botData?: any;
}

export default function MarketTicker({ botData }: MarketTickerProps) {
  // 核心改動：從 botData 抓取版本號，若無資料則顯示預設值
  const currentVersion = botData?.bot_version || "0409V5";

  const tickers = [
    { coin: "BTC", price: "71,363.78", high: "71,713", low: "67,760", rsi: 45, status: "趨勢轉弱" },
    { coin: "ETH", price: "2,185.28", high: "2,219", low: "2,183", rsi: 72, status: "動能過熱" }, 
    { coin: "SOL", price: "82.21", high: "83.58", low: "82.19", rsi: 52, status: "橫盤整理" },
    { coin: "BNB", price: "592.45", high: "605.10", low: "588.20", rsi: 31, status: "網格低接點" }, 
    { coin: "LINK", price: "18.42", high: "19.10", low: "18.15", rsi: 54, status: "金叉觀察" }
  ];

  return (
    <div className="h-full rounded-[24px] border border-[#ECE8E3] dark:border-[#2B3139] bg-white dark:bg-[#161A25] p-6 shadow-sm transition-colors duration-300">
      {/* 修正：將標題改為動態讀取 currentVersion */}
      <h3 className="text-lg font-bold text-[#111827] dark:text-[#F8FAFC] mb-5">
        市場動能監測 ({currentVersion})
      </h3>
      
      <div className="space-y-3">
        {tickers.map((t) => {
          const isOverbought = t.rsi >= 72;
          const isOversold = t.rsi <= 32;
          return (
            <div key={t.coin} className="p-3 rounded-xl border border-[#ECE8E3] dark:border-[#2B3139] bg-[#F9FAFB] dark:bg-[#1E2330] transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-1/3">
                  <div className="text-xs font-bold dark:text-[#E2E8F0]">{t.coin}USDT</div>
                  <div className="font-mono text-sm font-bold dark:text-[#94A3B8]">{t.price}</div>
                </div>
                <div className="w-1/3 flex flex-col items-center">
                  <div className={`text-[10px] font-bold ${isOverbought ? 'text-[#EF4444]' : isOversold ? 'text-[#10B981]' : 'text-[#64748B]'}`}>
                    RSI {t.rsi}
                  </div>
                  <div className="text-[11px] font-semibold dark:text-[#94A3B8]">{t.status}</div>
                </div>
                <div className="w-1/4 text-right text-[9px] text-[#9CA3AF] font-mono leading-tight">
                  <div>H {t.high}</div>
                  <div>L {t.low}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}