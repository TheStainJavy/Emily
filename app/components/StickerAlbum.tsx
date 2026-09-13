"use client";

import { useState } from "react";
import { Sparkles, Send, CheckCircle2 } from "lucide-react";
import { saveMessage } from "../action";

const initialStickers = [
  { id: 1, src: "/Sticker1.webp", caught: false, position: "top-[10%] left-[10%]", animation: "animate-float-1" },
  { id: 2, src: "/Sticker2.webp", caught: false, position: "bottom-[20%] left-[30%]", animation: "animate-float-2" },
  { id: 3, src: "/Sticker3.webp", caught: false, position: "top-[20%] right-[15%]", animation: "animate-float-3" },
  { id: 4, src: "/Sticker4.webp", caught: false, position: "bottom-[15%] right-[25%]", animation: "animate-float-1" },
  { id: 5, src: "/Sticker5.webp", caught: false, position: "top-[40%] left-[40%]", animation: "animate-float-2" },
  { id: 6, src: "/Sticker6.webp", caught: false, position: "bottom-[40%] left-[15%]", animation: "animate-float-3" },
];

const finalPositions = [
  "top-[-30px] left-[-20px] rotate-12",
  "bottom-[-20px] right-[-20px] -rotate-12",
  "top-[30%] left-[-40px] -rotate-6",
  "top-[40%] right-[-30px] rotate-6",
  "bottom-[20%] left-[-30px] -rotate-12",
  "top-[-40px] right-[20%] rotate-12"
];

export default function StickerAlbum() {
  const [stickers, setStickers] = useState(initialStickers);
  const [stage, setStage] = useState<'catching' | 'letter' | 'form' | 'success'>('catching');
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCatch = (id: number) => {
    setStickers(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, caught: true } : s);
      if (updated.every(s => s.caught)) {
        setTimeout(() => setStage('letter'), 800);
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    const result = await saveMessage(comment);
    
    setIsSubmitting(false);

    if (result.success) {
      setStage('success');
    } else {
      alert("Hubo un error al guardar el mensaje. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-8">
      
      {stage === 'catching' && (
        <div className="w-full relative h-[450px] bg-[#fdfbf7] rounded-3xl shadow-lg border-[6px] border-double border-[#4a7c59] overflow-hidden before:absolute before:inset-0 before:border-[3px] before:border-dashed before:border-[#679c76] before:rounded-[20px] before:pointer-events-none before:m-2">
          
          <div className="absolute top-6 left-0 right-0 text-center z-10">
            <h3 className="text-gray-500 font-serif text-lg tracking-wide">
              Atrapa los stickers para completar el álbum
            </h3>
            <div className="flex justify-center flex-wrap gap-2 mt-4 opacity-30 px-4">
              {stickers.map(s => (
                <div key={`slot-${s.id}`} className="w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center overflow-hidden">
                  {s.caught && <img src={s.src} alt="" className="w-12 h-12 object-contain" />}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 z-20">
            {stickers.map((sticker) => (
              !sticker.caught && (
                <button
                  key={sticker.id}
                  onClick={() => handleCatch(sticker.id)}
                  className={`absolute hover:scale-125 transition-transform duration-200 cursor-pointer ${sticker.position} ${sticker.animation}`}
                >
                  <img src={sticker.src} alt="Atrapar sticker" className="w-16 h-16 object-contain drop-shadow-md" />
                </button>
              )
            ))}
          </div>
        </div>
      )}

      {stage === 'letter' && (
        <div className="w-full animate-fade-in-up flex flex-col items-center gap-12">
          <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl border-2 border-pastel-pink max-w-2xl text-center relative mt-8">
            
            {stickers.map((s, i) => (
              <img 
                key={s.id} 
                src={s.src} 
                alt="" 
                className={`absolute w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg z-30 animate-float-${(i % 3) + 1} ${finalPositions[i]}`} 
              />
            ))}
            
            <div className="space-y-6 text-gray-800 text-lg md:text-xl font-medium font-serif leading-relaxed relative z-20">
              <p>Con todo esto espero que te haya sacado una que otra sonrisa ha sido divertido de hacer esto y para terminar solo quiero terminar diciendo esto:</p>
              <p>Has sido la persona que he conocido a lo largo del tiempo que ha sido la única que me hace sentir que realmente puedo ser yo mismo estando junto a ti.</p>
              <p>Eso te hace única y especial, te mereces todo lo lindo y bonito de esta vida y me gusta formar parte de tu proceso aunque sea en pequeña parte soy feliz.</p>
              <p>Aprecio todos mis recuerdos que tengo contigo y todo lo que siento por ti es lo que representan las flores amarillas este dia de mi para ti.</p>
              <p>con mucho amor y cariño &quot;Javy&quot;</p>
            </div>
          </div>

          <button
            onClick={() => setStage('form')}
            className="flex items-center gap-2 px-8 py-4 bg-pastel-pink text-gray-900 rounded-full shadow-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:bg-pink-300 border border-white/50 relative z-40"
          >
            Finalizar
            <Sparkles size={22} className="animate-pulse" />
          </button>
        </div>
      )}

      {stage === 'form' && (
        <form onSubmit={handleSubmit} className="w-full max-w-xl animate-fade-in-up bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-2 border-pastel-pink flex flex-col gap-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Un espacio para ti</h3>
            <p className="text-gray-600">Esta parte de aqui es para que escribas todo lo que quieras decir sobre esta pagina y lo que viste :D</p>
          </div>
          
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe aquí tu mensaje..."
            className="w-full h-40 p-4 rounded-xl border-2 border-pastel-pink/50 focus:border-pastel-pink focus:outline-none focus:ring-4 focus:ring-pastel-pink/20 resize-none text-gray-700 bg-white/50"
            required
          />

          <button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className="flex items-center justify-center gap-2 w-full py-4 bg-pastel-green text-gray-900 rounded-xl shadow-md font-bold text-lg transition-all duration-300 hover:bg-[#679c76] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            <Send size={20} />
          </button>
        </form>
      )}

      {stage === 'success' && (
        <div className="w-full max-w-md animate-fade-in-up bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-xl border-2 border-pastel-green text-center flex flex-col items-center gap-4">
          <CheckCircle2 size={64} className="text-pastel-green animate-bounce" />
          <h3 className="text-2xl font-bold text-gray-800">¡Mensaje guardado!</h3>
          <p className="text-gray-600 font-medium">Gracias por compartir este momento.</p>
        </div>
      )}
      
    </div>
  );
}