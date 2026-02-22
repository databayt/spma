export type MembershipTier = "student" | "associate" | "professional" | "consultant";

export type Committee =
  | "scientific-research"
  | "media"
  | "external-relations"
  | "membership"
  | "planning"
  | "professional-development";

export type Certification =
  | "PMP"
  | "PMI-RMP"
  | "PMI-ACP"
  | "PMI-SP"
  | "CAPM"
  | "PgMP"
  | "PRINCE2"
  | "CSM"
  | "PSM"
  | "other";

export interface PersonalInfoData {
  fullNameAr: string;
  fullNameEn: string;
  email: string;
  phone: string;
  city: string;
  gender: "male" | "female";
}

export interface ProfessionalInfoData {
  jobTitle: string;
  organization: string;
  yearsOfExperience: number;
  sector: "government" | "private" | "ngo" | "academic" | "freelance";
  certifications: Certification[];
  otherCertification?: string;
}

export interface OnboardingFormData {
  personalInfo: PersonalInfoData;
  professionalInfo: ProfessionalInfoData;
  selectedTier: MembershipTier;
  selectedCommittees: Committee[];
}

export type OnboardingStep =
  | "welcome"
  | "personal-info"
  | "professional-info"
  | "tier-selection"
  | "committee-interest"
  | "review"
  | "success";

export interface StepConfig {
  id: OnboardingStep;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  order: number;
}
