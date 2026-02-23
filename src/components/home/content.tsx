import { Header } from "@/components/template/header/header";
import MobileHeader from "@/components/template/header/mobile-header";
import { Hero } from "./hero";
import { PickupSection } from "./pickup-section";
import { PhotoGridSection } from "./photo-grid-section";
import { DreamSection } from "./dream-section";
import { MobileDreamSection } from "@/components/atom/mobile-dream-section";
import { ParallaxSection } from "@/components/template/parallax-section";
import { Footer } from "@/components/marketing/footer";
import FeaturedVideos from "@/components/template/video/featured-video";
import FeaturedArticles from "@/components/template/article/featured-articles";
import Event from "@/components/template/event/event";
import LogoCloud from "./logo-cloud";
import type { Dictionary } from "@/components/internationalization/dictionaries";

interface ContentProps {
  lang: string;
  dictionary: Dictionary;
}

export function Content({ lang, dictionary }: ContentProps) {
  return (
    <>
      <MobileHeader lang={lang} />
      <Header lang={lang} dictionary={dictionary} />
      <main>
        <div className="relative z-20 rounded-b-[40px] md:rounded-b-[80px] lg:rounded-b-[120px] overflow-hidden shadow-2xl bg-background">
          <Hero lang={lang} />
          <PickupSection />
        </div>
        <div className="relative z-0 -mt-[50vh] md:-mt-[75vh]">
          <PhotoGridSection />
        </div>
        <div className="hidden md:block relative z-20 bg-background">
          <DreamSection dictionary={dictionary} />
        </div>
        <ParallaxSection offset={80}>
          <div className="md:hidden">
            <MobileDreamSection dictionary={dictionary} />
          </div>
        </ParallaxSection>
        <FeaturedVideos />
        <FeaturedArticles />
        <Event />
        <LogoCloud lang={lang} />
      </main>
      <Footer lang={lang} dictionary={dictionary} />
    </>
  );
}
