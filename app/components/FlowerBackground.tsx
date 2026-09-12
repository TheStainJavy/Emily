"use client";

import { useEffect, useRef } from "react";

type Vec2 = {
  x: number;
  y: number;
};

type Leaf = {
  t: number;
  side: number;
  size: number;
  angle: number;
  phase: number;
  delay: number;
};

type Flower = {
  t: number;
  size: number;
  type: number;
  angle: number;
  delay: number;
  phase: number;
  petals: number;
};

type Vine = {
  side: "left" | "right" | "top" | "bottom";
  offset: number;
  length: number;
  curve: number;
  width: number;
  delay: number;
  leaves: Leaf[];
  flowers: Flower[];
  seed: number;
};

const TAU = Math.PI * 2;

const random = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const easeInOutSine = (t: number) =>
  -(Math.cos(Math.PI * t) - 1) / 2;

const lerp = (a: number, b: number, t: number) =>
  a + (b - a) * t;

const noise = (value: number) =>
  Math.sin(value * 1.37) * 0.5 +
  Math.sin(value * 2.91) * 0.3 +
  Math.sin(value * 5.73) * 0.2;

const rotatePoint = (
  x: number,
  y: number,
  angle: number
): Vec2 => ({
  x: x * Math.cos(angle) - y * Math.sin(angle),
  y: x * Math.sin(angle) + y * Math.cos(angle),
});

const drawLeaf = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  angle: number,
  openness: number,
  alpha: number
) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  const width = size * openness;
  const height = size * 1.8;

  ctx.globalAlpha = alpha;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(
    width * 0.35,
    -height * 0.45,
    width * 0.85,
    -height * 0.8,
    width,
    -height
  );
  ctx.bezierCurveTo(
    width * 0.35,
    -height * 0.9,
    -width * 0.2,
    -height * 0.45,
    0,
    0
  );

  const gradient = ctx.createLinearGradient(
    0,
    0,
    width,
    -height
  );

  gradient.addColorStop(0, "#235f20");
  gradient.addColorStop(0.45, "#4f9d32");
  gradient.addColorStop(1, "#8ccf52");

  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(
    width * 0.4,
    -height * 0.45,
    width * 0.95,
    -height * 0.95
  );

  ctx.strokeStyle = "rgba(28,82,24,0.55)";
  ctx.lineWidth = Math.max(0.5, size * 0.07);
  ctx.stroke();

  ctx.restore();
};

const drawDaisy = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rotation: number,
  bloom: number,
  alpha: number,
  petals: number
) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  const petalLength = radius * 1.65 * bloom;
  const petalWidth = radius * 0.55 * bloom;

  ctx.globalAlpha = alpha;

  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * TAU;

    ctx.save();
    ctx.rotate(angle);

    const gradient = ctx.createRadialGradient(
      0,
      -radius * 0.5,
      radius * 0.05,
      0,
      -radius * 0.9,
      petalLength
    );

    gradient.addColorStop(0, "#fff58a");
    gradient.addColorStop(0.35, "#ffe52e");
    gradient.addColorStop(1, "#f2b900");

    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.ellipse(
      0,
      -radius * 0.75,
      petalWidth,
      petalLength,
      0,
      0,
      TAU
    );
    ctx.fill();

    ctx.restore();
  }

  const center = radius * 0.55 * bloom;

  const centerGradient = ctx.createRadialGradient(
    -center * 0.2,
    -center * 0.2,
    0,
    0,
    0,
    center * 1.4
  );

  centerGradient.addColorStop(0, "#765b0b");
  centerGradient.addColorStop(0.5, "#4f3b06");
  centerGradient.addColorStop(1, "#261e04");

  ctx.fillStyle = centerGradient;
  ctx.beginPath();
  ctx.arc(0, 0, center, 0, TAU);
  ctx.fill();

  for (let i = 0; i < 18; i++) {
    const a = random(i * 8.91 + radius) * TAU;
    const d = random(i * 3.41 + radius) * center;

    ctx.fillStyle = "rgba(185,143,13,0.65)";
    ctx.beginPath();
    ctx.arc(
      Math.cos(a) * d,
      Math.sin(a) * d,
      Math.max(0.5, radius * 0.035),
      0,
      TAU
    );
    ctx.fill();
  }

  ctx.restore();
};

