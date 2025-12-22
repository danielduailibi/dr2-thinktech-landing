import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Database, TrendingUp, AlertTriangle } from "lucide-react";

const problems = [
  {
    icon: Database,
    title: "Excesso de Dados, Falta de Clareza",
    description:
      "Decisões críticas são tomadas em um oceano de informações desestruturadas, comprometendo a qualidade do cuidado.",
  },
  {
    icon: TrendingUp,
    title: "Pressão por Eficiência e Qualidade",
    description:
      "A necessidade de otimizar desfechos e recursos nunca foi tão alta. Hospitais precisam fazer mais com menos.",
  },
  {
    icon: AlertTriangle,
    title: "Risco da Tecnologia sem Contexto",
    description:
      "Ferramentas de IA genéricas falham em compreender a realidade clínica e a responsabilidade médica.",
  },
];

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="problema" className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full text-cyan-500">
          <path
            fill="currentColor"
            d="M40,-62.6C52.2,-54.5,62.7,-43.8,69.8,-30.8C76.9,-17.8,80.6,-2.5,78.5,11.8C76.4,26.1,68.5,39.4,57.6,49.5C46.7,59.6,32.8,66.5,17.9,70.1C3,73.7,-12.9,74,-27.4,69.5C-41.9,65,-55,55.7,-64.2,43.3C-73.4,30.9,-78.7,15.5,-79.1,-0.2C-79.5,-16,-75,-32,-65.7,-44.1C-56.4,-56.2,-42.3,-64.4,-28,-68.8C-13.7,-73.2,0.8,-73.8,14.8,-70.5C28.8,-67.2,27.8,-70.7,40,-62.6Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-6">
            A Saúde se Tornou
            <span className="text-cyan-600"> Complexa Demais.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A saúde moderna opera em um cenário de alta complexidade, com processos
            fragmentados, variabilidade clínica, pressão por eficiência, sobrecarga dos
            setores de qualidade e risco assistencial crescente.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 h-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-cyan-200 relative overflow-hidden">
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-cyan-100 flex items-center justify-center mb-6 group-hover:bg-cyan-500 transition-colors duration-300">
                    <problem.icon className="w-7 h-7 text-cyan-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1E3A5F] mb-4">
                    {problem.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why it matters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl">
            <p className="text-lg font-medium">
              Falhas de processo impactam diretamente{" "}
              <span className="font-bold">segurança do paciente</span>,{" "}
              <span className="font-bold">acreditação hospitalar</span>,{" "}
              <span className="font-bold">custos</span> e{" "}
              <span className="font-bold">sustentabilidade</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
