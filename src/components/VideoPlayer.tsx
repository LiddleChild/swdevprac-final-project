"use client";

import { useEffect, useRef } from "react";

type VideoPlayerProps = {
  vdoSrc: string;
  isPlaying: boolean;
};

export default function VideoPlayer({ vdoSrc, isPlaying }: VideoPlayerProps) {
  const vdoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isPlaying) {
      vdoRef.current?.play();
    } else {
      vdoRef.current?.pause();
    }
  }, [isPlaying]);

  return <video className="w-1/2" src={vdoSrc} ref={vdoRef} muted loop />;
}
