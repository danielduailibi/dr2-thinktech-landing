import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Heart, 
  ClipboardCheck, 
  BarChart3, 
  Users, 
  Shield, 
  Globe,
  Stethoscope,
  Building2,
  FlaskConical
} from "lucide-react";

const solutions = [
  {
    icon: Heart,
    title: "Assistência, Qualidade e Governança",
    items: [
      "Suporte à decisão clínica com IA",
      "Otimização para acreditação hospitalar",
      "Auditoria clínica e análise de eventos adversos",
    ],
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: BarChart3,
    title: "Gestão Médica e Operacional",
    items: [
      "Otimização de escalas e força de trabalho",
      "Análise de carga assistencial e risco",
      "Apoio à tomada de decisão gerencial",
    ],
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Globe,
    title: "Estratégia para Operadoras e Indústria",
    items: [
      "Estratificação de risco populacional",
      "Análise de sinistralidade e Real World Data",
      "Farmacovigilância e suporte a estudos clínicos",
    ],
    color: "from-emerald-500 to-teal-600",
  },
];

const clients = [
  { icon: Building2, label: "Hospitais" },
  { icon: Shield, label: "Operadoras de Saúde" },
  { icon: FlaskConical, label: "Indústria Farmacêutica" },
  { icon: Stethoscope, label: "Gestão Médica" },
];

export default function SolutionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="solucoes" className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-6">
            Nossas Frentes de{" "}
            <span className="text-cyan-600">Atuação B2B</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Integramos Inteligência Artificial, ciência de dados e design de processos
            para apoiar decisões clínicas e organizacionais.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden">
                {/* Top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${solution.color}`} />
                
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <solution.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-[#1E3A5F] mb-4">
                  {solution.title}
                </h3>
                
                <ul className="space-y-3">
                  {solution.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clients */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-500 mb-8 text-sm uppercase tracking-wider font-medium">
            Atuamos com
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-md border border-gray-100"
              >
                <client.icon className="w-6 h-6 text-cyan-600" />
                <span className="text-[#1E3A5F] font-medium">{client.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
