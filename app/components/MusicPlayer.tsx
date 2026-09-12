"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Music } from "lucide-react";
import Script from "next/script";

declare global {
  interface Window {
    SC: {
      Widget: ((element: HTMLIFrameElement | string) => {
        bind: (event: string, callback: () => void) => void;
        play: () => void;
        pause: () => void;
        skip: (index: number) => void;
        toggle: () => void;
        isPaused: (callback: (paused: boolean) => void) => void;
        getCurrentSound: (callback: (sound: { title: string }) => void) => void;
      }) & {
        Events: {
          READY: string;
          PLAY: string;
          PAUSE: string;
          FINISH: string;
        };
      };
    };
  }
}

export default function MusicPlayer() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songTitle, setSongTitle] = useState("Cargando música...");

  const playlistUrl = encodeURIComponent("https://api.soundcloud.com/playlists/soundcloud%3Aplaylists%3A2298231990");
  const iframeSrc = `https://w.soundcloud.com/player/?url=${playlistUrl}&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;

  useEffect(() => {
    const checkWidget = setInterval(() => {
      if (window.SC && iframeRef.current && !widgetRef.current) {
        const widget = window.SC.Widget(iframeRef.current);
        widgetRef.current = widget;

        widget.bind(window.SC.Widget.Events.READY, () => {
          widget.play();
          setIsPlaying(true);
          widget.getCurrentSound((sound) => {
            if (sound && sound.title) {
              setSongTitle(sound.title);
            }
          });
        });

        widget.bind(window.SC.Widget.Events.PLAY, () => {
          setIsPlaying(true);
          widget.getCurrentSound((sound) => {
            if (sound && sound.title) {
              setSongTitle(sound.title);
            }
          });
        });

        widget.bind(window.SC.Widget.Events.PAUSE, () => {
          setIsPlaying(false);
        });

        clearInterval(checkWidget);
      }
    }, 500);

    return () => clearInterval(checkWidget);
  }, []);

  const togglePlay = () => {
    if (widgetRef.current) {
      widgetRef.current.toggle();
    }
  };

  const nextSong = () => {
    if (widgetRef.current) {
      widgetRef.current.skip(1);
    }
  };

  const prevSong = () => {
    if (widgetRef.current) {
      widgetRef.current.skip(-1);
    }
  };

  return (
    <>
      <Script src="https://w.soundcloud.com/player/api.js" strategy="afterInteractive" />
      
      <div className="hidden">
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          allow="autoplay"
        />
      </div>

      <div className="fixed top-4 right-4 z-40 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-pastel-pink/40 flex items-center gap-3">
        <div className="flex items-center gap-2 max-w-[200px] overflow-hidden">
          <Music size={16} className="text-pastel-pink animate-pulse shrink-0" />
          <span className="text-xs font-medium text-gray-700 truncate">
            Reproduciendo: {songTitle}
          </span>
        </div>

        <div className="flex items-center gap-1 border-l border-gray-200 pl-2">
          <button
            onClick={prevSong}
            className="p-1.5 rounded-full hover:bg-pastel-pink/30 text-gray-600 transition-colors"
            aria-label="Anterior canción"
          >
            <SkipBack size={14} />
          </button>
          
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-pastel-pink text-gray-800 hover:scale-105 transition-transform shadow-sm"
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>

          <button
            onClick={nextSong}
            className="p-1.5 rounded-full hover:bg-pastel-pink/30 text-gray-600 transition-colors"
            aria-label="Siguiente canción"
          >
            <SkipForward size={14} />
          </button>
        </div>
      </div>
    </>
  );
}