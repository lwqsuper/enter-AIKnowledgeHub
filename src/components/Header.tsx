import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "首页", href: "#hero" },
  { name: "AI知识", href: "#knowledge" },
  { name: "工具推荐", href: "#tools" },
  { name: "AGENT教程", href: "#agent" },
  { name: "RAG教程", href: "#rag" },
  { name: "学习资源", href: "#resources" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card">
      <nav className="section-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#hero");
            }}
            className="flex items-center gap-2 text-xl font-bold text-foreground hover:opacity-80 transition-opacity"
          >
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span>FUSE_TECH</span>
            <span className="text-primary">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            <Link 
              to="/admin" 
              className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium flex items-center gap-1"
            >
              <Settings className="w-4 h-4" />
              后台管理
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/50 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
              <Link 
                to="/admin" 
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium flex items-center gap-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="w-4 h-4" />
                后台管理
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
