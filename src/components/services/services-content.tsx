import { BookOpen, Award, Users, Briefcase, GraduationCap, Target } from "lucide-react";

const SERVICES = [
  {
    icon: GraduationCap,
    titleAr: "التدريب المهني",
    titleEn: "Professional Training",
    descAr: "دورات تدريبية متخصصة في إدارة المشاريع وفق أحدث المعايير العالمية",
    descEn: "Specialized training courses in project management following the latest global standards",
  },
  {
    icon: Award,
    titleAr: "التحضير للشهادات",
    titleEn: "Certification Prep",
    descAr: "برامج تحضيرية لشهادات PMP و CAPM و PMI-ACP وغيرها",
    descEn: "Preparatory programs for PMP, CAPM, PMI-ACP and other certifications",
  },
  {
    icon: Briefcase,
    titleAr: "الاستشارات",
    titleEn: "Consulting",
    descAr: "خدمات استشارية في إدارة المشاريع للمؤسسات والشركات",
    descEn: "Project management consulting services for organizations and companies",
  },
  {
    icon: Users,
    titleAr: "ورش العمل",
    titleEn: "Workshops",
    descAr: "ورش عمل تفاعلية لتطوير المهارات العملية في إدارة المشاريع",
    descEn: "Interactive workshops to develop practical project management skills",
  },
  {
    icon: BookOpen,
    titleAr: "البحث العلمي",
    titleEn: "Research",
    descAr: "دعم البحث العلمي ونشر الدراسات المتخصصة في إدارة المشاريع",
    descEn: "Supporting scientific research and publishing specialized PM studies",
  },
  {
    icon: Target,
    titleAr: "التطوير المؤسسي",
    titleEn: "Organizational Development",
    descAr: "تطوير أنظمة إدارة المشاريع داخل المؤسسات وبناء مكاتب PMO",
    descEn: "Developing PM systems within organizations and building PMOs",
  },
];

interface ServicesContentProps {
  lang: string;
}

export function ServicesContent({ lang }: ServicesContentProps) {
  const isAr = lang === "ar";

  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {isAr ? "خدماتنا" : "Our Services"}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {isAr
            ? "نقدم مجموعة متكاملة من الخدمات لدعم ممارسي إدارة المشاريع في السودان"
            : "We offer a comprehensive suite of services to support project management practitioners in Sudan"}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, i) => {
          const Icon = service.icon;
          return (
            <div
              key={i}
              className="group rounded-xl border bg-card p-8 space-y-4 transition-colors hover:border-primary/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">
                {isAr ? service.titleAr : service.titleEn}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {isAr ? service.descAr : service.descEn}
              </p>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center rounded-xl bg-primary/5 border border-primary/10 p-12 space-y-4">
        <h2 className="text-2xl font-bold">
          {isAr ? "هل تحتاج خدمة مخصصة؟" : "Need a custom service?"}
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {isAr
            ? "تواصل معنا لمناقشة احتياجاتك وسنعمل على تقديم حل مخصص يناسب مؤسستك"
            : "Contact us to discuss your needs and we'll work on providing a customized solution for your organization"}
        </p>
        <a
          href="mailto:info@spma.sd"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {isAr ? "تواصل معنا" : "Contact Us"}
        </a>
      </div>
    </div>
  );
}
