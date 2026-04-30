import { Award, Users, TrendingUp, Heart, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const credentials = [
  "Licensed Arkansas Real Estate Agent",
  "Certified Residential Specialist (CRS)",
  "Accredited Buyer's Representative (ABR)",
  "Seller Representative Specialist (SRS)",
  "Top 1% of Agents in Northwest Arkansas",
  "Member of National Association of Realtors",
];

const values = [
  { icon: Heart, title: "Client-First Approach", desc: "Every decision I make is guided by what is best for my clients. Your goals are my priority." },
  { icon: Award, title: "Market Expertise", desc: "Deep knowledge of Northwest Arkansas neighborhoods, pricing trends, and investment opportunities." },
  { icon: Users, title: "Trusted Network", desc: "Access to a vast network of lenders, inspectors, contractors, and off-market listings." },
  { icon: TrendingUp, title: "Proven Results", desc: "Consistent track record of above-asking-price sales and below-asking-price purchases." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="relative pt-20" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", minHeight: "280px", display: "flex", alignItems: "center" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=30)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1 }} />
        <div className="container relative z-10 py-16">
          <p className="section-label mb-3">My Story</p>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "white" }}>About Lenore</h1>
          <div className="gold-divider" style={{ marginTop: "1rem" }} />
        </div>
      </div>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
                alt="Lenore Cottrell" className="w-full rounded-sm object-cover" style={{ height: "560px" }} />
              <div className="absolute -bottom-6 -right-6 bg-[#1a1a2e] p-8 text-center" style={{ minWidth: "160px" }}>
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: "2.5rem", fontWeight: 700, color: "#d4af37" }}>15+</div>
                <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>Years of Excellence</div>
              </div>
            </div>
            <div>
              <p className="section-label mb-4">Lenore Cottrell</p>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "#1a1a2e", marginBottom: "1.5rem" }}>
                Passionate About Helping Families Find Home
              </h2>
              <div className="gold-divider" style={{ marginBottom: "1.5rem" }} />
              <p className="text-gray-600 leading-relaxed mb-5">
                Born and raised in Northwest Arkansas, I have watched this region transform into one of the most vibrant and desirable places to live in the country. My deep roots in the community give me an unparalleled understanding of local neighborhoods, school districts, and market dynamics.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                After graduating from the University of Arkansas with a degree in Business, I launched my real estate career with a simple mission: to provide honest, expert guidance to every client — whether they are buying their first home or selling a multi-million dollar estate.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Over the past 15 years, I have helped more than 500 families and investors navigate the Arkansas real estate market, closing over $120 million in transactions. My approach combines data-driven strategy with genuine personal care for each client's unique situation.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {credentials.map((c, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle size={14} style={{ color: "#d4af37", marginTop: "3px", flexShrink: 0 }} />
                    <span className="text-sm text-gray-600">{c}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="btn-gold">Work With Me</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-cream">
        <div className="container">
          <div className="text-center mb-14">
            <p className="section-label">My Philosophy</p>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "#1a1a2e", marginTop: "0.75rem" }}>
              What Sets Me Apart
            </h2>
            <div className="gold-divider-center" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="text-center p-8 bg-white border border-gray-100 hover:border-gold/30 transition-all hover:shadow-lg">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5">
                  <v.icon size={24} style={{ color: "#d4af37" }} />
                </div>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "0.75rem" }}>{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-20 bg-[#1a1a2e]">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[["500+", "Homes Sold"], ["$120M+", "Total Volume"], ["98%", "Satisfaction Rate"], ["15+", "Years Experience"]].map(([num, label]) => (
              <div key={label}>
                <div className="stat-number">{num}</div>
                <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: "0.5rem" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="container max-w-2xl">
          <p className="section-label mb-4">Ready to Start?</p>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "#1a1a2e", marginBottom: "1.5rem" }}>
            Let's Achieve Your Real Estate Goals Together
          </h2>
          <div className="gold-divider-center" style={{ marginBottom: "1.5rem" }} />
          <p className="text-gray-600 mb-8 leading-relaxed">Schedule a free consultation and discover the difference that experience, dedication, and local expertise can make.</p>
          <Link href="/contact" className="btn-gold">Schedule Free Consultation</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
