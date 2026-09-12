"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

export default function LetterGift() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative w-80 h-48 mx-auto cursor-pointer mt-8 mb-32 z-20" 
      onClick={() => setIsOpen(true)}
    >
      {/* Parte trasera del sobre */}
      <div className="absolute inset-0 bg-pastel-pink brightness-90 rounded-md shadow-xl"></div>

      {/* Papel de la carta */}
      <div 
        className={`absolute left-3 right-3 bg-white p-6 rounded-md shadow-inner transition-all duration-1000 ease-in-out border border-gray-100 flex flex-col items-center justify-start text-center z-10
          ${isOpen ? "-top-28 h-72 shadow-2xl" : "top-2 h-44"}`}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-3 mt-2">Para ti 🌻</h3>
        <p className={`text-sm text-gray-600 transition-opacity duration-700 delay-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          He preparado este pequeño espacio con mucho cariño para ti. Toca los botones de abajo para descubrir lo que preparé.
        </p>
        <Heart className={`text-pastel-pink mt-auto mb-2 transition-all duration-700 delay-500 ${isOpen ? 'opacity-100 scale-110 animate-pulse' : 'opacity-0 scale-50'}`} size={24} />
      </div>

      {/* Solapas frontales del sobre */}
      <div className="absolute inset-0 z-20 pointer-events-none rounded-md overflow-hidden">
        {/* Izquierda */}
        <div className="absolute inset-0 bg-pastel-pink brightness-95" style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }}></div>
        {/* Derecha */}
        <div className="absolute inset-0 bg-pastel-pink brightness-95" style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)' }}></div>
        {/* Inferior */}
        <div className="absolute inset-0 bg-pastel-pink" style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)' }}></div>
      </div>

      {/* Solapa Superior (Apertura) */}
      <div 
        className="absolute top-0 left-0 right-0 h-1/2 bg-pastel-pink brightness-105 origin-top transition-transform duration-700 ease-in-out z-30 pointer-events-none"
        style={{ 
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
          backfaceVisibility: 'hidden'
        }}
      ></div>
      
      {/* Sello de corazón */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-500 ${
          isOpen ? 'opacity-0 scale-150 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <div className="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30">
          <Heart size={20} className="text-white fill-white" />
        </div>
      </div>
    </div>
  );
}