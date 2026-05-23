export interface UnitProfile {
  _id: string;
  unitDescription1?: string;
  unitDescription2?: string;
  duties?: Array<{ _key: string; title: string; body: string }>;
  departments?: Array<{ _key: string; label: string; sub: string }>;
  orgStats?: Array<{ _key: string; label: string; value: string }>;
}
