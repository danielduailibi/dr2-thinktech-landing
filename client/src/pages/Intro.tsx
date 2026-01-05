import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Volume2, VolumeX, Play } from "lucide-react";

// URL do vídeo no CDN
const VIDEO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029732852/DQpYREiUaWfIECvi.mp4";

export default function Intro() {
  const [, setLocation] = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canSkip, setCanSkip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  useEffect(() => {
    // Verificar se já viu o vídeo
    const hasSeenIntro = sessionStorage.getItem("dr2_intro_seen");
    if (hasSeenIntro === "true") {
      setLocation("/home");
      return;
    }

    // Permitir pular após 3 segundos
    const skipTimer = setTimeout(() => {
      setCanSkip(true);
    }, 3000);

    return () => clearTimeout(skipTimer);
  }, [setLocation]);

  // Tentar reproduzir o vídeo automaticamente
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      try {
        video.muted = true;
        setIsMuted(true);
        await video.play();
        setIsPlaying(true);
        setIsLoading(false);
      } catch (error) {
        console.log("Autoplay bloqueado, mostrando botão de play");
        setIsLoading(false);
        setShowPlayButton(true);
      }
    };

    video.addEventListener('loadeddata', () => {
      setIsLoading(false);
      attemptPlay();
    });

    video.addEventListener('canplay', attemptPlay, { once: true });

    // Timeout de segurança - se não carregar em 5s, mostrar botão
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setShowPlayButton(true);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleVideoEnd = () => {
    sessionStorage.setItem("dr2_intro_seen", "true");
    setLocation("/home");
  };

  const handleSkip = () => {
    sessionStorage.setItem("dr2_intro_seen", "true");
    setLocation("/home");
  };

  const handlePlayClick = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = true;
      setIsMuted(true);
      await video.play();
      setIsPlaying(true);
      setShowPlayButton(false);
    } catch (error) {
      console.log("Erro ao reproduzir:", error);
      // Se ainda falhar, redirecionar para home
      handleSkip();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60 text-sm">Carregando...</p>
          </div>
        </div>
      )}

      {/* Play button - mostrado quando autoplay falha */}
      {showPlayButton && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <button
            onClick={handlePlayClick}
            className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/5 hover:bg-white/10 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 group"
          >
            <div className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-all">
              <Play size={40} className="text-cyan-400 ml-1" />
            </div>
            <span className="text-white font-medium">Clique para iniciar</span>
            <span className="text-white/50 text-sm">DR² ThinkTech</span>
          </button>
        </div>
      )}

      {/* Video */}
      <video
        ref={videoRef}
        muted={isMuted}
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          isLoading || (showPlayButton && !isPlaying) ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <source src={VIDEO_URL} type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>

      {/* Logo DR² ThinkTech - canto inferior esquerdo */}
      <div className="absolute bottom-6 left-6 flex items-center gap-1.5 text-white/40 text-xs z-10">
        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
        <span className="font-medium tracking-wide">DR² ThinkTech</span>
      </div>

      {/* Botão de som - ao lado do logo */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          className="absolute bottom-6 left-32 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white/90 transition-all duration-200 z-10"
          title={isMuted ? "Ativar som" : "Desativar som"}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      )}

      {/* Botão de pular - canto inferior direito, cobrindo o logo Veo */}
      <button
        onClick={handleSkip}
        disabled={!canSkip}
        className={`absolute bottom-4 right-4 px-6 py-3 text-sm font-semibold text-white bg-[#0F1629]/90 hover:bg-[#0F1629] border border-cyan-500/30 hover:border-cyan-400 rounded-lg transition-all duration-200 shadow-lg backdrop-blur-sm min-w-[140px] z-10 ${
          canSkip ? 'opacity-100' : 'opacity-30'
        }`}
      >
        {canSkip ? (
          <span className="flex items-center justify-center gap-2">
            Pular Vídeo
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </span>
        ) : (
          <span className="text-white/50">Aguarde...</span>
        )}
      </button>
    </div>
  );
}
