import { getDictionary } from "@/components/internationalization/dictionaries"
import type { Locale } from "@/components/internationalization"
import { Header } from "@/components/template/header/header"
import { Footer } from "@/components/marketing/footer"
import Image from "next/image"

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  const dict = await getDictionary(lang)
  const { about } = dict

  const goalItems = [
    { icon: "/category-01.svg", bgColor: "bg-[#D97757]" },
    { icon: "/category-06.svg", bgColor: "bg-[#6A9BCC]" },
    { icon: "/category-03.svg", bgColor: "bg-[#BCD1CA]" },
  ]

  return (
    <>
      <Header lang={lang} dictionary={dict} />
      <main className="min-h-screen pt-16">
        <div className="layout-container px-6 md:px-8 py-16">
            {/* Who We Are & Why Us Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 mb-20">
              {/* Who We Are */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="text-primary text-sm font-medium tracking-widest uppercase">
                    {about.sections.who.subtitle}
                  </div>
                  <h2 className="text-foreground text-5xl font-bold leading-tight">
                    {about.sections.who.title}
                  </h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {about.sections.who.description}
                  </p>
                </div>
                <div className="mt-8">
                  <Image
                    src="/open.jpg"
                    alt="Sudanese shop"
                    width={500}
                    height={250}
                    className="w-full h-[600px] rounded-lg object-cover"
                  />
                </div>
              </div>

              {/* Why Us */}
              <div className="space-y-8 mt-24">
                <div className="space-y-6">
                  <div className="text-primary text-sm font-medium tracking-widest uppercase">
                    {about.sections.why.subtitle}
                  </div>
                  <h2 className="text-foreground text-5xl font-bold leading-tight">
                    {about.sections.why.title}
                  </h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {about.sections.why.description}
                  </p>
                </div>
                <div className="mt-8">
                  <Image
                    src="/shop.jpg"
                    alt="Sudanese street"
                    width={500}
                    height={250}
                    className="w-full h-[600px] rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Mission Section */}
            <div className="bg-muted rounded-3xl p-12">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <div className="space-y-6">
                  <div className="text-primary text-sm font-medium tracking-widest uppercase">
                    {about.sections.mission.subtitle}
                  </div>
                  <h2 className="text-foreground text-5xl font-bold leading-tight">
                    {about.sections.mission.title}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
                    {about.sections.mission.description}
                  </p>
                </div>

                {/* Goals */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  {about.goals.map((goal, index) => (
                    <div key={index} className="space-y-4">
                      <div className={`w-24 h-24 ${goalItems[index]?.bgColor} rounded-2xl flex items-center justify-center mx-auto`}>
                        <Image
                          src={goalItems[index]?.icon || ""}
                          alt=""
                          width={64}
                          height={64}
                          className="rounded-lg"
                        />
                      </div>
                      <h3 className="text-foreground text-xl font-semibold">
                        {goal.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {goal.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Board of Directors Section */}
            <div className="mt-20">
              <div className="text-center space-y-6 mb-12">
                <div className="text-primary text-sm font-medium tracking-widest uppercase">
                  {about.boardOfDirectors.subtitle}
                </div>
                <h2 className="text-foreground text-5xl font-bold leading-tight">
                  {/* Mobile: show line-by-line if mobile lines exist */}
                  {about.boardOfDirectors.titleMobileLine1 && (
                    <>
                      <span className="block sm:hidden">{about.boardOfDirectors.titleMobileLine1}</span>
                      <span className="block sm:hidden">{about.boardOfDirectors.titleMobileLine2}</span>
                    </>
                  )}
                  {/* Desktop: always show full title; Mobile: show if no mobile lines */}
                  <span className={about.boardOfDirectors.titleMobileLine1 ? "hidden sm:block" : "block"}>
                    {about.boardOfDirectors.title}
                  </span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {about.boardOfDirectors.description}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {about.boardOfDirectors.members.map((member, index) => {
                  const images = [
                    '/facebook/7.jpg',
                    '/facebook/4.jpg',
                    '/facebook/10.jpg',
                    '/facebook/5.jpg',
                    '/facebook/6.jpg',
                    '/facebook/7.jpg',
                    '/facebook/10.jpg',
                    '/facebook/5.jpg',
                    '/facebook/4.jpg',
                  ]
                  return (
                    <div key={index} className="text-center space-y-3 md:space-y-4">
                      <div className="relative aspect-square w-full max-w-48 mx-auto">
                        <Image
                          src={images[index] ?? images[0] ?? ""}
                          alt={member.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <h3 className="font-semibold text-sm md:text-lg text-foreground">
                          {member.name}
                        </h3>
                        <p className="text-muted-foreground text-xs md:text-sm font-medium">
                          {member.position}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
        </div>
      </main>
      <Footer dictionary={dict} lang={lang} />
    </>
  )
}
