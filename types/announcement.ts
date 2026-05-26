export interface Announcement {
  _id: string;
  text: string;
  textEn?: string;
  url?: string;
  isActive: boolean;
  expiryDate?: string;
  priority?: number;
}
