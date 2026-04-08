export type MarketTickerItem = {
  symbol: string;
  lastPrice: number;
  priceChangePercent: number;
};

export type AssetPoint = {
  time: string;
  equity: number;
};

export type CalendarPnl = {
  date: string;
  pnl: number;
};

export type AgentStatus = {
  name: string;
  status: "待命" | "工作中" | "異常" | "完成";
  description: string;
  updatedAt: string;
};

export type StrategyRow = {
  name: string;
  symbol: string;
  status: string;
  pnl: number;
  winRate: number;
};