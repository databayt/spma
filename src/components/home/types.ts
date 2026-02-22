import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  titleEn: string;
  href: string;
}

export interface StatItem {
  value: string;
  labelAr: string;
  labelEn: string;
}

export interface EventItem {
  id: string;
  title: string;
  titleEn: string;
  date: string;
  type: "workshop" | "webinar" | "course" | "meetup" | "podcast";
  typeLabel: string;
  location: "online" | "in-person";
  speaker?: string;
  description?: string;
  descriptionEn?: string;
  color: string;
}

export interface ServiceItem {
  title: string;
  titleEn: string;
  icon: string;
}

export interface BoardMember {
  name: string;
  role: string;
  roleEn: string;
  image?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

export interface CommitteeMember {
  icon: LucideIcon;
  label: string;
  labelEn: string;
  id: string;
}
