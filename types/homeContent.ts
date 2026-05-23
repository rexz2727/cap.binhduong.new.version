export interface HomeContent {
  _id: string;
  heroEyebrow?: string;
  heroH1Part1?: string;
  heroH1Part2?: string;
  heroLead?: string;
  heroQuickTags?: Array<{ _key: string; label: string; href: string }>;
  valuesItems?: Array<{ _key: string; icon: string; title: string; desc: string }>;
}
