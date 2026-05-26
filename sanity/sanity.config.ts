import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";
import { theme } from "./theme";
import { StudioLogo } from "./components/StudioLogo";
import {
  createTranslateAction,
  translateNewsAction,
  translateLegalAction,
  translateProcedureAction,
  translatePersonnelAction,
} from "./actions/translateAction";

export default defineConfig({
  name: "cong-an-binh-duong",
  title: "Công an phường Bình Dương",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
  basePath: "/studio",
  theme,
  studio: {
    components: {
      logo: StudioLogo,
    },
  },
  document: {
    actions: (prev, { schemaType }) => {
      const actionMap: Record<string, ReturnType<typeof createTranslateAction>> = {
        newsPost: translateNewsAction,
        legalDocument: translateLegalAction,
        procedure: translateProcedureAction,
        personnel: translatePersonnelAction,
      };
      const translateAction = actionMap[schemaType];
      return translateAction ? [...prev, translateAction] : prev;
    },
  },
});
