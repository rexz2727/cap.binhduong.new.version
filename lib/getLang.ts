import { cookies } from "next/headers";
import type { Lang } from "@/lib/i18n";

export async function getLang(): Promise<Lang> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value;
  return lang === "en" ? "en" : "vi";
}
