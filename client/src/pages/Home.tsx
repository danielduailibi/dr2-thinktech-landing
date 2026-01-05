/**
 * DR² ThinkTech Landing Page
 * Design: "Neural Pulse" - Tech Médico Futurista
 * 
 * Cores: Azul meia-noite (#0F1629), Ciano (#22D3EE), Branco
 * Tipografia: Montserrat (títulos), Inter (corpo)
 * Elementos: Redes neurais animadas, glassmorphism, glow effects
 */

import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import NeuralBackground from "@/components/NeuralBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import AboutSection from "@/components/AboutSection";
import SolutionsSection from "@/components/SolutionsSection";
import MethodSection from "@/components/MethodSection";
import DifferentialsSection from "@/components/DifferentialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import IntroVideo from "@/components/IntroVideo";

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Verificar se o usuário já viu o vídeo nesta sessão
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("dr2_intro_seen");
    if (hasSeenIntro === "true") {
      // Já viu o vídeo, mostrar landing page diretamente
      setShowIntro(false);
      setIntroComplete(true);
    } else {
      // Não viu o vídeo, mostrar vídeo de introdução
      setShowIntro(true);
      setIntroComplete(false);
    }
    setIsReady(true);
  }, []);

  const handleVideoEnd = () => {
    sessionStorage.setItem("dr2_intro_seen", "true");
    setShowIntro(false);
    setIntroComplete(true);
  };

  // Não renderizar nada até verificar o sessionStorage
  if (!isReady) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Intro Video - Mostrar apenas se não viu ainda */}
      {showIntro && <IntroVideo onVideoEnd={handleVideoEnd} />}

      {/* Main Content - Mostrar apenas após intro completar */}
      {introComplete && (
        <div className="min-h-screen bg-[#0F1629]">
          {/* SEO Content - Visually hidden but accessible to search engines */}
          <div className="sr-only" aria-hidden="false">
            <h1>DR² ThinkTech - Inteligência Estratégica para a Saúde</h1>
            <p>
              A DR² ThinkTech é uma empresa de tecnologia especializada em Inteligência Artificial 
              aplicada à saúde. Fundada por médicos, desenvolvemos soluções que integram IA, 
              ciência de dados e design de processos para apoiar decisões clínicas e organizacionais 
              com método, ética e impacto real.
            </p>
            <h2>Nossos Serviços</h2>
            <ul>
              <li>Otimização Clínica e Assistencial - Suporte à decisão com IA, padronização de protocolos e análise de desfechos</li>
              <li>Qualidade, Segurança e Governança - Estruturação de programas de acreditação e auditoria clínica baseada em dados</li>
              <li>Inteligência para Gestão e Operações - Análise de risco populacional, otimização de escalas e planejamento de força de trabalho</li>
            </ul>
            <h2>Nosso Método</h2>
            <ol>
              <li>Diagnóstico - Mapeamento profundo de processos, fluxos, riscos e gargalos organizacionais</li>
              <li>Prova de Conceito - Validação da viabilidade técnica e clínica com dados reais</li>
              <li>Prototipagem - Construção de soluções utilizáveis com envolvimento iterativo dos usuários</li>
              <li>Implementação - Integração à rotina, treinamento de equipes e monitoramento contínuo</li>
              <li>Escala - Expansão para outras áreas e organizações parceiras</li>
            </ol>
            <h2>Por Que Escolher a DR² ThinkTech?</h2>
            <ul>
              <li>Criada e liderada por médicos - Falamos a sua língua</li>
              <li>Conhecimento profundo da realidade - Nossas soluções nascem da prática</li>
              <li>Foco em método, não em modismos - Rigor científico e validação real</li>
              <li>Parceiros estratégicos, não fornecedores - Do problema real à solução implementada</li>
            </ul>
            <h2>Contato</h2>
            <p>Email: contato@dr2think.com</p>
            <p>Website: www.dr2think.com</p>
            <address>
              DR² ThinkTech - Innovation & Intelligence
              Empresa de Tecnologia em Saúde
              Inteligência Artificial para Organizações de Saúde
            </address>
          </div>

          {/* Schema.org JSON-LD for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "DR² ThinkTech",
                "alternateName": "DR2 ThinkTech",
                "url": "https://www.dr2think.com",
                "logo": "https://www.dr2think.com/images/logo-symbol.png",
                "description": "Empresa de tecnologia especializada em Inteligência Artificial aplicada à saúde. Fundada por médicos, desenvolvemos soluções que integram IA, ciência de dados e design de processos.",
                "email": "contato@dr2think.com",
                "sameAs": [
                  "https://www.linkedin.com/company/dr2thinktech",
                  "https://www.instagram.com/dr2thinktech"
                ],
                "foundingDate": "2024",
                "founders": [
                  {
                    "@type": "Person",
                    "name": "Fundadores Médicos"
                  }
                ],
                "knowsAbout": [
                  "Inteligência Artificial",
                  "Saúde",
                  "Tecnologia Médica",
                  "Ciência de Dados",
                  "Otimização de Processos Hospitalares",
                  "Acreditação Hospitalar",
                  "Gestão em Saúde"
                ],
                "areaServed": {
                  "@type": "Country",
                  "name": "Brasil"
                },
                "serviceType": [
                  "Consultoria em IA para Saúde",
                  "Otimização Clínica",
                  "Gestão Hospitalar",
                  "Análise de Dados em Saúde"
                ]
              })
            }}
          />

          {/* Service Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Consultoria em Inteligência Artificial para Saúde",
                "provider": {
                  "@type": "Organization",
                  "name": "DR² ThinkTech"
                },
                "areaServed": "Brasil",
                "description": "Diagnóstico estratégico, implementação de IA e otimização de processos para organizações de saúde",
                "offers": {
                  "@type": "Offer",
                  "name": "Diagnóstico Estratégico",
                  "description": "Mapeamento profundo de processos, fluxos, riscos e gargalos organizacionais"
                }
              })
            }}
          />

          {/* Neural network background animation */}
          <NeuralBackground />
          
          {/* Fixed header with auth */}
          <Header user={user} isAuthenticated={isAuthenticated} logout={logout} />
          
          {/* Main content */}
          <main>
            <HeroSection />
            <ProblemSection />
            <AboutSection />
            <SolutionsSection />
            <MethodSection />
            <DifferentialsSection />
            <CTASection />
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
}
