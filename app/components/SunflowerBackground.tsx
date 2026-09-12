"use client";

import { useEffect, useRef } from "react";

export default function SunflowersBackground() {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;

    if (!image) return;

    let frame = 0;

    const update = () => {
      const scrollY = window.scrollY;
      const offset = scrollY * 0.08;

      image.style.transform = `translate3d(0, ${offset}px, 0) scale(1.015)`;

      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: -2,
        background: "#050704",
      }}
    >
      <img
        ref={imageRef}
        src="/SunflowerMILY.webp"
        alt=""
        draggable={false}
        style={{
          position: "absolute",
          inset: "-1.5%",
          width: "103%",
          height: "103%",
          maxWidth: "none",
          objectFit: "cover",
          objectPosition: "center center",
          userSelect: "none",
          willChange: "transform",
          transform: "translate3d(0, 0, 0) scale(1.015)",
          backfaceVisibility: "hidden",
        }}
      />
    </div>
  );
}