import type { StepConfig, Committee, Certification, MembershipTier } from "./types";

export const ONBOARDING_STEPS: StepConfig[] = [
  {
    id: "welcome",
    titleAr: "مرحباً بك",
    titleEn: "Welcome",
    descriptionAr: "تعرف على الجمعية السودانية لإدارة المشاريع",
    descriptionEn: "Learn about SPMA",
    order: 0,
  },
  {
    id: "personal-info",
    titleAr: "المعلومات الشخصية",
    titleEn: "Personal Information",
    descriptionAr: "أدخل بياناتك الأساسية",
    descriptionEn: "Enter your basic information",
    order: 1,
  },
  {
    id: "professional-info",
    titleAr: "المعلومات المهنية",
    titleEn: "Professional Information",
    descriptionAr: "أخبرنا عن خبرتك المهنية",
    descriptionEn: "Tell us about your professional experience",
    order: 2,
  },
  {
    id: "tier-selection",
    titleAr: "نوع العضوية",
    titleEn: "Membership Tier",
    descriptionAr: "اختر نوع العضوية المناسب لك",
    descriptionEn: "Choose the right membership for you",
    order: 3,
  },
  {
    id: "committee-interest",
    titleAr: "اللجان",
    titleEn: "Committees",
    descriptionAr: "اختر اللجان التي تهمك",
    descriptionEn: "Select committees of interest",
    order: 4,
  },
  {
    id: "review",
    titleAr: "المراجعة",
    titleEn: "Review",
    descriptionAr: "راجع طلبك قبل الإرسال",
    descriptionEn: "Review your application before submitting",
    order: 5,
  },
];

export const COMMITTEES: { id: Committee; labelAr: string; labelEn: string; descAr: string; descEn: string; icon: string }[] = [
  { id: "scientific-research", labelAr: "البحث العلمي", labelEn: "Scientific Research", descAr: "إجراء البحوث والدراسات في مجال إدارة المشاريع", descEn: "Conducting research and studies in project management", icon: "FlaskConical" },
  { id: "media", labelAr: "الإعلام", labelEn: "Media", descAr: "إدارة المحتوى الإعلامي والتواصل", descEn: "Managing media content and communication", icon: "Megaphone" },
  { id: "external-relations", labelAr: "العلاقات الخارجية", labelEn: "External Relations", descAr: "بناء شراكات مع المنظمات المحلية والدولية", descEn: "Building partnerships with organizations", icon: "Globe" },
  { id: "membership", labelAr: "العضوية والمتطوعين", labelEn: "Membership & Volunteers", descAr: "إدارة شؤون الأعضاء وتنسيق العمل التطوعي", descEn: "Managing member affairs and volunteer coordination", icon: "Users" },
  { id: "planning", labelAr: "التخطيط والبرامج", labelEn: "Planning & Programs", descAr: "تخطيط وتنفيذ البرامج والفعاليات", descEn: "Planning and executing programs and events", icon: "CalendarDays" },
  { id: "professional-development", labelAr: "التطوير المهني", labelEn: "Professional Development", descAr: "تصميم برامج التدريب والتأهيل المهني", descEn: "Designing training and qualification programs", icon: "GraduationCap" },
];

export const CERTIFICATIONS: { id: Certification; label: string }[] = [
  { id: "PMP", label: "PMP" },
  { id: "PMI-RMP", label: "PMI-RMP" },
  { id: "PMI-ACP", label: "PMI-ACP" },
  { id: "PMI-SP", label: "PMI-SP" },
  { id: "CAPM", label: "CAPM" },
  { id: "PgMP", label: "PgMP" },
  { id: "PRINCE2", label: "PRINCE2" },
  { id: "CSM", label: "CSM" },
  { id: "PSM", label: "PSM" },
  { id: "other", label: "Other" },
];

export const SECTORS: { id: string; labelAr: string; labelEn: string }[] = [
  { id: "government", labelAr: "حكومي", labelEn: "Government" },
  { id: "private", labelAr: "قطاع خاص", labelEn: "Private Sector" },
  { id: "ngo", labelAr: "منظمات غير ربحية", labelEn: "NGO / Nonprofit" },
  { id: "academic", labelAr: "أكاديمي", labelEn: "Academic" },
  { id: "freelance", labelAr: "عمل حر", labelEn: "Freelance" },
];

export const TIER_DETAILS: {
  id: MembershipTier;
  nameAr: string;
  nameEn: string;
  subtitleAr: string;
  subtitleEn: string;
  priceAr: string;
  priceEn: string;
  benefitsAr: string[];
  benefitsEn: string[];
  recommended?: boolean;
}[] = [
  {
    id: "student",
    nameAr: "عضو منتسب",
    nameEn: "Student Member",
    subtitleAr: "للطلبة",
    subtitleEn: "For Students",
    priceAr: "مجاناً",
    priceEn: "Free",
    benefitsAr: ["حضور الفعاليات المجانية", "الوصول للمحتوى التعليمي", "الانضمام لمجموعات النقاش"],
    benefitsEn: ["Attend free events", "Access educational content", "Join discussion groups"],
  },
  {
    id: "associate",
    nameAr: "عضو مشارك",
    nameEn: "Associate Member",
    subtitleAr: "للخريجين الجدد",
    subtitleEn: "For New Graduates",
    priceAr: "15,000 جنيه/السنة",
    priceEn: "15,000 SDG/Year",
    benefitsAr: ["جميع مزايا العضو المنتسب", "خصم 20% على الدورات", "حضور PM Café", "شهادة عضوية"],
    benefitsEn: ["All Student benefits", "20% discount on courses", "Attend PM Café", "Membership certificate"],
  },
  {
    id: "professional",
    nameAr: "عضو محترف",
    nameEn: "Professional Member",
    subtitleAr: "7+ سنوات خبرة",
    subtitleEn: "7+ years experience",
    priceAr: "20,000 جنيه/السنة",
    priceEn: "20,000 SDG/Year",
    recommended: true,
    benefitsAr: ["جميع مزايا العضو المشارك", "خصم 30% على الدورات والشهادات", "فرص التدريب والتطوع", "عضوية في اللجان المتخصصة"],
    benefitsEn: ["All Associate benefits", "30% discount on courses & certs", "Training & volunteering opportunities", "Membership in specialized committees"],
  },
  {
    id: "consultant",
    nameAr: "عضو مستشار",
    nameEn: "Consultant Member",
    subtitleAr: "10+ سنوات مع شهادات معتمدة",
    subtitleEn: "10+ years with recognized certs",
    priceAr: "75,000 جنيه/السنة",
    priceEn: "75,000 SDG/Year",
    benefitsAr: ["جميع مزايا العضو المحترف", "فرص التدريب كمحاضر", "الظهور في دليل المستشارين", "عضوية المجلس الاستشاري"],
    benefitsEn: ["All Professional benefits", "Opportunities to train as lecturer", "Listed in consultant directory", "Advisory council membership"],
  },
];
