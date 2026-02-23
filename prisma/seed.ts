import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Open Library cover URL format: https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg
const cover = (isbn: string) =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

const books = [
  {
    title: "A Guide to the Project Management Body of Knowledge (PMBOK Guide)",
    author: "Project Management Institute",
    genre: "Project Management",
    rating: 4.2,
    coverUrl: cover("9781628256642"),
    coverColor: "#6B7280",
    description:
      "The PMBOK Guide is the global standard for project management. It provides the fundamental practices needed to achieve organizational results and excellence in project management.",
    totalCopies: 5,
    availableCopies: 5,
    summary:
      "The PMBOK Guide 7th Edition reflects the full range of development approaches including predictive, adaptive, and hybrid. It introduces 12 project management principles and 8 performance domains, moving away from the process-based framework of earlier editions. This edition emphasizes value delivery and outcome-based thinking, making it relevant for agile, waterfall, and hybrid project environments.",
  },
  {
    title: "The Mythical Man-Month",
    author: "Frederick P. Brooks Jr.",
    genre: "Project Management",
    rating: 4.5,
    coverUrl: cover("0201835959"),
    coverColor: "#8B4513",
    description:
      "A classic work on software engineering and project management. Brooks' central argument is that adding manpower to a late software project makes it later.",
    totalCopies: 3,
    availableCopies: 3,
    summary:
      "Drawing on his experience as the project manager for IBM's System/360 and OS/360, Brooks explores why large programming projects suffer management problems different from small ones. The book introduces Brooks' Law and discusses concepts like the surgical team, the second-system effect, and the importance of conceptual integrity in system design.",
  },
  {
    title: "Scrum: The Art of Doing Twice the Work in Half the Time",
    author: "Jeff Sutherland",
    genre: "Project Management",
    rating: 4.3,
    coverUrl: cover("038534645X"),
    coverColor: "#E63946",
    description:
      "Jeff Sutherland, co-creator of Scrum, explains how this framework can transform productivity in any organization by embracing iterative, incremental delivery.",
    totalCopies: 4,
    availableCopies: 4,
    summary:
      "Sutherland takes the reader through the origins and evolution of Scrum, demonstrating how it has been applied to everything from software development to education to construction. The book covers sprints, backlogs, daily standups, and retrospectives, showing how small teams can achieve extraordinary results through transparency, inspection, and adaptation.",
  },
  {
    title: "Critical Chain",
    author: "Eliyahu M. Goldratt",
    genre: "Project Management",
    rating: 4.1,
    coverUrl: cover("0884271536"),
    coverColor: "#2D6A4F",
    description:
      "A business novel that applies the Theory of Constraints to project management, introducing the Critical Chain method for managing projects more effectively.",
    totalCopies: 3,
    availableCopies: 3,
    summary:
      "Through the story of a university professor struggling to earn tenure, Goldratt introduces the Critical Chain Project Management method. The book addresses common project management problems like student syndrome, Parkinson's Law, and multitasking, offering practical solutions through buffer management and resource-constrained scheduling.",
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    genre: "Business",
    rating: 4.4,
    coverUrl: cover("0307887898"),
    coverColor: "#FFFFFF",
    description:
      "Eric Ries presents a scientific approach to creating and managing startups using validated learning, build-measure-learn loops, and minimum viable products.",
    totalCopies: 4,
    availableCopies: 4,
    summary:
      "The Lean Startup methodology helps entrepreneurs and managers test their vision continuously, adapt and adjust before it's too late. Ries introduces concepts like the Minimum Viable Product, pivot vs. persevere decisions, innovation accounting, and the build-measure-learn feedback loop that has revolutionized how companies develop products.",
  },
  {
    title: "Good to Great",
    author: "Jim Collins",
    genre: "Business",
    rating: 4.3,
    coverUrl: cover("0066620996"),
    coverColor: "#1A1A1A",
    description:
      "Based on a rigorous research study, Collins identifies what separates truly great companies from merely good ones over sustained periods.",
    totalCopies: 3,
    availableCopies: 3,
    summary:
      "Collins and his research team studied 1,435 companies over 40 years to identify eleven that made the leap from good to great. The book reveals key concepts including Level 5 Leadership, the Hedgehog Concept, the Flywheel Effect, and the importance of getting the right people on the bus before deciding where to drive it.",
  },
  {
    title: "Leaders Eat Last",
    author: "Simon Sinek",
    genre: "Leadership",
    rating: 4.3,
    coverUrl: cover("1591845327"),
    coverColor: "#B5838D",
    description:
      "Simon Sinek explores how great leaders create environments where people naturally work together to do remarkable things.",
    totalCopies: 3,
    availableCopies: 3,
    summary:
      "Drawing on stories from the military, business, and government, Sinek reveals how leaders who are willing to sacrifice their own comfort for the good of those in their care create organizations where people trust each other. The book explores the biology of trust and cooperation, explaining how cortisol, oxytocin, serotonin, and dopamine influence workplace dynamics.",
  },
  {
    title: "The Five Dysfunctions of a Team",
    author: "Patrick Lencioni",
    genre: "Leadership",
    rating: 4.2,
    coverUrl: cover("0787960756"),
    coverColor: "#FFB703",
    description:
      "A leadership fable that reveals the five dysfunctions that prevent teams from achieving their potential and provides a model for overcoming them.",
    totalCopies: 3,
    availableCopies: 3,
    summary:
      "Through the story of a new CEO struggling to unite her executive team, Lencioni outlines five interrelated dysfunctions: absence of trust, fear of conflict, lack of commitment, avoidance of accountability, and inattention to results. The book provides a practical framework for building cohesive, effective teams.",
  },
  {
    title: "Drive: The Surprising Truth About What Motivates Us",
    author: "Daniel H. Pink",
    genre: "Leadership",
    rating: 4.2,
    coverUrl: cover("1594484805"),
    coverColor: "#E76F51",
    description:
      "Daniel Pink examines the three elements of true motivation — autonomy, mastery, and purpose — and offers techniques for putting them into action.",
    totalCopies: 3,
    availableCopies: 3,
    summary:
      "Pink argues that the secret to high performance isn't rewards and punishments but the deeply human need to direct our own lives, learn and create new things, and do better by ourselves and our world. The book draws on four decades of scientific research to expose the mismatch between what science knows and what business does.",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    genre: "Psychology",
    rating: 4.5,
    coverUrl: cover("0374533555"),
    coverColor: "#264653",
    description:
      "Nobel laureate Daniel Kahneman reveals the two systems that drive the way we think and how they shape our judgments and decisions.",
    totalCopies: 3,
    availableCopies: 3,
    summary:
      "Kahneman explains the dichotomy between two modes of thought: System 1, which is fast, intuitive, and emotional; and System 2, which is slower, more deliberative, and more logical. The book covers cognitive biases, prospect theory, and the impact of overconfidence on corporate strategies, with profound implications for how we manage projects and make decisions.",
  },
  {
    title: "The Phoenix Project",
    author: "Gene Kim, Kevin Behr, George Spafford",
    genre: "Technology",
    rating: 4.4,
    coverUrl: cover("1942788290"),
    coverColor: "#D62828",
    description:
      "A novel about IT, DevOps, and helping your business win. It follows an IT manager tasked with saving a critical project that is over budget and behind schedule.",
    totalCopies: 4,
    availableCopies: 4,
    summary:
      "Bill Palmer is an IT manager who is unexpectedly promoted to VP of IT Operations. He must untangle a critical payroll project called Phoenix while keeping the company's IT infrastructure running. Through his journey, the book introduces the Three Ways of DevOps: flow, feedback, and continual learning, drawing parallels between IT operations and manufacturing.",
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    genre: "Self-Help",
    rating: 4.4,
    coverUrl: cover("0743269519"),
    coverColor: "#023047",
    description:
      "Covey presents a principle-centered approach for solving personal and professional problems, moving from dependence to independence to interdependence.",
    totalCopies: 4,
    availableCopies: 4,
    summary:
      "Covey's seven habits — be proactive, begin with the end in mind, put first things first, think win-win, seek first to understand then to be understood, synergize, and sharpen the saw — provide a holistic, integrated approach to personal and interpersonal effectiveness. The book has influenced millions of managers and project leaders worldwide.",
  },
  {
    title: "Agile Estimating and Planning",
    author: "Mike Cohn",
    genre: "Project Management",
    rating: 4.2,
    coverUrl: cover("0131479415"),
    coverColor: "#457B9D",
    description:
      "A practical guide to estimating and planning agile projects, covering story points, velocity, release planning, and iteration planning.",
    totalCopies: 3,
    availableCopies: 3,
    summary:
      "Cohn provides a definitive, practical guide to agile estimating and planning. He explains how to use story points and ideal days for estimation, how to derive velocity-driven release plans, and how to plan iterations. The book covers themes, epics, user stories, prioritization techniques, and how to communicate plans to stakeholders.",
  },
  {
    title: "Project Management for the Unofficial Project Manager",
    author: "Kory Kogon, Suzette Blakemore, James Wood",
    genre: "Project Management",
    rating: 4.0,
    coverUrl: cover("1941631118"),
    coverColor: "#606C38",
    description:
      "A practical guide for those who find themselves managing projects without formal training, providing essential tools and techniques for success.",
    totalCopies: 3,
    availableCopies: 3,
    summary:
      "This book provides a step-by-step approach for anyone managing projects informally. It covers the People side and the Process side of project management, introducing frameworks for initiating, planning, executing, and closing projects. With real-world examples and practical tools, it helps unofficial project managers deliver results consistently.",
  },
  {
    title: "The Hard Thing About Hard Things",
    author: "Ben Horowitz",
    genre: "Business",
    rating: 4.3,
    coverUrl: cover("0062273205"),
    coverColor: "#2B2D42",
    description:
      "Ben Horowitz offers essential advice on building and running a startup, providing practical wisdom for navigating the toughest problems business leaders face.",
    totalCopies: 3,
    availableCopies: 3,
    summary:
      "Drawing on his own story of founding, running, selling, buying, managing, and investing in technology companies, Horowitz offers essential advice on building and running a startup. He covers topics rarely discussed in business schools: firing friends, poaching competitors' employees, managing your own psychology, and knowing when to cash in.",
  },
  {
    title: "Engineering Management for the Rest of Us",
    author: "Sarah Drasner",
    genre: "Engineering",
    rating: 4.3,
    coverUrl: cover("9798986769301"),
    coverColor: "#6D6875",
    description:
      "A practical guide to engineering management that covers team building, communication, navigating difficult situations, and growing as a leader.",
    totalCopies: 3,
    availableCopies: 3,
    summary:
      "Sarah Drasner draws from her experience at Google and Netlify to provide a comprehensive guide for engineering managers. The book covers creating clarity for your team, having difficult conversations, hiring and onboarding, performance reviews, and building a healthy engineering culture. It addresses both the technical and human sides of engineering leadership.",
  },
  {
    title: "Measure What Matters",
    author: "John Doerr",
    genre: "Business",
    rating: 4.1,
    coverUrl: cover("0525536221"),
    coverColor: "#003049",
    description:
      "John Doerr reveals how OKRs (Objectives and Key Results) have helped tech giants like Google, Intel, and Amazon achieve explosive growth.",
    totalCopies: 3,
    availableCopies: 3,
    summary:
      "Doerr introduces the OKR system he learned from Andy Grove at Intel and later brought to Google. The book shows how OKRs help organizations align around ambitious goals, track progress, and stretch for what might seem beyond reach. With case studies from Bono's ONE campaign to the Gates Foundation, it demonstrates how this goal-setting system drives performance.",
  },
  {
    title: "Team Topologies",
    author: "Matthew Skelton, Manuel Pais",
    genre: "Technology",
    rating: 4.4,
    coverUrl: cover("1942788819"),
    coverColor: "#3D5A80",
    description:
      "A practical guide to organizing business and technology teams for fast flow, introducing four fundamental team topologies and three interaction modes.",
    totalCopies: 3,
    availableCopies: 3,
    summary:
      "Skelton and Pais present four fundamental team topologies — stream-aligned, enabling, complicated-subsystem, and platform — and three core interaction modes. The book applies Conway's Law to help organizations design team structures that enable fast software delivery, reducing cognitive load and improving developer experience.",
  },
];

