"use client";

import { useState } from "react";
import LetterGift from "./components/LetterGift";
import CuteTabs from "./components/CuteTabs";
import FlowerBackground from "./components/FlowerBackground";
import MusicPlayer from "./components/MusicPlayer";

export default function Page() {
  const [isLetterClicked, setIsLetterClicked] = useState(false);
  const [isTourStarted, setIsTourStarted] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center py-10 px-4 relative overflow-hidden">
      <FlowerBackground />
      <MusicPlayer />

      <div className="flex flex-col items-center relative w-full max-w-4xl mt-2 z-10">
        {!isTourStarted && (
          <div className="flex flex-col items-center w-full transition-opacity duration-500">
            <div className="bg-gradient-to-br from-orange-50 via-rose-100 to-pink-100 backdrop-blur-md px-12 py-6 rounded-3xl shadow-xl border-2 border-rose-300 mb-4 animate-fade-in-down relative z-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-center text-rose-700 drop-shadow-md tracking-wide">
                Bienvenida Emily 💖
              </h1>
            </div>

            <div 
              onClick={() => setIsLetterClicked(true)} 
              className="cursor-pointer transition-transform hover:scale-[1.02] duration-300 w-full flex justify-center relative z-20"
            >
              <LetterGift />
            </div>
          </div>
        )}

        {isLetterClicked && (
          <div className={`w-full flex justify-center relative z-50 animate-fade-in-up ${isTourStarted ? 'mt-10' : '-mt-4'}`}>
            <CuteTabs onStartTour={() => setIsTourStarted(true)} />
          </div>
        )}
      </div>
    </main>
  );
}