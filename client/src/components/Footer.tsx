import { Link } from "wouter";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0d0d1a] text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-4">
              <span style={{ fontFamily: "Playfair Display, serif", fontSize: "1.4rem", fontWeight: 700, color: "#d4af37" }}>
                Lenore Cottrell
              </span>
              <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>
                Real Estate Professional
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Helping families find their perfect home with integrity, expertise, and a personal touch.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4af37", marginBottom: "1.25rem" }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[["Home", "/"], ["Properties", "/properties"], ["About", "/about"], ["Blog", "/blog"], ["Contact", "/contact"]].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-white/60 hover:text-gold transition-colors text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4af37", marginBottom: "1.25rem" }}>
              Services
            </h4>
            <ul className="space-y-2">
              {["Buyer Representation", "Seller Representation", "Investment Properties", "Relocation Services", "Market Analysis", "Home Valuation"].map((s) => (
                <li key={s} className="text-white/60 text-sm">{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4af37", marginBottom: "1.25rem" }}>
              Contact
            </h4>
            <div className="space-y-3">
              <a href="tel:+14795551234" className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors text-sm">
                <Phone size={14} className="text-gold shrink-0" />
                (479) 555-1234
              </a>
              <a href="mailto:lenore@lenorerealty.com" className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors text-sm">
                <Mail size={14} className="text-gold shrink-0" />
                lenore@lenorerealty.com
              </a>
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={14} className="text-gold shrink-0 mt-0.5" />
                Northwest Arkansas<br />Serving Bentonville, Rogers, Fayetteville
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Lenore Cottrell Real Estate. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Licensed Real Estate Agent · Arkansas · Equal Housing Opportunity
          </p>
        </div>
      </div>
    </footer>
  );
}
