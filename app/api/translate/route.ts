import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  texts: z.array(z.string().min(1).max(5000)).min(1).max(20),
  source: z.literal("vi"),
  target: z.literal("en"),
});

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-translate-secret");
  if (secret !== process.env.TRANSLATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { texts, source, target } = parsed.data;
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Translation not configured" }, { status: 503 });
  }

  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: texts, source, target, format: "text" }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error("Google Translate error:", errText);
    return NextResponse.json({ error: "Translation API error" }, { status: 502 });
  }

  const data = await res.json() as { data: { translations: { translatedText: string }[] } };
  const translated = data.data.translations.map((t) => t.translatedText);

  return NextResponse.json({ translated });
}
