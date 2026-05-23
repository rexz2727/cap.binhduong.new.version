export interface SiteSettings {
  _id: string;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  hotline?: string;
  workingHours?: string;
  workingHoursSat?: string;
  description?: string;
  facebook?: string;
  youtube?: string;
  zalo?: string;
  relatedAgencies?: Array<{ _key: string; label: string; href: string }>;
  emergencyNumbers?: Array<{ _key: string; label: string; number: string }>;
}
