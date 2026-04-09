import type { AssetPoint, CalendarPnl, AgentStatus, StrategyRow } from "@/lib/types";

// 取得台北時間 (UTC+8) 的日期物件
const getTaipeiDate = () => {
  const now = new Date();
  return new Date(now.getTime() + (8 * 60 * 60 * 1000));
};

const taipeiNow = getTaipeiDate();
const currentMonth = taipeiNow.getMonth() + 1;
const currentYear = taipeiNow.getFullYear();

// 1. 動態資產走勢圖 (對齊最近 7 天)
export const mockAssetCurve: AssetPoint[] = Array.from({ length: 7 }).map((_, i) => {
  const d = new Date(taipeiNow);
  d.setDate(taipeiNow.getDate() - (6 - i));
  return {
    time: `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`,
    equity: 1100 + (Math.random() * 200) // 模擬資產波動
  };
});

// 2. 交易分析日曆 (對齊台北當前月份)
// 這裡我們先預設一個月份的資料，未來串接機器人後會從資料庫撈取
export const mockCalendarPnL: CalendarPnl[] = Array.from({ length: 30 }).map((_, i) => {
  const day = i + 1;
  // 模擬一些隨機盈虧，讓畫面看起來有漲有跌
  const randomPnl = day < taipeiNow.getDate() 
    ? Number((Math.random() * 200 - 80).toFixed(2)) 
    : 0;

  return {
    date: `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    pnl: randomPnl,
  };
});

// 3. Agent 狀態與策略 (保持不變，但更新時間對齊台北)
export const mockAgents: AgentStatus[] = [
  {
    name: "量化研究員",
    status: "工作中",
    description: "持續檢查 BTC / ETH / SOL 策略表現",
    updatedAt: `${currentYear}-${currentMonth}-${taipeiNow.getDate()} 15:00 (TPE)`,
  },
  // ... 其他 Agent 依此類推
];

export const mockStrategies: StrategyRow[] = [
  { name: "MA + RSI", symbol: "BTCUSDT", status: "執行中", pnl: 12.4, winRate: 61.2 },
  { name: "Hydra 3m", symbol: "ETHUSDT", status: "執行中", pnl: 8.9, winRate: 57.8 },
  { name: "Wave Regime", symbol: "SOLUSDT", status: "觀察中", pnl: -1.7, winRate: 48.6 },
];