const drawSunflower = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rotation: number,
  bloom: number,
  alpha: number
) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  ctx.globalAlpha = alpha;

  const petals = 22;

  for (let ring = 0; ring < 2; ring++) {
    for (let i = 0; i < petals; i++) {
      const angle =
        (i / petals) * TAU +
        ring * (Math.PI / petals);

      ctx.save();
      ctx.rotate(angle);

      const length =
        radius *
        (ring === 0 ? 1.45 : 1.15) *
        bloom;

      const width =
        radius *
        (ring === 0 ? 0.43 : 0.35) *
        bloom;

      const gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        -length
      );

      gradient.addColorStop(0, "#d99200");
      gradient.addColorStop(0.35, "#ffc400");
      gradient.addColorStop(0.75, "#ffdd24");
      gradient.addColorStop(1, "#f4bd00");

      ctx.fillStyle = gradient;

      ctx.beginPath();
      ctx.ellipse(
        0,
        -radius * (ring === 0 ? 0.72 : 0.6),
        width,
        length,
        0,
        0,
        TAU
      );
      ctx.fill();

      ctx.restore();
    }
  }

  const centerRadius = radius * 0.62 * bloom;

  const centerGradient = ctx.createRadialGradient(
    -centerRadius * 0.3,
    -centerRadius * 0.3,
    0,
    0,
    0,
    centerRadius
  );

  centerGradient.addColorStop(0, "#85680b");
  centerGradient.addColorStop(0.3, "#594508");
  centerGradient.addColorStop(0.75, "#302504");
  centerGradient.addColorStop(1, "#171302");

  ctx.fillStyle = centerGradient;
  ctx.beginPath();
  ctx.arc(0, 0, centerRadius, 0, TAU);
  ctx.fill();

  const seedCount = Math.floor(100 * bloom);

  for (let i = 0; i < seedCount; i++) {
    const a = random(i * 9.17 + radius) * TAU;
    const d =
      Math.sqrt(random(i * 3.11 + radius)) *
      centerRadius *
      0.88;

    ctx.fillStyle =
      i % 3 === 0
        ? "rgba(150,117,13,0.7)"
        : "rgba(25,20,3,0.8)";

    ctx.beginPath();
    ctx.arc(
      Math.cos(a) * d,
      Math.sin(a) * d,
      Math.max(0.4, radius * 0.025),
      0,
      TAU
    );
    ctx.fill();
  }

  ctx.restore();
};

const drawSmallFlower = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rotation: number,
  bloom: number,
  alpha: number
) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  ctx.globalAlpha = alpha;

  const petals = 10;

  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * TAU;

    ctx.save();
    ctx.rotate(angle);

    const gradient = ctx.createLinearGradient(
      0,
      0,
      0,
      -radius * 1.5
    );

    gradient.addColorStop(0, "#ffb900");
    gradient.addColorStop(0.55, "#ffdc19");
    gradient.addColorStop(1, "#fff06a");

    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.ellipse(
      0,
      -radius * 0.6,
      radius * 0.28 * bloom,
      radius * 0.8 * bloom,
      0,
      0,
      TAU
    );
    ctx.fill();

    ctx.restore();
  }

  ctx.fillStyle = "#6a4c05";
  ctx.beginPath();
  ctx.arc(
    0,
    0,
    radius * 0.3 * bloom,
    0,
    TAU
  );
  ctx.fill();

  ctx.restore();
};

