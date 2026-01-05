import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";

const navLinks = [
  { href: "#problema", label: "O Problema" },
  { href: "#quem-somos", label: "Quem Somos" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#metodo", label: "Método" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#contato", label: "Contato" },
];

interface HeaderProps {
  user?: {
    id: number;
    name: string | null;
    email: string | null;
  } | null;
  isAuthenticated?: boolean;
  logout?: () => Promise<void>;
}

export default function Header({ user, isAuthenticated, logout }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    window.location.href = getLoginUrl();
  };

  const handleLogout = async () => {
    if (logout) {
      await logout();
      window.location.reload();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0F1629]/90 backdrop-blur-lg border-b border-cyan-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo - Maior e mais visível */}
          <a href="#" className="flex items-center group">
            <img
              src="/images/logo-symbol.png"
              alt="DR² ThinkTech Logo"
              className="h-16 md:h-20 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Login Button - Lado direito */}
          <div className="hidden lg:flex items-center">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <User size={18} className="text-cyan-400" />
                  <span className="text-sm">{user.name || user.email || "Usuário"}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400"
                >
                  <LogOut size={16} className="mr-2" />
                  Sair
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleLogin}
                className="bg-cyan-500 hover:bg-cyan-400 text-[#0F1629] font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              >
                <LogIn size={16} className="mr-2" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-cyan-400 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0F1629]/95 backdrop-blur-lg border-t border-cyan-500/10"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-gray-300 hover:text-cyan-400 py-2 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              
              {/* Mobile Auth Buttons */}
              {isAuthenticated && user ? (
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-cyan-500/10">
                  <div className="flex items-center gap-2 text-gray-300">
                    <User size={18} className="text-cyan-400" />
                    <span className="text-sm">{user.name || user.email || "Usuário"}</span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sair
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleLogin}
                  className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-[#0F1629] font-semibold"
                >
                  <LogIn size={16} className="mr-2" />
                  Login
                </Button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
