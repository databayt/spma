"use client";

import Head from "@/components/atom/site-heading";
import React from "react";
import { featuredArticles } from "./constant";
import { ArticleHoverEffect } from "@/components/atom/card-article";
import { useTranslations } from "@/lib/use-translations";

const FeaturedArticles = () => {
  const { t } = useTranslations();

  return (
    <div className="layout-container" dir="rtl">
      <Head
        title={t.article?.title ?? "المقالات"}
        description={t.article?.subtitle ?? "مدونة الحركة"}
      />

      <div className="-mt-10">
        <ArticleHoverEffect items={featuredArticles()} />
      </div>
    </div>
  );
};

export default FeaturedArticles;
