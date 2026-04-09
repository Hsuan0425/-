export async function GET() {
  const BIN_ID = process.env.JSONBIN_BIN_ID;
  const API_KEY = process.env.JSONBIN_API_KEY;

  if (!BIN_ID || !API_KEY) {
    return Response.json({ error: "env missing" }, { status: 500 });
  }

  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      headers: {
        "X-Master-Key": API_KEY,
        "X-Bin-Meta": "false",
      },
      cache: "no-store",
    });

    const data = await res.json();

    return Response.json(data.record ?? data);
  } catch (err) {
    return Response.json(
      { error: "fetch failed", detail: String(err) },
      { status: 500 }
    );
  }
}