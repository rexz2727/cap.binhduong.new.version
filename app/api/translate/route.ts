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

  const { texts } = parsed.data;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Translation not configured" }, { status: 503 });
  }

  const prompt = `Translate the following Vietnamese texts to English. Return ONLY a JSON array of translated strings in the same order, no explanation.\n\nInput: ${JSON.stringify(texts)}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.1, responseMimeType: "application/json" },
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error("Gemini API error:", errText);
    return NextResponse.json({ error: "Translation API error" }, { status: 502 });
  }

  const data = await res.json() as { candidates: { content: { parts: { text: string }[] } }[] };
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "[]";
  const translated: string[] = JSON.parse(raw);

  if (!Array.isArray(translated) || translated.length !== texts.length) {
    return NextResponse.json({ error: "Unexpected translation response" }, { status: 502 });
  }

  return NextResponse.json({ translated });
}
