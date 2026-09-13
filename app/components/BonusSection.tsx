"use client";

import { useState, useEffect } from "react";

const fullText = `< Bonus >

A ver por si no quedo muy claro esto fue por las flores amarillas mi querida y apreciada Mily pero tenia tantas ganas de mostrarte en lo que estaba trabajando para ti que lo mas seguro es que te lo mande antes de tiempo.

Es una experiencia cortita pero con mucho cariño cada linea de codigo esta por y para ti jsjsjs.

Que diosito me regale mas momentos junto a ti y que me permita saber de ti durante mas tiempo 

mientras te escribo esto parece como si te fueras a morir o algo alv jajaja pero bueno soy yo y mis pensamientos

mi corazón no me permitiria decirte todo esto de frente ya que me pondría muy nervioso por eso me dedique a hacerte todo esto.

El dia de las flores amarillas ha sido solo una excusa para poder mandarte este detallito`;

export default function BonusSection() {
  const [displayedText, setDisplayedText] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let i = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (i >= fullText.length) {
        setIsFinished(true);
        return;
      }

      setDisplayedText(fullText.slice(0, i + 1));
      const char = fullText[i];
      i++;

      if (char === '\n') {
        timeoutId = setTimeout(typeNextChar, 2000);
      } else {
        timeoutId = setTimeout(typeNextChar, 65);
      }
    };

    timeoutId = setTimeout(typeNextChar, 65);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="w-full max-w-3xl animate-fade-in-up bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl border-2 border-pastel-pink text-gray-800 font-serif leading-relaxed flex flex-col gap-6">
      <div className="whitespace-pre-wrap text-lg md:text-xl font-medium min-h-[300px]">
        {displayedText}
      </div>
      
      {isFinished && (
        <div className="animate-fade-in-up flex flex-col items-center gap-6 mt-4">
          <p className="text-3xl font-bold text-rose-500 text-center tracking-wide">
            te quiero mucho
          </p>
          <img 
            src="/Sticker7.webp" 
            alt="Sticker 7" 
            className="w-40 h-40 md:w-48 md:h-48 object-contain hover:scale-110 transition-transform duration-300 drop-shadow-xl" 
          />
        </div>
      )}
    </div>
  );
}