const createVines = (
  width: number,
  height: number
): Vine[] => {
  const vines: Vine[] = [];

  const create = (
    side: Vine["side"],
    offset: number,
    length: number,
    curve: number,
    widthValue: number,
    delay: number,
    seed: number
  ) => {
    const leaves: Leaf[] = [];
    const flowers: Flower[] = [];

    const leafCount = Math.floor(length / 48);

    for (let i = 0; i < leafCount; i++) {
      const t =
        0.06 +
        (i / Math.max(1, leafCount - 1)) * 0.9;

      leaves.push({
        t,
        side:
          random(seed + i * 7.13) > 0.5
            ? 1
            : -1,
        size: lerp(
          9,
          24,
          random(seed + i * 2.71)
        ),
        angle:
          (random(seed + i * 4.83) - 0.5) *
          0.7,
        phase: random(seed + i * 5.91) * TAU,
        delay:
          delay +
          random(seed + i * 8.1) * 2.5,
      });
    }

    const flowerCount = Math.max(
      2,
      Math.floor(length / 170)
    );

    for (let i = 0; i < flowerCount; i++) {
      const t =
        0.15 +
        (i / Math.max(1, flowerCount - 1)) *
          0.75;

      const typeRandom = random(
        seed + i * 14.41
      );

      flowers.push({
        t,
        size: lerp(
          18,
          48,
          random(seed + i * 11.7)
        ),
        type:
          typeRandom > 0.78
            ? 0
            : typeRandom > 0.4
            ? 1
            : 2,
        angle:
          random(seed + i * 6.31) * TAU,
        delay:
          delay +
          1.5 +
          i * 1.1 +
          random(seed + i * 9.27),
        phase: random(seed + i * 3.83) * TAU,
        petals:
          Math.floor(
            lerp(
              9,
              15,
              random(seed + i * 4.71)
            )
          ),
      });
    }

    vines.push({
      side,
      offset,
      length,
      curve,
      width: widthValue,
      delay,
      leaves,
      flowers,
      seed,
    });
  };

  const density = clamp(
    Math.min(width, height) / 900,
    0.7,
    1.25
  );

  create(
    "left",
    height * 0.1,
    height * 0.78 * density,
    width * 0.045,
    3.2,
    0,
    11
  );

  create(
    "left",
    height * 0.48,
    height * 0.48 * density,
    width * 0.07,
    2.2,
    2.4,
    31
  );

  create(
    "right",
    height * 0.04,
    height * 0.72 * density,
    width * 0.06,
    2.8,
    1.2,
    61
  );

  create(
    "right",
    height * 0.62,
    height * 0.34 * density,
    width * 0.08,
    2,
    3.7,
    89
  );

  create(
    "top",
    width * 0.06,
    width * 0.48 * density,
    height * 0.06,
    2.1,
    1.8,
    117
  );

  create(
    "bottom",
    width * 0.58,
    width * 0.38 * density,
    height * 0.08,
    2,
    3,
    151
  );

  return vines;
};

const vinePoint = (
  vine: Vine,
  t: number,
  width: number,
  height: number
): Vec2 => {
  const clampedT = clamp(t, 0, 1);
  const wave =
    noise(clampedT * 5 + vine.seed) *
    vine.curve *
    Math.sin(clampedT * Math.PI);

  if (vine.side === "left") {
    return {
      x:
        vine.offset * 0.02 +
        wave +
        18,
      y:
        vine.offset +
        vine.length * clampedT,
    };
  }

  if (vine.side === "right") {
    return {
      x:
        width -
        18 -
        wave -
        vine.offset * 0.02,
      y:
        vine.offset +
        vine.length * clampedT,
    };
  }

  if (vine.side === "top") {
    return {
      x:
        vine.offset +
        vine.length * clampedT,
      y:
        18 +
        wave,
    };
  }

  return {
    x:
      vine.offset +
      vine.length * clampedT,
    y:
      height -
      18 -
      wave,
  };
};

