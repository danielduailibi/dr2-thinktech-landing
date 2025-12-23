import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Mail, Building, User, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success("Mensagem enviada com sucesso!", {
      description: "Entraremos em contato em breve para agendar seu diagnóstico estratégico.",
    });
    
    setFormData({ name: "", email: "", company: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contato" className="py-24 bg-[#0F1629] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full filter blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img
                src="/images/logo-symbol.png"
                alt="DR² ThinkTech"
                className="h-20 w-auto"
              />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Que tal transformar seus processos em{" "}
              <span className="text-gradient-cyan">decisões inteligentes utilizando IA?</span>
            </h2>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Agende um <span className="text-cyan-400 font-semibold">Diagnóstico Estratégico</span> para
              mapearmos juntos as oportunidades de aplicação de inteligência em sua organização.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <User className="w-4 h-4 text-cyan-400" />
                    Nome Completo
                  </label>
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    E-mail Corporativo
                  </label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>
              </div>

              {/* Company */}
              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Building className="w-4 h-4 text-cyan-400" />
                  Organização
                </label>
                <Input
                  type="text"
                  placeholder="Nome da sua organização"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                />
              </div>

              {/* Message */}
              <div className="space-y-2 mb-8">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  Como podemos ajudar?
                </label>
                <Textarea
                  placeholder="Descreva brevemente seu desafio ou área de interesse..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20 resize-none"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#0F1629] font-semibold py-6 text-lg rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] group disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    Solicitar Diagnóstico Estratégico
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-500">
              Ou entre em contato diretamente:{" "}
              <a
                href="mailto:contato@dr2think.com"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                contato@dr2think.com
              </a>
            </p>
            <p className="text-gray-500 mt-2">
              <a
                href="https://www.dr2think.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                www.dr2think.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
