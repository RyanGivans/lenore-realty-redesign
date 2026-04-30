import { useState, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Star, Home as HomeIcon, TrendingUp, Award, Users, ChevronDown, MapPin, Bed, Bath, Square } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const heroImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80",
];

const stats = [
  { number: "500+", label: "Homes Sold" },
  { number: "15+", label: "Years Experience" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "$120M+", label: "Total Sales Volume" },
];

const services = [
  { icon: Home, title: "Buyer Representation", desc: "Expert guidance through every step of your home purchase journey, from search to closing." },
  { icon: TrendingUp, title: "Seller Services", desc: "Strategic marketing and pricing to maximize your home's value and minimize time on market." },
  { icon: Award, title: "Investment Properties", desc: "Identify high-yield investment opportunities across Northwest Arkansas markets." },
  { icon: Users, title: "Relocation Services", desc: "Seamless transitions for families and professionals moving to the area." },
];

const testimonials = [
  { name: "Sarah & Michael Thompson", quote: "Lenore made our dream home a reality. Her market knowledge and negotiation skills saved us $30,000 off asking price. We couldn't be happier!", rating: 5, type: "Buyers" },
  { name: "Jennifer Davis", quote: "Sold my home in 6 days for 12% over asking price. Lenore's marketing strategy and staging advice were absolutely brilliant.", rating: 5, type: "Seller" },
  { name: "Robert & Lisa Chen", quote: "As out-of-state buyers, we were nervous about the process. Lenore guided us every step of the way with patience and expertise.", rating: 5, type: "Buyers" },
];

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const { data: featuredProps } = trpc.properties.getFeatured.useQuery();

  useEffect(() => {
    setVisible(true);
    const interval = setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 6000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: string | null) => {
    if (!price) return "Price on Request";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(price));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* HERO */}
      <section className="hero-section">
        {heroImages.map((img, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: heroIndex === i ? 1 : 0, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        ))}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,20,0.85) 0%, rgba(10,10,20,0.55) 60%, rgba(10,10,20,0.3) 100%)" }} />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p className="section-label mb-4">Northwest Arkansas Real Estate</p>
              <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, color: "white", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                Find Your<br />
                <span style={{ color: "#d4af37" }}>Perfect Home</span><br />
                in Arkansas
              </h1>
              <div className="gold-divider" style={{ width: "80px", height: "3px", marginBottom: "1.5rem" }} />
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: "520px", marginBottom: "2.5rem" }}>
                With over 15 years of expertise in Northwest Arkansas real estate, I help families and investors find exceptional properties and achieve outstanding results.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/properties" className="btn-gold">
                  View Properties
                </Link>
                <Link href="/contact" className="btn-outline-gold" style={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}>
                  Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
        <a href="#stats" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-gold transition-colors animate-float">
          <ChevronDown size={28} />
        </a>
        {/* Hero dots */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          {heroImages.map((_, i) => (
            <button key={i} onClick={() => setHeroIndex(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{ background: heroIndex === i ? "#d4af37" : "rgba(255,255,255,0.4)", width: heroIndex === i ? "24px" : "8px" }} />
          ))}
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className="py-16 bg-[#1a1a2e]">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="stat-number">{stat.number}</div>
                <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginTop: "0.5rem" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-24 bg-cream">
        <div className="container">
          <div className="text-center mb-14">
            <p className="section-label">Exclusive Listings</p>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, color: "#1a1a2e", marginTop: "0.75rem" }}>
              Featured Properties
            </h2>
            <div className="gold-divider-center" />
          </div>
          {featuredProps && featuredProps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProps.map((prop) => (
                <Link key={prop.id} href={`/properties`} className="luxury-card group block">
                  <div className="relative overflow-hidden" style={{ height: "240px" }}>
                    <img src={prop.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"}
                      alt={prop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4">
                      <span className={prop.status === "Available" ? "status-available" : prop.status === "Pending" ? "status-pending" : "status-sold"}>
                        {prop.status}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                      <div className="price-tag inline-block">{formatPrice(prop.price)}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.15rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "0.5rem" }}>
                      {prop.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                      <MapPin size={13} />
                      <span>{prop.address}, {prop.city}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      {prop.bedrooms && <span className="flex items-center gap-1"><Bed size={14} /> {prop.bedrooms} Beds</span>}
                      {prop.bathrooms && <span className="flex items-center gap-1"><Bath size={14} /> {prop.bathrooms} Baths</span>}
                      {prop.squareFeet && <span className="flex items-center gap-1"><Square size={14} /> {prop.squareFeet.toLocaleString()} sqft</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Luxury Lakefront Estate", price: "$1,250,000", beds: 5, baths: 4, sqft: 4200, city: "Bentonville, AR", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" },
                { title: "Modern Downtown Condo", price: "$385,000", beds: 2, baths: 2, sqft: 1450, city: "Fayetteville, AR", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" },
                { title: "Charming Family Home", price: "$525,000", beds: 4, baths: 3, sqft: 2800, city: "Rogers, AR", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80" },
              ].map((prop, i) => (
                <div key={i} className="luxury-card group">
                  <div className="relative overflow-hidden" style={{ height: "240px" }}>
                    <img src={prop.img} alt={prop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4"><span className="status-available">Available</span></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                      <div className="price-tag inline-block" style={{ background: "linear-gradient(135deg, #d4af37, #b8960c)", color: "white", fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "1.1rem", padding: "0.4rem 1rem" }}>{prop.price}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.15rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "0.5rem" }}>{prop.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-4"><MapPin size={13} /><span>{prop.city}</span></div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1"><Bed size={14} /> {prop.beds} Beds</span>
                      <span className="flex items-center gap-1"><Bath size={14} /> {prop.baths} Baths</span>
                      <span className="flex items-center gap-1"><Square size={14} /> {prop.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link href="/properties" className="btn-gold">
              View All Properties <ArrowRight size={16} className="inline ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <p className="section-label">What I Offer</p>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, color: "#1a1a2e", marginTop: "0.75rem" }}>
              Comprehensive Real Estate Services
            </h2>
            <div className="gold-divider-center" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((svc, i) => (
              <div key={i} className="text-center p-8 group hover:bg-[#1a1a2e] transition-all duration-500 rounded-sm border border-transparent hover:border-gold/20">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/20 transition-colors">
                  <svc.icon size={24} style={{ color: "#d4af37" }} />
                </div>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "0.75rem" }} className="group-hover:text-white transition-colors">
                  {svc.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-white/70 transition-colors">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENT INTRO */}
      <section className="py-24 bg-[#1a1a2e]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-4">About Lenore</p>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, color: "white", marginBottom: "1.5rem" }}>
                Your Trusted Real Estate Partner in Northwest Arkansas
              </h2>
              <div className="gold-divider" style={{ marginBottom: "1.5rem" }} />
              <p className="text-white/70 leading-relaxed mb-6">
                With over 15 years of experience in Northwest Arkansas real estate, I have built my reputation on trust, transparency, and exceptional results. My deep knowledge of the local market — from Bentonville to Fayetteville — ensures my clients always make informed decisions.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                Whether you are buying your first home, selling a luxury property, or building an investment portfolio, I bring the same level of dedication and expertise to every transaction.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[["500+", "Homes Sold"], ["$120M+", "Sales Volume"], ["15+", "Years Experience"], ["98%", "Satisfaction Rate"]].map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", fontWeight: 700, color: "#d4af37" }}>{num}</div>
                    <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}>{label}</div>
                  </div>
                ))}
              </div>
              <Link href="/about" className="btn-gold">Learn More About Me</Link>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
                alt="Lenore Cottrell" className="w-full rounded-sm object-cover" style={{ height: "500px" }} />
              <div className="absolute -bottom-6 -left-6 bg-gold p-6 text-[#1a1a2e]">
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", fontWeight: 700 }}>15+</div>
                <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-cream">
        <div className="container">
          <div className="text-center mb-14">
            <p className="section-label">Client Stories</p>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, color: "#1a1a2e", marginTop: "0.75rem" }}>
              What My Clients Say
            </h2>
            <div className="gold-divider-center" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="flex gap-1 mb-4" style={{ paddingTop: "1rem" }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} fill="#d4af37" color="#d4af37" />
                  ))}
                </div>
                <p className="text-white/80 leading-relaxed mb-6 text-sm">{t.quote}</p>
                <div>
                  <div style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, color: "white", fontSize: "0.9rem" }}>{t.name}</div>
                  <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", color: "#d4af37", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>{t.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%)", position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=40)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08 }} />
        <div className="container relative z-10 text-center">
          <p className="section-label mb-4">Ready to Begin?</p>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "white", marginBottom: "1.5rem" }}>
            Let's Find Your Dream Home
          </h2>
          <div className="gold-divider-center" style={{ marginBottom: "1.5rem" }} />
          <p className="text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
            Schedule a free consultation today and discover how I can help you achieve your real estate goals with confidence.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-gold">Schedule Free Consultation</Link>
            <Link href="/properties" className="btn-outline-gold">Browse Properties</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
