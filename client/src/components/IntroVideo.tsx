import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface IntroVideoProps {
  onVideoEnd: () => void;
}

// URL do vídeo no CDN
const VIDEO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029732852/DQpYREiUaWfIECvi.mp4";

export default function IntroVideo({ onVideoEnd }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [canSkip, setCanSkip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Começar mudo para garantir autoplay
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Permitir pular após 3 segundos
    const skipTimer = setTimeout(() => {
      setCanSkip(true);
    }, 3000);

    return () => clearTimeout(skipTimer);
  }, []);

  // Tentar reproduzir o vídeo quando o componente montar
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      try {
        // Primeiro tenta com mudo (mais provável de funcionar)
        video.muted = true;
        setIsMuted(true);
        await video.play();
        setIsLoading(false);
      } catch (error) {
        console.log("Autoplay falhou:", error);
        setHasError(true);
        // Se falhar completamente, pular para a landing page
        setTimeout(() => {
          handleVideoEnd();
        }, 1000);
      }
    };

    // Aguardar o vídeo estar pronto
    if (video.readyState >= 3) {
      attemptPlay();
    } else {
      video.addEventListener('canplay', attemptPlay, { once: true });
    }

    return () => {
      video.removeEventListener('canplay', attemptPlay);
    };
  }, []);

  const handleVideoEnd = () => {
    setIsVisible(false);
    setTimeout(onVideoEnd, 300);
  };

  const handleSkip = () => {
    handleVideoEnd();
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    console.log("Erro ao carregar vídeo");
    setHasError(true);
    // Se houver erro, pular para a landing page após 2 segundos
    setTimeout(() => {
      handleVideoEnd();
    }, 2000);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          {/* Loading spinner */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            </div>
          )}

          {/* Error message */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-white/60 text-sm">Carregando...</p>
              </div>
            </div>
          )}

          {/* Video */}
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
            onCanPlay={handleCanPlay}
            onError={handleError}
            className={`w-full h-full object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          >
            <source src={VIDEO_URL} type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>

          {/* Logo DR² ThinkTech - canto inferior esquerdo */}
          <div className="absolute bottom-6 left-6 flex items-center gap-1.5 text-white/40 text-xs">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            <span className="font-medium tracking-wide">DR² ThinkTech</span>
          </div>

          {/* Botão de som - canto inferior esquerdo, ao lado do logo */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={toggleMute}
            className="absolute bottom-6 left-32 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white/90 transition-all duration-200"
            title={isMuted ? "Ativar som" : "Desativar som"}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </motion.button>

          {/* Botão de pular - GRANDE, canto inferior direito, cobrindo o logo Veo */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: canSkip ? 1 : 0.3 }}
            onClick={handleSkip}
            disabled={!canSkip}
            className="absolute bottom-4 right-4 px-6 py-3 text-sm font-semibold text-white bg-[#0F1629]/90 hover:bg-[#0F1629] border border-cyan-500/30 hover:border-cyan-400 rounded-lg transition-all duration-200 shadow-lg backdrop-blur-sm min-w-[140px]"
            style={{ zIndex: 10 }}
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
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
