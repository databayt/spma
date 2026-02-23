"use client";

import SiteHeading from "@/components/atom/site-heading";
import React from "react";
import { featuredVideos } from "./constant";
import HoverEffect from "@/components/template/video/card-video";
import { useTranslations } from "@/lib/use-translations";

const FeaturedVideos = () => {
  const { t } = useTranslations();

  return (
    <div className="mt-6 md:mt-20 layout-container">
      <SiteHeading
        title={t.video?.title ?? "الوثائقيات"}
        description={t.video?.subtitle ?? "ما يضر الجهل به"}
      />
      <div className="mt-2 mb-10">
        <HoverEffect items={featuredVideos()} />
      </div>
    </div>
  );
};

export default FeaturedVideos;
