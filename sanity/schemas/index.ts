import type { SchemaTypeDefinition } from "sanity";
import { newsSchema } from "./news";
import { legalDocumentSchema } from "./legalDocument";
import { personnelSchema } from "./personnel";
import { procedureSchema } from "./procedure";
import { photoAlbumSchema } from "./photoAlbum";
import { videoSchema } from "./video";
import { qnaSchema } from "./qna";
import { announcementSchema } from "./announcement";
import { draftDocumentSchema } from "./draftDocument";
import { wantedPersonSchema } from "./wantedPerson";
import { citizenScheduleSchema } from "./citizenSchedule";
import { goodDeedSchema } from "./goodDeed";
import { siteSettingsSchema } from "./siteSettings";
import { homeContentSchema } from "./homeContent";
import { unitProfileSchema } from "./unitProfile";
import { feedbackProcessSchema } from "./feedbackProcess";
import { emergencyContentSchema } from "./emergencyContent";
import { pageContentSchema } from "./pageContent";

export const schemaTypes: SchemaTypeDefinition[] = [
  newsSchema,
  legalDocumentSchema,
  personnelSchema,
  procedureSchema,
  photoAlbumSchema,
  videoSchema,
  qnaSchema,
  announcementSchema,
  draftDocumentSchema,
  wantedPersonSchema,
  citizenScheduleSchema,
  goodDeedSchema,
  siteSettingsSchema,
  homeContentSchema,
  unitProfileSchema,
  feedbackProcessSchema,
  emergencyContentSchema,
  pageContentSchema,
];
