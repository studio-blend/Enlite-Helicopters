"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { getVideoSource } from "@/lib/video-utils";

const DEFAULT_THUMBNAIL = "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200&h=800&fit=crop";

interface DynamicVideoPlayerProps {
  videoUrl: string;
  thumbnail?: string;
  alt: string;
  playMode?: "click" | "scroll";
  type?: "inline" | "modal";
  onModalOpen?: () => void;
  className?: string;
}

export const DynamicVideoPlayer = ({
  videoUrl,
  thumbnail,
  alt,
  playMode = "click",
  type = "inline",
  onModalOpen,
  className = "",
}: DynamicVideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(playMode === "scroll");
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSource = getVideoSource(videoUrl);
  const activeThumbnail = thumbnail || DEFAULT_THUMBNAIL;

  useEffect(() => {
    if (playMode === "scroll" && type === "inline" && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isPaused) {
            setIsPlaying(true);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [playMode, type, isPaused]);

  const handlePlay = () => {
    if (type === "modal") {
      onModalOpen?.();
    } else {
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const togglePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  if (!videoUrl) {
    return (
      <div className={`relative ${className}`}>
        <Image src={activeThumbnail} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative group overflow-hidden bg-black cursor-pointer ${className}`}
      onClick={handlePlay}
    >
      {!isPlaying ? (
        <>
          <Image 
            src={activeThumbnail} 
            alt={alt} 
            fill 
            className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-brand-red flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full relative">
          {videoSource?.type === "direct" ? (
            <>
              <video
                ref={videoRef}
                src={videoSource.url}
                autoPlay
                muted={isMuted}
                loop={playMode === "scroll"}
                playsInline
                className="w-full h-full object-cover"
              />
              
              {/* Custom Controls Overlay */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <button 
                  onClick={togglePause}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-brand-red transition-colors"
                  title={isPaused ? "Play" : "Pause"}
                >
                  {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
                </button>
                <button 
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-brand-red transition-colors"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </>
          ) : (
            <iframe
              src={`${videoSource?.embedUrl}${isMuted ? "&mute=1" : ""}${playMode === "scroll" ? "&loop=1" : ""}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          )}
        </div>
      )}
    </div>
  );
};
