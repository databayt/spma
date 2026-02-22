import Head from "@/components/atom/site-heading";
import React from "react";
import { featuredArticles } from "./constant";
import { ArticleHoverEffect } from "@/components/atom/card-article";

const FeaturedArticles = () => {
  return (
    <div className="px-10 md:px-20 lg:px-32">
      <Head title="المقالات" description="مدونة الحركة" />

      <div className="-mt-10">
        <ArticleHoverEffect items={featuredArticles()} />
      </div>
    </div>
  );
};

export default FeaturedArticles;
