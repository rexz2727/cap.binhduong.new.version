import { useState } from "react";
import { TranslateIcon } from "@sanity/icons";
import { useDocumentOperation } from "sanity";
import type { DocumentActionComponent, DocumentActionProps } from "sanity";

type FieldMap = { from: string; to: string }[];

async function callTranslate(texts: string[]): Promise<string[]> {
  const res = await fetch("/api/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-translate-secret": process.env.SANITY_STUDIO_TRANSLATE_SECRET ?? "",
    },
    body: JSON.stringify({ texts, source: "vi", target: "en" }),
  });
  if (!res.ok) throw new Error("Translation failed");
  const data = (await res.json()) as { translated: string[] };
  return data.translated;
}

export function createTranslateAction(fieldMap: FieldMap): DocumentActionComponent {
  return function TranslateAction({ id, type, published }: DocumentActionProps) {
    const { patch, commit } = useDocumentOperation(id, type);
    const [isTranslating, setIsTranslating] = useState(false);

    const doc = published as Record<string, string> | null;
    if (!doc) return null;

    return {
      label: isTranslating ? "Đang dịch…" : "Dịch sang EN",
      icon: TranslateIcon,
      disabled: isTranslating,
      onHandle: async () => {
        setIsTranslating(true);
        try {
          const sourceTexts = fieldMap
            .map((f) => (doc[f.from] as string) ?? "")
            .filter(Boolean);
          if (sourceTexts.length === 0) {
            alert("Không có nội dung để dịch.");
            return;
          }
          const translated = await callTranslate(sourceTexts);
          const patchObj: Record<string, string> = {};
          let idx = 0;
          fieldMap.forEach((f) => {
            if (doc[f.from]) {
              if (translated[idx]) patchObj[f.to] = translated[idx];
              idx++;
            }
          });
          patch.execute([{ set: patchObj }]);
          commit.execute();
        } catch {
          alert("Lỗi dịch thuật. Kiểm tra API key và thử lại.");
        } finally {
          setIsTranslating(false);
        }
      },
    };
  };
}

export const translateNewsAction = createTranslateAction([
  { from: "title", to: "titleEn" },
  { from: "excerpt", to: "excerptEn" },
]);

export const translateLegalAction = createTranslateAction([
  { from: "title", to: "titleEn" },
  { from: "summary", to: "summaryEn" },
]);

export const translateProcedureAction = createTranslateAction([
  { from: "title", to: "titleEn" },
  { from: "summary", to: "summaryEn" },
]);

export const translatePersonnelAction = createTranslateAction([
  { from: "position", to: "positionEn" },
  { from: "unit", to: "unitEn" },
]);