const members = [
  {
    role: "ADMIN" as const,
    fullNameAr: "أحمد محمد عبدالله",
    fullNameEn: "Ahmed Mohammed Abdullah",
    email: "admin@spma.org",
    phone: "+249912345678",
    city: "الخرطوم",
    gender: "MALE" as const,
    jobTitle: "مدير البرامج",
    organization: "الجمعية السودانية لإدارة المشاريع",
    yearsExperience: 15,
    sector: "NGO" as const,
    certifications: ["PMP", "PgMP", "PMI-RMP"],
    committees: ["membership", "planning"],
    linkedin: "https://linkedin.com/in/ahmed-abdullah",
    onboardingStatus: "COMPLETED" as const,
    onboardingStep: "review",
    applicationStatus: "APPROVED" as const,
    reviewedBy: "system",
    reviewedAt: new Date("2024-01-15"),
    reviewNotes: "مؤسس ومدير الجمعية",
  },
  {
    role: "MEMBER" as const,
    fullNameAr: "فاطمة حسن إبراهيم",
    fullNameEn: "Fatima Hassan Ibrahim",
    email: "member@spma.org",
    phone: "+249923456789",
    city: "بورتسودان",
    gender: "FEMALE" as const,
    jobTitle: "مهندسة مشاريع أولى",
    organization: "شركة أرياب للتعدين",
    yearsExperience: 8,
    sector: "PRIVATE" as const,
    certifications: ["PMP", "PMI-ACP"],
    committees: ["professional-development", "scientific-research"],
    linkedin: "https://linkedin.com/in/fatima-ibrahim",
    onboardingStatus: "COMPLETED" as const,
    onboardingStep: "review",
    applicationStatus: "APPROVED" as const,
    reviewedBy: "system",
    reviewedAt: new Date("2024-03-20"),
    reviewNotes: "طلب مستوفي الشروط",
  },
  {
    role: "USER" as const,
    fullNameAr: "عمر يوسف آدم",
    fullNameEn: "Omar Youssef Adam",
    email: "user@spma.org",
    phone: "+249934567890",
    city: "مدني",
    gender: "MALE" as const,
    jobTitle: "منسق مشاريع",
    organization: "منظمة اليونيسف - السودان",
    yearsExperience: 3,
    sector: "NGO" as const,
    certifications: ["CAPM"],
    committees: ["media"],
    onboardingStatus: "COMPLETED" as const,
    onboardingStep: "review",
    applicationStatus: "PENDING" as const,
  },
];

async function main() {
  // --- BOOKS ---
  console.log("Seeding books...\n");

  await prisma.borrowRecord.deleteMany();
  await prisma.book.deleteMany();
  console.log("Cleared existing books and borrow records.\n");

  for (const book of books) {
    const created = await prisma.book.create({ data: book });
    console.log(`  ✓ ${created.title}`);
  }

  console.log(`\nSeeded ${books.length} books successfully.\n`);

  // --- MEMBERS ---
  console.log("Seeding members...\n");

  for (const member of members) {
    const upserted = await prisma.member.upsert({
      where: { email: member.email },
      update: member,
      create: member,
    });
    console.log(`  ✓ ${upserted.fullNameEn} (${upserted.email}) - ${upserted.role}`);
  }

  console.log(`\nSeeded ${members.length} members successfully.`);

  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
