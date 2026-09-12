"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

const flowersData = [
  { id: 1, text: "Lo amable que eres con las personas" },
  { id: 2, text: "Tu risita siempre que hablamos" },
  { id: 3, text: "Tu sonrisa siempre que nos vemos" },
  { id: 4, text: "Lo tierna que eres cuando conversamos por horas" },
  { id: 5, text: "Lo segura que eres de ti misma" },
  { id: 6, text: "Lo abierta que eres con tus sentimientos" },
  { id: 7, text: "Lo mucho que te esfuerzas por alcanzar tus sueños" },
  { id: 8, text: "Tus manos suaves cuando las tomo" },
  { id: 9, text: "La paz que transmites cuando estamos juntos" },
  { id: 10, text: "Cómo recuerdas los pequeños detalles de nuestras pláticas" },
  { id: 11, text: "El brillo de tus ojos cuando hablas de lo que te apasiona" },
  { id: 12, text: "La forma en que haces que los días malos se sientan mejor" },
];

interface InteractiveBouquetProps {
  onNext: () => void;
  disabled: boolean;
}

export default function InteractiveBouquet({ onNext, disabled }: InteractiveBouquetProps) {
  const [openedCards, setOpenedCards] = useState<number[]>([]);

  const handleCardClick = (id: number) => {
    if (!openedCards.includes(id)) {
      setOpenedCards((prev) => [...prev, id]);
    }
  };

  const isComplete = openedCards.length === flowersData.length;

  return (
    <div className="w-full flex flex-col items-center gap-10">
      
      <div className="relative w-full max-w-lg p-6 bg-[#fdfbf7] rounded-3xl shadow-lg border-[6px] border-double border-[#4a7c59] before:absolute before:inset-0 before:border-[3px] before:border-dashed before:border-[#679c76] before:rounded-[20px] before:pointer-events-none before:m-2 text-center">
        <h2 className="relative z-10 text-xl md:text-2xl font-serif font-medium text-gray-800">
          ✨ todo lo que aprecio de ti ✨
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
        {flowersData.map((flower) => {
          const isOpen = openedCards.includes(flower.id);
          return (
            <button
              key={flower.id}
              onClick={() => handleCardClick(flower.id)}
              disabled={isOpen}
              className={`relative w-full h-36 md:h-44 rounded-2xl transition-all duration-700 transform border-2 flex items-center justify-center p-4 text-center shadow-md overflow-hidden ${
                isOpen 
                  ? "bg-white border-pastel-pink scale-100 shadow-pastel-pink/30" 
                  : "bg-[#fdfbf7] border-transparent hover:scale-105 hover:shadow-lg cursor-pointer hover:border-pastel-yellow/50"
              }`}
            >
              <div className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-700 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <span className="text-sm md:text-base font-medium text-gray-800 leading-snug">
                  {flower.text}
                </span>
              </div>
              
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${isOpen ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'}`}>
                <img 
                  src="/flor.webp" 
                  alt="Flor" 
                  className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-sm animate-pulse" 
                />
              </div>
            </button>
          );
        })}
      </div>

      {isComplete && (
        <div className="flex flex-col items-center gap-8 mt-2 animate-fade-in-up w-full">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-pastel-pink/40 max-w-3xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pastel-pink to-transparent"></div>
            <p className="text-gray-800 text-lg md:text-xl font-medium font-serif leading-relaxed">
              Y necesitaría todo el campo de flores y sus pétalos para describir todo lo que me gusta de ti, han pasado muchas cosas en nuestras vidas a lo largo del tiempo que tenemos de conocernos y con todo esto quiero demostrarte que eres muy especial para mi y esta es mi forma de demostrarlo, creeme que aprecio mucho todo lo que me has ayudado a crecer y a ser mejor persona.
            </p>
          </div>
          
          <button
            onClick={onNext}
            disabled={disabled}
            className="flex items-center gap-2 px-8 py-4 bg-pastel-green text-gray-900 rounded-full shadow-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:bg-[#679c76] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-pastel-green/50"
          >
            Continuar
            <Sparkles size={22} className="animate-pulse" />
          </button>
        </div>
      )}
    </div>
  );
}