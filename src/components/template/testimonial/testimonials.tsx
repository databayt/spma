import Image from "next/image";
import SiteHeading from "@/components/atom/site-heading";

export type TestimonialType = {
  name: string;
  job: string;
  image: string;
  review: string;
};

const testimonials: TestimonialType[] = [
  {
    name: "John Doe",
    job: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    review:
      "The next-saas-stripe-starter repo has truly revolutionized my development workflow. The seamless integration of Next.js and Stripe made setting up payment systems a breeze.",
  },
  {
    name: "Alice Smith",
    job: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    review:
      "Thanks to next-saas-stripe-starter, I've been able to create modern and attractive user interfaces that integrate seamlessly with powerful backend services.",
  },
  {
    name: "David Johnson",
    job: "DevOps Engineer",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    review:
      "Thanks to next-saas-stripe-starter, I was able to streamline the entire process of deploying and managing our SaaS product infrastructure.",
  },
  {
    name: "Michael Wilson",
    job: "Project Manager",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    review:
      "I'm impressed by the quality of code and clear documentation of next-saas-stripe-starter. It allowed our team to launch our project ahead of schedule.",
  },
  {
    name: "Sophia Garcia",
    job: "Data Analyst",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    review:
      "next-saas-stripe-starter provided me with the tools I needed to efficiently manage data and deliver insightful reports for our SaaS platform.",
  },
  {
    name: "Emily Brown",
    job: "Marketing Manager",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    review:
      "next-saas-stripe-starter has been an invaluable asset in my role as a marketing manager. It seamlessly integrates with our marketing tools.",
  },
  {
    name: "Jason Stan",
    job: "Web Designer",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    review:
      "Thanks to next-saas-stripe-starter, I've been able to create modern and attractive user interfaces that all our clients loved from day one.",
  },
];

export default function Testimonials() {
  return (
    <section>
      <div className="container flex max-w-6xl flex-col gap-10 py-32 sm:gap-y-16">
        <SiteHeading
          title="What our clients are sharing."
          description="Discover the glowing feedback from our delighted customers worldwide."
        />

        <div className="column-1 gap-5 space-y-5 md:columns-2 lg:columns-3">
          {testimonials.map((item) => (
            <div className="break-inside-avoid" key={item.name}>
              <div className="relative rounded-xl border bg-muted/25">
                <div className="flex flex-col px-4 py-5 sm:p-6">
                  <div>
                    <div className="relative mb-4 flex items-center gap-3">
                      <span className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full">
                        <Image
                          width={100}
                          height={100}
                          className="size-full rounded-full border"
                          src={item.image}
                          alt={item.name}
                        />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.job}
                        </p>
                      </div>
                    </div>
                    <q className="text-muted-foreground">{item.review}</q>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
