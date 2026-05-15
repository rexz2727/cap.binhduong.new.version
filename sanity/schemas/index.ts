import type { SchemaTypeDefinition } from "sanity";
import { newsSchema } from "./news";
import { legalDocumentSchema } from "./legalDocument";
import { personnelSchema } from "./personnel";
import { procedureSchema } from "./procedure";

export const schemaTypes: SchemaTypeDefinition[] = [
  newsSchema,
  legalDocumentSchema,
  personnelSchema,
  procedureSchema,
];
