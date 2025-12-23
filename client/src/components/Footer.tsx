import { Linkedin, Instagram, Mail } from "lucide-react";

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/company/dr2thinktech", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/dr2thinktech", label: "Instagram" },
  { icon: Mail, href: "mailto:contato@dr2think.com", label: "Email" },
];

const footerLinks = [
  {
    title: "Soluções",
    links: [
      { label: "Assistência Clínica", href: "#solucoes" },
      { label: "Gestão Operacional", href: "#solucoes" },
      { label: "Estratégia B2B", href: "#solucoes" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Quem Somos", href: "#quem-somos" },
      { label: "Nosso Método", href: "#metodo" },
      { label: "Diferenciais", href: "#diferenciais" },
    ],
  },
  {
    title: "Contato",
    links: [
      { label: "Agendar Diagnóstico", href: "#contato" },
      { label: "contato@dr2think.com", href: "mailto:contato@dr2think.com" },
      { label: "www.dr2think.com", href: "https://www.dr2think.com" },
    ],
  },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-[#0A0F1C] border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="/images/logo-symbol.png"
              alt="DR² ThinkTech"
              className="h-16 w-auto mb-6"
            />
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              Inteligência Estratégica para a Saúde. Da Complexidade à Clareza.
              Decisão clínica, eficiência operacional e qualidade com método, ética e impacto real.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href.startsWith("#") ? (
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} DR² ThinkTech. Todos os direitos reservados.
            </p>
            <p className="text-gray-500 text-sm">
              Innovation & Intelligence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
