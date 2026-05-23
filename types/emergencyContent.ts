export interface EmergencyContent {
  _id: string;
  title?: string;
  emergencyNumbers?: Array<{ _key: string; number: string; label: string; href: string }>;
  externalLinks?: Array<{ _key: string; label: string; href: string }>;
}
