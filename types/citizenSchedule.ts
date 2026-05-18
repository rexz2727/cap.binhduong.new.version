import type { SanityImage } from "./sanity";

export interface ScheduleOfficer {
  fullName: string;
  rank?: string;
  position?: string;
  photo?: SanityImage;
}

export interface CitizenSchedule {
  _id: string;
  date: string;
  timeSlot: string;
  location?: string;
  note?: string;
  isRegular: boolean;
  officer: ScheduleOfficer;
}
