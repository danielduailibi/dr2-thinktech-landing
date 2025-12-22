/**
 * DR² ThinkTech Landing Page
 * Design: "Neural Pulse" - Tech Médico Futurista
 * 
 * Cores: Azul meia-noite (#0F1629), Ciano (#22D3EE), Branco
 * Tipografia: Montserrat (títulos), Inter (corpo)
 * Elementos: Redes neurais animadas, glassmorphism, glow effects
 */

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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F1629]">
      {/* Neural network background animation */}
      <NeuralBackground />
      
      {/* Fixed header */}
      <Header />
      
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
  );
}
