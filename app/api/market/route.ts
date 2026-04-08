import { NextResponse } from "next/server";

const SYMBOLS = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "DOGEUSDT", "XRPUSDT"];

export async function GET() {
  try {
    const symbols = encodeURIComponent(JSON.stringify(SYMBOLS));
    const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=${symbols}`;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store", // 確保每次都拿到最新資料，不要用舊的快取
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Binance API 失敗: ${res.status}` },
        { status: 502 }
      );
    }

    const raw = await res.json();

    // 將幣安原始資料整理成我們前端好用的格式
    const data = raw.map((item: any) => ({
      symbol: item.symbol,
      lastPrice: Number(item.lastPrice),
      priceChangePercent: Number(item.priceChangePercent),
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("API 錯誤:", error);
    return NextResponse.json(
      { error: "無法讀取市場資料" },
      { status: 500 }
    );
  }
}