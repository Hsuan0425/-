import { NextResponse } from 'next/server';

export async function GET() {
  // 直接在這裡填入你的真實 Key 和 ID 做測試
  const BIN_ID = "69d7c74d36566621a895bd6d"; 
  const API_KEY = "$2a$10$JFrpJJGbTuSW6ctTeGwho.SdLTqlkIBT5oc/K.t6CTX8ZOVSdC/32"; 

  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      method: 'GET',
      headers: {
        "X-Master-Key": API_KEY,
        "X-Bin-Meta": "false",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: errorData }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data.record || data);

  } catch (err) {
    return NextResponse.json({ error: "崩潰了", detail: String(err) }, { status: 500 });
  }
}