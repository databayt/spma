"use client";

import Head from "@/components/atom/site-heading";
import React from "react";
import EventCard from "./new";
import { useTranslations } from "@/lib/use-translations";

const Event = () => {
  const { t } = useTranslations();

  return (
    <div>
      <Head
        title={t.eventTemplate?.title ?? "الأحداث"}
        description={t.eventTemplate?.subtitle ?? "القادمة"}
      />
      <EventCard />
    </div>
  );
};

export default Event;
