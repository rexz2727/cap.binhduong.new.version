import type { I18nKey } from "@/lib/i18n";

export interface ServiceCard {
  labelKey: I18nKey;
  descKey: I18nKey;
  href: string;
  icon: string;
}

export const SERVICE_CARDS: ServiceCard[] = [
  { labelKey: "svc.cccd", descKey: "svc.cccd.desc", href: "/thu-tuc-hanh-chinh", icon: "#i-doc" },
  { labelKey: "svc.residence", descKey: "svc.residence.desc", href: "/thu-tuc-hanh-chinh", icon: "#i-doc" },
  { labelKey: "svc.vehicle", descKey: "svc.vehicle.desc", href: "/thu-tuc-hanh-chinh", icon: "#i-shield" },
  { labelKey: "svc.passport", descKey: "svc.passport.desc", href: "/thu-tuc-hanh-chinh", icon: "#i-globe" },
  { labelKey: "svc.appointment", descKey: "svc.appointment.desc", href: "/lich-tiep-cong-dan", icon: "#i-cal" },
  { labelKey: "svc.hoidap", descKey: "svc.hoidap.desc", href: "/hoi-dap", icon: "#i-help" },
];
