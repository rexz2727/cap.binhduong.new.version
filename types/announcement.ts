export interface Announcement {
  _id: string;
  text: string;
  url?: string;
  isActive: boolean;
  expiryDate?: string;
  priority?: number;
}
