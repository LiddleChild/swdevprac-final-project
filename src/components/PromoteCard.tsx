"use client";

import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { useWindowListener } from "@/hooks/useWindowListener";

export default function PromoteCard() {
  const [isPlaying, setPlaying] = useState<boolean>(true);

  const onClickHandler = () => {
    setPlaying(!isPlaying);
  };

  useWindowListener("contextmenu", (evt) => {
    evt.preventDefault();
  });

  return (
    <div className="flex flex-row items-start bg-white rounded-lg w-[576px] h-[128px] overflow-hidden">
      <VideoPlayer vdoSrc="/vdo/getvaccine.mp4" isPlaying={isPlaying} />
      <div className="size-full flex flex-col items-start justify-around p-4">
        <div className="text-xl">Get your vaccine today.</div>
        <button className="rounded-lg bg-sky-500 text-white px-3 py-1" onClick={onClickHandler}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
