import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Shield, 
  Microscope, 
  Users, 
  Check,
  Brain,
  Target,
  Handshake,
  Sparkles
} from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Ética e Segurança Inegociáveis",
    description: "Compromisso absoluto com a segurança do paciente e práticas éticas em todas as soluções.",
  },
  {
    icon: Microscope,
    title: "Rigor Científico e Metodológico",
    description: "Cada solução é baseada em evidências e validada com metodologia rigorosa.",
  },
  {
    icon: Users,
    title: "Humano no Centro",
    description: "A tecnologia existe para apoiar pessoas e decisões, não para substituí-las.",
  },
];

const reasons = [
  {
    icon: Brain,
    title: "Criada e liderada por médicos",
    description: "Falamos a sua língua.",
  },
  {
    icon: Target,
    title: "Conhecimento profundo da realidade",
    description: "Nossas soluções nascem da prática.",
  },
  {
    icon: Sparkles,
    title: "Foco em método, não em modismos",
    description: "Rigor científico e validação real.",
  },
  {
    icon: Handshake,
    title: "Parceiros estratégicos, não fornecedores",
    description: "Do problema real à solução implementada.",
  },
];

export default function DifferentialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="diferenciais" className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        {/* IA with Clinical Responsibility */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="max-w-3xl mx-auto text-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-6">
                Inteligência Artificial Aplicada com{" "}
                <span className="text-cyan-600">Responsabilidade Clínica</span>
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nossa IA respeita a fisiologia, a evidência científica, o tratamento sigiloso
                de dados e o contexto institucional. Atuamos como um instrumento que amplifica
                a capacidade humana e organizacional, garantindo que a tecnologia apoie pessoas
                e decisões.
              </p>

              <div className="grid sm:grid-cols-3 gap-6">
                {principles.map((principle, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-14 h-14 rounded-xl bg-cyan-100 flex items-center justify-center mx-auto mb-4">
                      <principle.icon className="w-7 h-7 text-cyan-600" />
                    </div>
                    <h4 className="font-semibold text-[#1E3A5F] text-sm">
                      {principle.title}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Why Choose DR² */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-12 text-center">
            Por Que Escolher a{" "}
            <span className="text-cyan-600">DR² ThinkTech?</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-cyan-200 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E3A5F] mb-1">{reason.title}</h4>
                  <p className="text-gray-600 text-sm">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
