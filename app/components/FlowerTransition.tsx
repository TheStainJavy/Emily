"use client";

import { useEffect, useState } from "react";

interface Flower {
  id: number;
  top: string;
  left: string;
  scale: number;
  rotStart: string;
  rotEnd: string;
  delayIn: string;
  delayOut: string;
}

interface FlowerTransitionProps {
  isActive: boolean;
  isExiting: boolean;
}

export default function FlowerTransition({ isActive, isExiting }: FlowerTransitionProps) {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    if (isActive && !isExiting) {
      const rows = 7;
      const cols = 10;
      const newFlowers: Flower[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const topJitter = (Math.random() - 0.5) * 8;
          const leftJitter = (Math.random() - 0.5) * 8;
          
          const staggerIn = (r * 0.1) + (c * 0.05);
          const staggerOut = ((rows - 1 - r) * 0.1) + ((cols - 1 - c) * 0.05);

          newFlowers.push({
            id: r * cols + c,
            top: `${(r / (rows - 1)) * 120 - 10 + topJitter}vh`,
            left: `${(c / (cols - 1)) * 120 - 10 + leftJitter}vw`,
            scale: 1.5 + Math.random() * 2,
            rotStart: `${Math.random() * 90 - 45}deg`,
            rotEnd: `${Math.random() * 360}deg`,
            delayIn: `${staggerIn + Math.random() * 0.05}s`,
            delayOut: `${staggerOut + Math.random() * 0.05}s`
          });
        }
      }
      
      setFlowers(newFlowers);
    }
  }, [isActive, isExiting]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden block">
      {flowers.map((f) => (
        <img
          key={f.id}
          src="/flor.webp"
          alt=""
          decoding="async"
          loading="eager"
          className={`absolute object-contain w-32 h-32 ${
            isExiting ? 'animate-flower-out' : 'animate-flower-in'
          }`}
          style={{
            top: f.top,
            left: f.left,
            '--scale': f.scale,
            '--rot-start': f.rotStart,
            '--rot-end': f.rotEnd,
            '--delay-in': f.delayIn,
            '--delay-out': f.delayOut,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}