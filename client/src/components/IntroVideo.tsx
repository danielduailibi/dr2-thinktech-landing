import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroVideoProps {
  onVideoEnd: () => void;
}

export default function IntroVideo({ onVideoEnd }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [canSkip, setCanSkip] = useState(false);

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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-[#0F1629] flex items-center justify-center"
        >
          {/* Video */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-contain"
          >
            <source src="/videos/intro-video.mp4" type="video/mp4" />
          </video>

          {/* Skip button */}
          <AnimatePresence>
            {canSkip && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onClick={handleSkip}
                className="absolute bottom-8 right-8 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-all duration-300"
              >
                Pular Intro →
              </motion.button>
            )}
          </AnimatePresence>

          {/* Loading indicator while video loads */}
          <div className="absolute bottom-8 left-8 flex items-center gap-2 text-white/50 text-sm">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            DR² ThinkTech
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
