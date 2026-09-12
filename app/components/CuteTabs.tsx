"use client";

import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import FlowerTransition from "./FlowerTransition";
import InteractiveBouquet from "./InteractiveBouquet";
import StickerAlbum from "./StickerAlbum";

type Stage = 'start' | 'letter' | 'bouquet' | 'album';

export default function CuteTabs() {
  const [stage, setStage] = useState<Stage>('start');
  const [transitionState, setTransitionState] = useState<'idle' | 'in' | 'out'>('idle');

  const advanceStage = (nextStage: Stage) => {
    if (transitionState !== 'idle') return;
    
    setTransitionState('in');

    setTimeout(() => {
      setStage(nextStage);
      setTransitionState('out');

      setTimeout(() => {
        setTransitionState('idle');
      }, 1500);
    }, 1500);
  };

  return (
    <>
      <FlowerTransition 
        isActive={transitionState !== 'idle'} 
        isExiting={transitionState === 'out'} 
      />

      <div className="w-full max-w-4xl mx-auto z-10 relative mt-12 min-h-[300px] flex items-center justify-center">
        
        {stage === 'start' && (
          <button
            onClick={() => advanceStage('letter')}
            disabled={transitionState !== 'idle'}
            className="flex items-center gap-2 px-8 py-4 bg-pastel-pink text-gray-900 rounded-full shadow-xl font-bold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-pastel-pink/50 border border-white/50"
          >
            Comenzar recorrido
            <ArrowRight size={20} className="animate-bounce-x" />
          </button>
        )}

        {stage === 'letter' && (
          <div className="w-full relative p-8 md:p-12 bg-[#fdfbf7] rounded-3xl shadow-2xl border-[6px] border-double border-[#4a7c59] before:absolute before:inset-0 before:border-[3px] before:border-dashed before:border-[#679c76] before:rounded-[20px] before:pointer-events-none before:m-2">
            
            <div className="relative z-10 flex flex-col items-center text-center gap-8">
              <p className="text-gray-800 text-lg md:text-xl font-medium leading-relaxed font-serif">
                Hola Emily es la primera vez que me dedico de corazón a hacer un proyectito para una persona especial, así que espero te gusten algunas cositas que he preparado para ti por este dia tematico de las flores amarillas quiero presentarte mi mas pura forma de apreciarte ✨✨✨
              </p>

              <button
                onClick={() => advanceStage('bouquet')}
                disabled={transitionState !== 'idle'}
                className="flex items-center gap-2 px-6 py-3 bg-pastel-green text-gray-900 rounded-full shadow-md font-bold transition-all duration-300 hover:scale-105 hover:bg-[#679c76] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar
                <Sparkles size={18} />
              </button>
            </div>
          </div>
        )}

        {stage === 'bouquet' && (
          <div className="w-full">
            <InteractiveBouquet 
              onNext={() => advanceStage('album')} 
              disabled={transitionState !== 'idle'} 
            />
          </div>
        )}

        {stage === 'album' && (
          <div className="w-full">
            <StickerAlbum />
          </div>
        )}

      </div>
    </>
  );
}