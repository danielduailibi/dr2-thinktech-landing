import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Volume2, VolumeX, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// URL do vídeo no CDN
const VIDEO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029732852/rPlVjHDfjCDnXiHd.mp4";

export default function Intro() {
  const [, setLocation] = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canSkip, setCanSkip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

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

  // Animação de progresso do loading
  useEffect(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Progresso mais rápido no início, mais lento no final
        const increment = prev < 70 ? 3 : prev < 90 ? 1 : 0.5;
        return Math.min(prev + increment, 99);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Tentar reproduzir o vídeo automaticamente
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      try {
        video.muted = true;
        setIsMuted(true);
        await video.play();
        setLoadingProgress(100);
        
        // Pequeno delay para a animação de transição
        setTimeout(() => {
          setIsLoading(false);
          setShowContent(true);
          setIsPlaying(true);
        }, 500);
      } catch (error) {
        console.log("Autoplay bloqueado, mostrando botão de play");
        setLoadingProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          setShowContent(true);
          setShowPlayButton(true);
        }, 500);
      }
    };

    video.addEventListener('loadeddata', () => {
      attemptPlay();
    });

    video.addEventListener('canplay', attemptPlay, { once: true });

    // Timeout de segurança - se não carregar em 8s, mostrar botão
    const timeout = setTimeout(() => {
      if (isLoading) {
        setLoadingProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          setShowContent(true);
          setShowPlayButton(true);
        }, 500);
      }
    }, 8000);

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
    <div className="fixed inset-0 z-[100] bg-[#0a0e1a] flex items-center justify-center overflow-hidden">
      {/* Background com partículas sutis */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [null, Math.random() * -200 - 100],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Loading Screen com animação elegante */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center z-30 bg-[#0a0e1a]"
          >
            <div className="flex flex-col items-center">
              {/* Logo animado */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-8"
              >
                <div className="relative">
                  {/* Círculo de glow pulsante */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ width: 120, height: 120, left: -10, top: -10 }}
                  />
                  
                  {/* Logo símbolo */}
                  <motion.img
                    src="/images/logo-symbol.png"
                    alt="DR² ThinkTech"
                    className="w-24 h-24 object-contain relative z-10"
                    animate={{
                      filter: ["drop-shadow(0 0 10px rgba(34, 211, 238, 0.3))", "drop-shadow(0 0 20px rgba(34, 211, 238, 0.5))", "drop-shadow(0 0 10px rgba(34, 211, 238, 0.3))"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>

              {/* Nome da empresa */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center mb-8"
              >
                <h1 className="text-2xl font-bold text-white tracking-wider">
                  DR<sup className="text-cyan-400">²</sup> <span className="text-cyan-400">ThinkTech</span>
                </h1>
                <p className="text-white/40 text-sm mt-1 tracking-widest uppercase">
                  Innovation & Intelligence
                </p>
              </motion.div>

              {/* Barra de progresso elegante */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 200 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="relative"
              >
                <div className="w-[200px] h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
                
                {/* Texto de carregamento */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-white/40 text-xs mt-3 text-center"
                >
                  {loadingProgress < 100 ? "Preparando experiência..." : "Iniciando..."}
                </motion.p>
              </motion.div>

              {/* Indicador de conexões neurais animadas */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-20 flex gap-2"
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-cyan-400/50 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play button - mostrado quando autoplay falha */}
      <AnimatePresence>
        {showPlayButton && !isPlaying && showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <motion.button
              onClick={handlePlayClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/5 hover:bg-white/10 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 group backdrop-blur-sm"
            >
              <motion.div 
                className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-all"
                animate={{
                  boxShadow: ["0 0 0 0 rgba(34, 211, 238, 0.3)", "0 0 0 15px rgba(34, 211, 238, 0)", "0 0 0 0 rgba(34, 211, 238, 0)"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              >
                <Play size={40} className="text-cyan-400 ml-1" />
              </motion.div>
              <span className="text-white font-medium">Clique para iniciar</span>
              <span className="text-white/50 text-sm">DR² ThinkTech</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video */}
      <motion.video
        ref={videoRef}
        muted={isMuted}
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent && isPlaying ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="w-full h-full object-contain"
      >
        <source src={VIDEO_URL} type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </motion.video>

      {/* Logo DR² ThinkTech - canto inferior esquerdo */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-6 left-6 flex items-center gap-1.5 text-white/40 text-xs z-10"
          >
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            <span className="font-medium tracking-wide">DR² ThinkTech</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão de som - ao lado do logo */}
      <AnimatePresence>
        {isPlaying && showContent && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            onClick={toggleMute}
            className="absolute bottom-6 left-32 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white/90 transition-all duration-200 z-10"
            title={isMuted ? "Ativar som" : "Desativar som"}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Botão de pular - canto inferior direito, cobrindo o logo Veo */}
      <AnimatePresence>
        {showContent && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: canSkip ? 1 : 0.3, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            onClick={handleSkip}
            disabled={!canSkip}
            className="absolute bottom-4 right-4 px-6 py-3 text-sm font-semibold text-white bg-[#0F1629]/90 hover:bg-[#0F1629] border border-cyan-500/30 hover:border-cyan-400 rounded-lg transition-all duration-200 shadow-lg backdrop-blur-sm min-w-[140px] z-10"
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
        )}
      </AnimatePresence>
    </div>
  );
}
