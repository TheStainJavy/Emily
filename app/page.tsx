import FlowerBackground from "./components/FlowerBackground";
import MusicPlayer from "./components/MusicPlayer";
import CuteTabs from "./components/CuteTabs";
import LetterGift from "./components/LetterGift";

export default function Home() {
  return (
    <main className="min-h-screen relative w-full flex flex-col items-center justify-start pt-16 p-4">
      <FlowerBackground />
      
      <div className="z-10 text-center mb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
          Hola <span className="text-pastel-pink">✨</span>
        </h1>
      </div>

      <LetterGift />

      <CuteTabs />
      
      <MusicPlayer />
    </main>
  );
}