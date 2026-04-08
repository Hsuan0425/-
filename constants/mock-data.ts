import type { AssetPoint, CalendarPnl, AgentStatus, StrategyRow } from "@/lib/types";

export const mockAssetCurve: AssetPoint[] = [
  { time: "03/18", equity: 1100 },
  { time: "03/19", equity: 1150 },
  { time: "03/20", equity: 1120 },
  { time: "03/21", equity: 1210 },
  { time: "03/22", equity: 1180 },
  { time: "03/23", equity: 1252 },
];

export const mockCalendarPnL: CalendarPnl[] = [
  { date: "2026-04-01", pnl: 0 }, { date: "2026-04-02", pnl: 0 },
  { date: "2026-04-03", pnl: 0 }, { date: "2026-04-04", pnl: -120.50 },
  { date: "2026-04-05", pnl: 34.20 }, { date: "2026-04-06", pnl: 0 },
  { date: "2026-04-07", pnl: -45.00 }, { date: "2026-04-08", pnl: 54.41 },
  { date: "2026-04-09", pnl: 0 }, { date: "2026-04-10", pnl: 0 },
  { date: "2026-04-11", pnl: 0 }, { date: "2026-04-12", pnl: 0 },
  { date: "2026-04-13", pnl: 0 }, { date: "2026-04-14", pnl: 0 },
  { date: "2026-04-15", pnl: 0 }, { date: "2026-04-16", pnl: 0 },
  { date: "2026-04-17", pnl: 0 }, { date: "2026-04-18", pnl: 0 },
  { date: "2026-04-19", pnl: 0 }, { date: "2026-04-20", pnl: 0 },
  { date: "2026-04-21", pnl: 0 }, { date: "2026-04-22", pnl: 0 },
  { date: "2026-04-23", pnl: 0 }, { date: "2026-04-24", pnl: 0 },
  { date: "2026-04-25", pnl: 0 }, { date: "2026-04-26", pnl: 0 },
  { date: "2026-04-27", pnl: 0 }, { date: "2026-04-28", pnl: 0 },
  { date: "2026-04-29", pnl: 0 }, { date: "2026-04-30", pnl: 0 },
];

export const mockAgents: AgentStatus[] = [
  {
    name: "量化研究員",
    status: "工作中",
    description: "持續檢查 BTC / ETH / SOL 策略表現",
    updatedAt: "2026-04-08 15:00",
  },
  {
    name: "風控官",
    status: "待命",
    description: "監控回撤、連虧與 Protective Mode",
    updatedAt: "2026-04-08 15:00",
  },
  {
    name: "執行工程師",
    status: "工作中",
    description: "監看下單與成交回報",
    updatedAt: "2026-04-08 15:00",
  },
  {
    name: "市場分析師",
    status: "待命",
    description: "觀察行情波動與異常事件",
    updatedAt: "2026-04-08 15:00",
  },
];

export const mockStrategies: StrategyRow[] = [
  { name: "MA + RSI", symbol: "BTCUSDT", status: "執行中", pnl: 12.4, winRate: 61.2 },
  { name: "Hydra 3m", symbol: "ETHUSDT", status: "執行中", pnl: 8.9, winRate: 57.8 },
  { name: "Wave Regime", symbol: "SOLUSDT", status: "觀察中", pnl: -1.7, winRate: 48.6 },
];