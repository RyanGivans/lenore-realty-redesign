import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBg = scrolled || !isHome
    ? "bg-[#1a1a2e]/95 backdrop-blur-md shadow-lg"
    : "bg-transparent";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="container">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex flex-col leading-none">
            <span style={{ fontFamily: "Playfair Display, serif", fontSize: "1.4rem", fontWeight: 700, color: "#d4af37", letterSpacing: "-0.02em" }}>
              Lenore Cottrell
            </span>
            <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>
              Real Estate Professional
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={`nav-link ${location === link.href ? "text-gold" : "text-white/80 hover:text-white"}`}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+14795551234" className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors" style={{ fontSize: "0.8rem" }}>
              <Phone size={14} />
              <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}>(479) 555-1234</span>
            </a>
            <Link href="/contact" className="btn-gold" style={{ padding: "0.6rem 1.5rem", fontSize: "0.7rem" }}>
              Get Started
            </Link>
          </div>
          <button className="lg:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden bg-[#1a1a2e] border-t border-white/10">
          <div className="container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={`nav-link py-2 ${location === link.href ? "text-gold" : "text-white/80"}`}
                onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-gold text-center mt-2" onClick={() => setMenuOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
