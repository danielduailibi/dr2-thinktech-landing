import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="quem-somos" className="py-24 bg-[#0F1629] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/Imagemfinal.png"
                alt="DR² ThinkTech - Cérebro Neural"
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1629] via-transparent to-transparent" />
            </div>
            
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 glass-card rounded-xl p-6 max-w-xs"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-cyan-400">DR²</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Fundada por Médicos</p>
                  <p className="text-gray-400 text-sm">Para Organizações de Saúde</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ocupamos o Espaço Entre o{" "}
              <span className="text-gradient-cyan">Pensamento Médico</span> e a{" "}
              <span className="text-gradient-cyan">Inteligência Artificial.</span>
            </h2>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              A DR² ThinkTech nasce para integrar o rigor do raciocínio clínico com o
              poder da tecnologia. Não vendemos IA, construímos clareza em cenários
              complexos. Porque em saúde, cada decisão importa.
            </p>

            <div className="space-y-6">
              {/* DR meaning */}
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20">
                  <span className="text-xl font-bold text-cyan-400">DR</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Pensamento Médico</h4>
                  <p className="text-gray-400 text-sm">
                    Representa o pensamento médico estruturado, a vivência clínica e a
                    responsabilidade profissional.
                  </p>
                </div>
              </div>

              {/* ² meaning */}
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20">
                  <span className="text-xl font-bold text-cyan-400">²</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Ao Quadrado</h4>
                  <p className="text-gray-400 text-sm">
                    Simboliza escala, pensamento exponencial e ampliação de impacto.
                  </p>
                </div>
              </div>

              {/* ThinkTech meaning */}
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20">
                  <span className="text-sm font-bold text-cyan-400">Think<br/>Tech</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Integração Inteligente</h4>
                  <p className="text-gray-400 text-sm">
                    Expressa a integração entre raciocínio crítico, método e tecnologia,
                    com a IA como instrumento e não como fim.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
