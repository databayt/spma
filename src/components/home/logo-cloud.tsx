'use client'

import { InfiniteSlider } from '@/components/atom/infinite-slider'
import { ProgressiveBlur } from '@/components/atom/progressive-blur'
import Image from 'next/image'
import type { Locale } from '@/components/internationalization/config'
import { localeConfig } from '@/components/internationalization/config'

const sponsors = [
    {
        name: "Faisal",
        src: "/sponsor/faisal.png",
        width: 120,
        height: 60,
        className: "h-12 w-auto"
    },
    {
        name: "MTDT",
        src: "/sponsor/mtdt.png",
        width: 120,
        height: 60,
        className: "h-12 w-auto"
    },
    {
        name: "Zain",
        src: "/sponsor/zain.png",
        width: 100,
        height: 50,
        className: "h-10 w-auto"
    },
    {
        name: "Khartoum",
        src: "/sponsor/khartoum.png",
        width: 120,
        height: 60,
        className: "h-12 w-auto"
    },
    {
        name: "Dal",
        src: "/sponsor/dal.png",
        width: 120,
        height: 60,
        className: "h-12 w-auto"
    },
    {
        name: "249",
        src: "/sponsor/249.png",
        width: 100,
        height: 50,
        className: "h-10 w-auto"
    },
    {
        name: "University of Khartoum",
        src: "/sponsor/uok.png",
        width: 110,
        height: 55,
        className: "h-11 w-auto"
    },
]

interface LogoCloudProps {
  lang: string;
}

export default function LogoCloud({ lang }: LogoCloudProps) {
    const isRTL = localeConfig[lang as Locale]?.dir === 'rtl';

    return (
        <section className="overflow-hidden mt-6 md:mt-0 py-8 md:py-16">
            <div className="group relative mx-auto max-w-7xl">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="relative py-6 md:w-full" style={{direction: 'ltr'}}>
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={112}>
                            {sponsors.map((sponsor, index) => (
                                <div key={index} className="flex items-center justify-center">
                                    <Image
                                        src={sponsor.src}
                                        alt={sponsor.name}
                                        width={sponsor.width}
                                        height={sponsor.height}
                                        className={`${sponsor.className} object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 dark:invert`}
                                    />
                                </div>
                            ))}
                        </InfiniteSlider>

                        <div className="bg-gradient-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                        <div className="bg-gradient-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
