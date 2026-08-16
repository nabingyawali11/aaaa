import React from "react";
import { motion } from "framer-motion";
import { useMissTheme } from "./MissTheme";

const OriginStory = () => {
  const { theme } = useMissTheme();
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-[1.75rem] p-8 backdrop-blur-md sm:p-10 ${theme.storyCard}`}
    >
      <div className="mb-4 flex items-center gap-4">
        <span className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${theme.storyBadge}`}>
          01
        </span>
        <div>
          <h3 className="text-xl font-bold text-zinc-800 sm:text-2xl">
            Two Worlds, One Event
          </h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-zinc-400">
            Radiant College · CodeFest 2025
          </p>
        </div>
      </div>

      <div className="max-w-3xl space-y-4 text-base leading-[1.75] text-zinc-600">
        <p>
          It all began under the stage lights of{" "}
          <span className={`font-semibold ${theme.originHighlight}`}>
            CodeFest 2025
          </span>
          . You were the vibrant host holding the whole crowd together, while I
          stood quietly behind the scenes helping Arun and Sushant Dai with the
          design and documents. I was so nuervous and introvet that I don't know what happen after both gone  outside and leave alone with other's in that day. I even don't know who gave me to eat a spoon of "chatpat" until you told.
        </p>
        <p>
          Two worlds, one event. Same room, different corners — yet across
          those two full days and that late night of pre-event setup, in every
          single group photo, there I was — standing right beside or behind you
          every single time.
        </p>
        <p>
          Coincidence? I honestly don't know. Maybe it was{" "}
          <span className="font-semibold text-[#1e3a8a]">destiny</span>, or
          maybe it's just something I still can't fully explain.
        </p>
      </div>
    </motion.article>
  );
};

export default OriginStory;
