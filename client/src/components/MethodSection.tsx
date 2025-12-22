import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Search, 
  Lightbulb, 
  LineChart, 
  Layers, 
  Rocket,
  ArrowRight
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Diagnóstico",
    description: "Mapeamento profundo de processos, riscos e gargalos organizacionais.",
    detail: "Analisamos sua operação com olhar clínico e metodológico para identificar oportunidades reais de melhoria.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Prova de Conceito",
    description: "Teste de viabilidade técnica e clínica.",
    detail: "Validamos se a solução proposta é tecnicamente viável e clinicamente relevante para seu contexto.",
  },
  {
    number: "03",
    icon: LineChart,
    title: "Prova de Função",
    description: "Validação com dados reais e métricas de desempenho.",
    detail: "Testamos a solução em ambiente real, medindo resultados concretos e ajustando conforme necessário.",
  },
  {
    number: "04",
    icon: Layers,
    title: "Prototipagem",
    description: "Construção da solução com envolvimento de usuários.",
    detail: "Desenvolvemos iterativamente com participação ativa dos usuários finais para garantir aderência.",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Implementação e Escala",
    description: "Integração à rotina, treinamento e monitoramento contínuo.",
    detail: "Garantimos que a solução seja incorporada ao dia-a-dia com suporte e acompanhamento constante.",
  },
];

export default function MethodSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="metodo" className="py-24 bg-[#0F1629] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Nosso Método:{" "}
            <span className="text-gradient-cyan">Da Hipótese ao Impacto Real</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Um processo estruturado em 5 etapas que garante resultados mensuráveis
            e sustentáveis para sua organização.
          </p>
        </motion.div>

        {/* Timeline - Desktop */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0" />
            
            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {/* Step card */}
                  <div
                    className={`glass-card rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                      activeStep === index
                        ? "border-cyan-500/50 glow-cyan scale-105"
                        : "border-white/5 hover:border-cyan-500/30"
                    }`}
                  >
                    {/* Number badge */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0F1629] border-2 border-cyan-500 flex items-center justify-center">
                      <span className="text-cyan-400 font-bold">{step.number}</span>
                    </div>

                    <div className="pt-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                        activeStep === index ? "bg-cyan-500" : "bg-cyan-500/20"
                      }`}>
                        <step.icon className={`w-6 h-6 transition-colors duration-300 ${
                          activeStep === index ? "text-[#0F1629]" : "text-cyan-400"
                        }`} />
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow connector */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-24 -right-2 z-10">
                      <ArrowRight className="w-4 h-4 text-cyan-500" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Active step detail */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="inline-block glass-card rounded-xl px-8 py-4 border-cyan-500/20">
              <p className="text-gray-300">{steps[activeStep].detail}</p>
            </div>
          </motion.div>
        </div>

        {/* Timeline - Mobile */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex gap-4"
            >
              {/* Left side - number and line */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center shrink-0">
                  <span className="text-cyan-400 font-bold">{step.number}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-full bg-gradient-to-b from-cyan-500/50 to-transparent mt-2" />
                )}
              </div>

              {/* Right side - content */}
              <div className="glass-card rounded-xl p-6 flex-1 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
