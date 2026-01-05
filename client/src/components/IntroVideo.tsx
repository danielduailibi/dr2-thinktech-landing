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
  const [isMuted, setIsMuted] = useState(false); // Áudio habilitado por padrão

  useEffect(() => {
    // Permitir pular após 3 segundos
    const skipTimer = setTimeout(() => {
      setCanSkip(true);
    }, 3000);

    return () => clearTimeout(skipTimer);
  }, []);

  const handleVideoEnd = () => {
    setIsVisible(false);
    setTimeout(onVideoEnd, 500); // Aguarda a animação de fade out
  };

  const handleSkip = () => {
    if (canSkip) {
      handleVideoEnd();
    }
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            </div>
          )}

          {/* Video */}
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            playsInline
            onEnded={handleVideoEnd}
            onCanPlay={handleCanPlay}
            className={`w-full h-full object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>

          {/* Controles discretos no canto inferior */}
          <div className="absolute bottom-6 left-0 right-0 px-6 flex items-center justify-between">
            {/* Logo DR² ThinkTech - esquerda */}
            <div className="flex items-center gap-1.5 text-white/40 text-xs">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              <span className="font-medium tracking-wide">DR² ThinkTech</span>
            </div>

            {/* Botões de controle - direita */}
            <div className="flex items-center gap-3">
              {/* Botão de som - pequeno e discreto */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={toggleMute}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white/90 transition-all duration-200"
                title={isMuted ? "Ativar som" : "Desativar som"}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </motion.button>

              {/* Botão de pular - aparece após 3s */}
              <AnimatePresence>
                {canSkip && (
                  <motion.button
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={handleSkip}
                    className="px-3 py-1.5 text-xs font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-200"
                  >
                    Pular →
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
