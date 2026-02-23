import type { NavItem, StatItem, EventItem, BoardMember, SocialLink } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { title: "من نحن", titleEn: "About", href: "/about" },
  { title: "الخدمات", titleEn: "Service", href: "/services" },
  { title: "المنشورات", titleEn: "Publications", href: "/publications" },
  { title: "المكتبة", titleEn: "Library", href: "/library" },
  { title: "المنصة", titleEn: "Platform", href: "/platform" },
];

export const STATS: StatItem[] = [
  { value: "12K+", labelAr: "متابع", labelEn: "Followers" },
  { value: "8+", labelAr: "سنوات", labelEn: "Years" },
  { value: "500+", labelAr: "عضو", labelEn: "Members" },
  { value: "100+", labelAr: "فعالية", labelEn: "Events" },
];

export const EVENTS: EventItem[] = [
  {
    id: "1",
    title: "سلسلة ورش التطوير المهني الرمضانية",
    titleEn: "Ramadan Professional Development Workshop Series",
    date: "2026-03-01",
    type: "workshop",
    typeLabel: "ورشة عمل",
    typeLabelEn: "Workshop",
    location: "online",
    color: "#002F5D",
  },
  {
    id: "2",
    title: "ندوة الجودة في إدارة المشاريع",
    titleEn: "Quality in PM Webinar",
    date: "2026-02-15",
    type: "webinar",
    typeLabel: "ندوة",
    typeLabelEn: "Webinar",
    location: "online",
    color: "#F9B844",
  },
  {
    id: "3",
    title: "التحول الرقمي في إدارة المشاريع",
    titleEn: "Digital Transformation in PM",
    date: "2026-01-20",
    type: "webinar",
    typeLabel: "ندوة",
    typeLabelEn: "Webinar",
    location: "online",
    color: "#002F5D",
  },
  {
    id: "4",
    title: "دورة التحضير لشهادة PMP",
    titleEn: "PMP Prep Course",
    date: "2026-04-10",
    type: "course",
    typeLabel: "دورة",
    typeLabelEn: "Course",
    location: "online",
    color: "#F9B844",
  },
  {
    id: "5",
    title: "Power BI لمهندسي التخطيط",
    titleEn: "Power BI for Planning Engineers",
    date: "2026-05-05",
    type: "course",
    typeLabel: "دورة",
    typeLabelEn: "Course",
    location: "online",
    color: "#002F5D",
  },
  {
    id: "6",
    title: "ورشة ضمان الإيرادات",
    titleEn: "Revenue Assurance Workshop",
    date: "2026-05-20",
    type: "workshop",
    typeLabel: "ورشة عمل",
    typeLabelEn: "Workshop",
    location: "online",
    color: "#F9B844",
  },
];

export const BOARD_MEMBERS: BoardMember[] = [
  { name: "د. أحمد العقيد", role: "الرئيس", roleEn: "President" },
  { name: "م. شيرين عبدالسلام", role: "الأمين العام", roleEn: "Secretary General" },
  { name: "م. عماد الدين سلطان", role: "الأمين المالي", roleEn: "Treasurer" },
  { name: "د. لينا العيناب", role: "البحث العلمي", roleEn: "Scientific Research" },
  { name: "م. براءة سمير عبدالهادي", role: "الإعلام", roleEn: "Media" },
  { name: "أ. ريان محمد الحسن", role: "العلاقات الخارجية", roleEn: "External Relations" },
  { name: "م. ندى محمد علي", role: "العضوية والمتطوعين", roleEn: "Membership & Volunteers" },
  { name: "م. أحمد المجتبى", role: "التخطيط والبرامج", roleEn: "Planning & Programs" },
  { name: "م. أنور قاسم الله", role: "التطوير المهني", roleEn: "Professional Development" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { icon: "facebook", href: "https://www.facebook.com/Sudanpma", label: "Facebook" },
  { icon: "linkedin", href: "https://www.linkedin.com/company/sdpam", label: "LinkedIn" },
  { icon: "whatsapp", href: "https://wa.me/249156721400", label: "WhatsApp" },
];

export const PHOTO_GRID_IMAGES = [
  "/facebook/597868630_917467723939531_2717005173723912320_n.jpg",
  "/facebook/595985859_917467487272888_8655546574144256559_n.jpg",
  "/facebook/595610620_917467593939544_7223608777745147225_n.jpg",
  "/facebook/595612937_917468020606168_5847008792327666466_n.jpg",
  "/facebook/597861259_917467833939520_3958114804444557104_n.jpg",
  "/facebook/587008859_908462771506693_7049839850536038171_n.jpg",
  "/facebook/587116341_908463074839996_5655201780478468099_n.jpg",
  "/facebook/531653763_822041486815489_7803594063824710654_n.jpg",
  "/facebook/509316861_779490374403934_8604842893523885897_n.jpg",
];
