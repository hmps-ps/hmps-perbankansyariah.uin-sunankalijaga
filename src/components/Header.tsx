// ============================================
// FILE: src/components/Header.tsx
// DESKRIPSI: Komponen Header/Navbar Website
// ============================================
// EDIT MENU NAVIGASI DI BAGIAN navLinks (baris 15-21)
// EDIT LOGO/NAMA ORGANISASI DI BAGIAN Link (baris 33-38)
// ============================================

import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase";
import { useDarkMode } from "@/hooks/use-dark-mode";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const { isDark, toggle, isMounted } = useDarkMode();

  // === EDIT MENU NAVIGASI DI SINI ===
  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Tentang Kami", path: "/about" },
    { name: "Divisi", path: "/divisi" },
    { name: "Berita", path: "/news" },
    { name: "Galeri", path: "/gallery" },
    { name: "Kontak", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const { data } = await supabase.from("footer_settings").select("logo_url").maybeSingle();
        if (data && (data as any).logo_url) setLogoUrl((data as any).logo_url);
      } catch (e) {
        // ignore
      }
    };
    fetchLogo();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* === LOGO / NAMA ORGANISASI (gunakan logo_url jika tersedia) === */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-shrink-0">
            {logoUrl ? (
              <img src={logoUrl} alt="HMPS Perbankan Syariah" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0" />
            ) : (
              <div className="flex items-center flex-shrink-0">
                <span className="text-lg sm:text-xl font-bold text-primary">HMPS</span>
                <span className="hidden xs:inline ml-1 sm:ml-2 text-lg sm:text-xl font-bold text-secondary">PS</span>
              </div>
            )}
            <div className="flex flex-col flex-shrink-0">
              <span className="text-sm sm:text-base font-semibold text-foreground leading-tight">HMPS</span>
              <span className="text-xs text-secondary font-medium">Perbankan Syariah</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isMounted && (
              <button
                onClick={toggle}
                className="p-2 mx-2 rounded-lg text-foreground hover:bg-muted transition-colors"
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
            <Link to="/admin/login">
              <Button variant="outline" size="sm" className="ml-4">
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile menu button + Dark mode */}
          <div className="flex md:hidden items-center gap-2">
            {isMounted && (
              <button
                onClick={toggle}
                className="p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-muted"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/admin/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                Admin
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