const drawVine = (
  ctx: CanvasRenderingContext2D,
  vine: Vine,
  width: number,
  height: number,
  progress: number,
  time: number
) => {
  const growth = clamp(
    (progress - vine.delay * 0.055) /
      (1 - vine.delay * 0.025),
    0,
    1
  );

  if (growth <= 0) return;

  const segments = 70;
  const visibleSegments = Math.max(
    1,
    Math.floor(segments * easeOutCubic(growth))
  );

  ctx.save();

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "rgba(39,91,30,0.92)";
  ctx.lineWidth = vine.width;

  ctx.beginPath();

  for (let i = 0; i <= visibleSegments; i++) {
    const t = i / segments;
    const p = vinePoint(
      vine,
      t,
      width,
      height
    );

    if (i === 0) {
      ctx.moveTo(p.x, p.y);
    } else {
      ctx.lineTo(p.x, p.y);
    }
  }

  ctx.stroke();

  ctx.strokeStyle = "rgba(103,150,53,0.5)";
  ctx.lineWidth = Math.max(
    0.7,
    vine.width * 0.35
  );

  ctx.beginPath();

  for (let i = 0; i <= visibleSegments; i++) {
    const t = i / segments;
    const p = vinePoint(
      vine,
      t,
      width,
      height
    );

    if (i === 0) {
      ctx.moveTo(p.x, p.y);
    } else {
      ctx.lineTo(p.x, p.y);
    }
  }

  ctx.stroke();

  vine.leaves.forEach((leaf, index) => {
    if (leaf.t > growth) return;

    const localGrowth = clamp(
      (growth - leaf.t) * 5,
      0,
      1
    );

    const p = vinePoint(
      vine,
      leaf.t,
      width,
      height
    );

    const next = vinePoint(
      vine,
      Math.min(1, leaf.t + 0.015),
      width,
      height
    );

    const stemAngle = Math.atan2(
      next.y - p.y,
      next.x - p.x
    );

    const sway =
      Math.sin(
        time * 0.0007 +
          leaf.phase +
          index
      ) * 0.035;

    const leafAngle =
      stemAngle +
      leaf.side *
        (Math.PI / 2.3) +
      leaf.angle +
      sway;

    const leafSize =
      leaf.size *
      easeOutCubic(localGrowth);

    drawLeaf(
      ctx,
      p.x,
      p.y,
      leafSize,
      leafAngle,
      1,
      clamp(localGrowth, 0, 1)
    );
  });

  vine.flowers.forEach((flower, index) => {
    if (flower.t > growth) return;

    const local =
      clamp(
        (growth - flower.t) * 2.8,
        0,
        1
      );

    const bloom =
      easeOutCubic(
        clamp(
          (local - 0.15) /
            0.85,
          0,
          1
        )
      );

    if (bloom <= 0) return;

    const p = vinePoint(
      vine,
      flower.t,
      width,
      height
    );

    const wobble =
      Math.sin(
        time * 0.00045 +
          flower.phase +
          index
      ) * 0.035;

    const flowerAlpha =
      clamp(
        (local - 0.05) * 2,
        0,
        1
      );

    if (flower.type === 0) {
      drawSunflower(
        ctx,
        p.x,
        p.y,
        flower.size,
        flower.angle + wobble,
        bloom,
        flowerAlpha
      );
    } else if (flower.type === 1) {
      drawDaisy(
        ctx,
        p.x,
        p.y,
        flower.size,
        flower.angle + wobble,
        bloom,
        flowerAlpha,
        flower.petals
      );
    } else {
      drawSmallFlower(
        ctx,
        p.x,
        p.y,
        flower.size,
        flower.angle + wobble,
        bloom,
        flowerAlpha
      );
    }
  });

  ctx.restore();
};

export default function FlowerBackround() {
  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context =
      canvas.getContext("2d", {
        alpha: true,
      });

    if (!context) return;

    let animationFrame = 0;
    let destroyed = false;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let vines: Vine[] = [];

    const startTime = performance.now();

    const resize = () => {
      const rect =
        canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width =
        Math.floor(width * dpr);

      canvas.height =
        Math.floor(height * dpr);

      context.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      vines = createVines(
        width,
        height
      );
    };

    const resizeObserver =
      new ResizeObserver(resize);

    resizeObserver.observe(canvas);

    resize();

    const render = (
      timestamp: number
    ) => {
      if (destroyed) return;

      const elapsed =
        timestamp - startTime;

      const introDuration = 7200;

      const introProgress =
        clamp(
          elapsed / introDuration,
          0,
          1
        );

      const growthProgress =
        easeInOutSine(
          introProgress
        );

      context.clearRect(
        0,
        0,
        width,
        height
      );

      context.save();

      context.globalCompositeOperation =
        "source-over";

      vines.forEach((vine) => {
        drawVine(
          context,
          vine,
          width,
          height,
          growthProgress,
          timestamp
        );
      });

      context.restore();

      animationFrame =
        requestAnimationFrame(render);
    };

    animationFrame =
      requestAnimationFrame(render);

    return () => {
      destroyed = true;
      cancelAnimationFrame(
        animationFrame
      );
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    />
  );
}