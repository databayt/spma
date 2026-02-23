import { VideoItem } from "./type";

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const videos: VideoItem[] = [
  {
    title: "هاشم بن عوف يحكي سيرته ويفتح الصندوق الأسود لحكومة الثورة والموانئ",
    description:
      "السودان بودكاست - هاشم بن عوف يحكي سيرته ويفتح الصندوق الأسود لحكومة الثورة والموانئ",
    link: "wGhAjQqf3ZA",
    image: ytThumb("wGhAjQqf3ZA"),
    date: "",
    author: "السودان بودكاست",
  },
  {
    title: "إدارة المشاريع في 15 دقيقة من خلال مثال عملي",
    description:
      "Project Management in 15 minutes | إدارة المشاريع في 15 دقيقة من خلال مثال عملي",
    link: "JXEXdbS5tsI",
    image: ytThumb("JXEXdbS5tsI"),
    date: "",
    author: "PMCORNERKSA",
  },
  {
    title: "Milestone PMI-PMP Changes Jan2016 HD Eng.Abubaker Sami Ali",
    description:
      "Milestone PMI-PMP Changes Jan2016 HD Eng.Abubaker Sami Ali - Milestone Training Center",
    link: "5-7sGiHtHgc",
    image: ytThumb("5-7sGiHtHgc"),
    date: "",
    author: "Milestone Training Center",
  },
  {
    title: "مشروع الدولة - الجزء الأول",
    description:
      "القبيلة والجهة مخزن قسم كريمة ومساحة تربية فاضلة, يحثان على التراحم والتعارف بين الناس",
    link: "c4LI934B_-M",
    image: ytThumb("c4LI934B_-M"),
    date: "14 ابريل 2024",
    author: "هشام احمد",
  },
  {
    title: "مشروع الدولة - الجزء الثاني",
    description:
      "القبيلة والجهة مخزن قسم كريمة ومساحة تربية فاضلة, يحثان على التراحم والتعارف بين الناس",
    link: "c4LI934B_-M",
    image: ytThumb("c4LI934B_-M"),
    date: "14 ابريل 2024",
    author: "هشام احمد",
  },
  {
    title: "أهمية الدين في المجال العام",
    description:
      "القبيلة والجهة مخزن قسم كريمة ومساحة تربية فاضلة, يحثان على التراحم والتعارف بين الناس",
    link: "UXUEB33o4GA",
    image: ytThumb("UXUEB33o4GA"),
    date: "14 ابريل 2024",
    author: "ابو بكر جيكوني",
  },
  {
    title: "رؤية تحليلية للتاريخ السياسي السوداني الحديث",
    description:
      "في السودان، يوجد قيمة التضامن ولكن بدلاً من التضامن في الاستهلاك فقط، دعونا نتضامن في الإنتاج أيضًا",
    link: "2WbrmZBR4mQ",
    image: ytThumb("2WbrmZBR4mQ"),
    date: "14 ابريل 2024",
    author: "قاسم الظافر",
  },
  {
    title: "رؤية الحركة لمسألة النهضة",
    description:
      "التدابير السياسية وحدها لا تكفي ليخرج السودان من هذه الحفرة، ولكن السودان يحتاج ايضا إلى إصلاح ثقافي",
    link: "aHU19xgbFM8",
    image: ytThumb("aHU19xgbFM8"),
    date: "18 ابريل 2024",
    author: "المقداد الهجان",
  },
  {
    title: "لماذا يحتاج السودان لحركة اجتماعية؟",
    description:
      "القبيلة والجهة مخزن قسم كريمة ومساحة تربية فاضلة, يحثان على التراحم والتعارف بين الناس",
    link: "2UlO36AoWTY",
    image: ytThumb("2UlO36AoWTY"),
    date: "14 ابريل 2024",
    author: "هشام احمد",
  },
  {
    title: "كيف يستعيد المجتمع سلطته",
    description:
      "في السودان، يوجد قيمة التضامن ولكن بدلاً من التضامن في الاستهلاك فقط، دعونا نتضامن في الإنتاج أيضًا",
    link: "YZELv8AbKB8",
    image: ytThumb("YZELv8AbKB8"),
    date: "قبل سنتين",
    author: "قاسم الظافر",
  },
  {
    title: "التيارات العلمانية وتفكيك الاسرة",
    description:
      "التدابير السياسية وحدها لا تكفي ليخرج السودان من هذه الحفرة، ولكن السودان يحتاج ايضا إلى إصلاح ثقافي",
    link: "Chzi4qwDThM",
    image: ytThumb("Chzi4qwDThM"),
    date: "18 ابريل 2024",
    author: "ابو بكر جيكوني",
  },
  {
    title: "المؤاني البحرية مشكلات وحلول",
    description:
      "التدابير السياسية وحدها لا تكفي ليخرج السودان من هذه الحفرة، ولكن السودان يحتاج ايضا إلى إصلاح ثقافي",
    link: "Bl6jGOQkIm4",
    image: ytThumb("Bl6jGOQkIm4"),
    date: "18 ابريل 2024",
    author: "قاسم الظافر",
  },
];

export const featuredVideos = (count: number = 3) => {
  return videos.slice(0, count);
};
