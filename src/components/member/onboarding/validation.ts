import { z } from "zod";

export const personalInfoSchema = z.object({
  fullNameAr: z.string().min(3).max(100),
  fullNameEn: z.string().min(3).max(100),
  email: z.string().email(),
  phone: z.string().min(9).max(20),
  city: z.string().min(2).max(50),
  gender: z.enum(["male", "female"]),
});

export const professionalInfoSchema = z.object({
  jobTitle: z.string().min(2).max(100),
  organization: z.string().min(2).max(100),
  yearsOfExperience: z.number().min(0).max(50),
  sector: z.enum(["government", "private", "ngo", "academic", "freelance"]),
  certifications: z.array(z.string()),
  otherCertification: z.string().optional(),
});

export const tierSelectionSchema = z.object({
  selectedTier: z.enum(["student", "associate", "professional", "consultant"]),
});

export const committeeInterestSchema = z.object({
  selectedCommittees: z.array(z.string()),
});
