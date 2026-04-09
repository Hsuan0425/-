import { NextResponse } from 'next/server';

export async function GET() {
  // 從環境變數讀取，確保安全性，不會將密鑰洩漏在 GitHub 上
  // 改成這樣，確保它是一個乾淨的字串
const API_KEY = String(process.env.JSONBIN_API_KEY).trim();
const BIN_ID = String(process.env.JSONBIN_BIN_ID).trim();

  // 如果環境變數沒抓到，回傳明確的錯誤提示
  if (!BIN_ID || !API_KEY) {
    return NextResponse.json({ 
      error: "API 配置缺失", 
      message: "請檢查 .env.local 或 Vercel 環境變數設定" 
    }, { status: 500 });
  }

  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      method: 'GET',
      headers: {
        "X-Master-Key": API_KEY,
        "X-Bin-Meta": "false",
      },
      // 禁用快取，確保 Dashboard 每次重新整理都能抓到 Bot 最新的數據
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: "JSONBin 請求失敗", detail: errorData }, { status: res.status });
    }

    const data = await res.json();
    
    // 回傳資料核心內容 (data.record)，讓前端 page.tsx 直接使用
    return NextResponse.json(data.record || data);

  } catch (err) {
    return NextResponse.json({ error: "API 伺服器崩潰", detail: String(err) }, { status: 500 });
  }
}