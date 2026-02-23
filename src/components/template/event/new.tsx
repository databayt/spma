"use client";

import Image from "next/image";
import { useTranslations } from "@/lib/use-translations";

export default function EventCard() {
  const { t, locale } = useTranslations();
  const isAr = locale === "ar";

  interface Event {
    date: string;
    month: string;
    monthEn: string;
    title: string;
    titleEn: string;
    time: string;
    location: string;
    locationEn: string;
    isHighlighted: boolean;
    isDisabled?: boolean;
  }

  const events: Event[] = [
    {
      date: "15",
      month: "مارس",
      monthEn: "March",
      title: "المؤتمر السنوي لإدارة المشاريع",
      titleEn: "Annual Project Management Conference",
      time: "9AM — 5PM",
      location: "@ فندق كورنثيا، الخرطوم",
      locationEn: "@ Corinthia Hotel, Khartoum",
      isHighlighted: true,
    },
    {
      date: "02",
      month: "أبريل",
      monthEn: "April",
      title: "ورشة شهادة PMP التحضيرية",
      titleEn: "PMP Certification Prep Workshop",
      time: "10AM — 3PM",
      location: "@ جامعة الخرطوم، الخرطوم",
      locationEn: "@ University of Khartoum",
      isHighlighted: false,
    },
    {
      date: "18",
      month: "مايو",
      monthEn: "May",
      title: "ملتقى مدراء المشاريع الشباب",
      titleEn: "Young Project Managers Forum",
      time: "4PM — 8PM",
      location: "@ قاعة الصداقة، الخرطوم",
      locationEn: "@ Friendship Hall, Khartoum",
      isHighlighted: false,
    },
    {
      date: "07",
      month: "يونيو",
      monthEn: "June",
      title: "ندوة المشاريع الهندسية الكبرى",
      titleEn: "Major Engineering Projects Seminar",
      time: "2PM — 6PM",
      location: "@ نادي المهندسين، بورتسودان",
      locationEn: "@ Engineers Club, Port Sudan",
      isHighlighted: false,
      isDisabled: true,
    },
  ];

  return (
    <div className="min-h-screen px-10 md:px-20 lg:px-32">
      <div>
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {events.map((event, index) => (
            <div
              key={index}
              className={`${
                event.isHighlighted
                  ? "bg-accent text-accent-foreground"
                  : "bg-neutral-200 dark:bg-neutral-800"
              } p-8 flex flex-col h-full`}
            >
              <div
                className={`text-7xl font-light mb-1 ${
                  !event.isHighlighted
                    ? event.isDisabled
                      ? "text-neutral-300 dark:text-neutral-500"
                      : "text-neutral-700 dark:text-neutral-200"
                    : ""
                }`}
              >
                {event.date}
              </div>
              <div
                className={`text-sm tracking-wider mb-10 ${
                  !event.isHighlighted
                    ? event.isDisabled
                      ? "text-neutral-300 dark:text-neutral-500"
                      : "text-neutral-700 dark:text-neutral-200"
                    : ""
                }`}
              >
                {isAr ? event.month : event.monthEn}
              </div>

              <h2
                className={`text-2xl font-light mb-4 ${
                  !event.isHighlighted
                    ? event.isDisabled
                      ? "text-neutral-300 dark:text-neutral-500"
                      : "text-neutral-700 dark:text-neutral-200"
                    : ""
                }`}
              >
                {(() => {
                  const title = isAr ? event.title : event.titleEn;
                  const words = title.split(" ");
                  return (
                    <>
                      {words.slice(0, 2).join(" ")}
                      <br />
                      {words.slice(2).join(" ")}
                    </>
                  );
                })()}
              </h2>

              <div
                className={`mt-auto ${
                  !event.isHighlighted
                    ? event.isDisabled
                      ? "text-neutral-300 dark:text-neutral-500"
                      : "text-neutral-700 dark:text-neutral-200"
                    : ""
                }`}
              >
                <div className="mb-1 text-sm font-medium">{event.time}</div>
                <div className="text-sm font-medium">
                  {isAr ? event.location : event.locationEn}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feed Section */}
        <div className="mt-12 border-t pt-4 border-neutral-200 dark:border-neutral-700">
          <div className="flex items-start gap-4 mb-8 w-full md:w-[70%]">
            <Image
              src="/logo.webp"
              alt="logo"
              width={40}
              height={40}
              className="rounded-full object-cover w-10 h-10 bg-foreground p-1.5"
              priority
              quality={100}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  @spma
                </span>
                <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                  {t.eventTemplate?.feedTimeAgo ?? "منذ 4 دقائق في"}
                </span>
                <span className="text-blue-600 dark:text-neutral-300">
                  {t.eventTemplate?.feedHashtag ?? "#أحداث"}
                </span>
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                {t.eventTemplate?.feedBody ??
                  "تدعوكم الجمعية السودانية لإدارة المشاريع لحضور المؤتمر السنوي - نستعرض فيه أحدث ممارسات إدارة المشاريع ونناقش تطوير الكفاءات المهنية في السودان"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
