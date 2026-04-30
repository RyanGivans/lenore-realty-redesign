import { trpc } from "@/lib/trpc";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const mockPosts = [
  { id: 1, title: "Northwest Arkansas Real Estate Market Update: Spring 2025", excerpt: "A comprehensive look at current market conditions, pricing trends, and what buyers and sellers can expect in the coming months.", category: "Market Update", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80", publishedAt: new Date("2025-03-15"), slug: "nwa-market-update-spring-2025" },
  { id: 2, title: "Top 5 Neighborhoods to Watch in Bentonville", excerpt: "From the arts district to emerging suburban communities, these Bentonville neighborhoods are showing exceptional growth potential.", category: "Neighborhood Guide", imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", publishedAt: new Date("2025-02-28"), slug: "top-neighborhoods-bentonville" },
  { id: 3, title: "First-Time Homebuyer's Complete Guide to Arkansas", excerpt: "Everything you need to know about buying your first home in Arkansas, from financing options to closing costs.", category: "Buyer Tips", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", publishedAt: new Date("2025-02-10"), slug: "first-time-homebuyer-guide-arkansas" },
  { id: 4, title: "How to Price Your Home to Sell Fast in Today's Market", excerpt: "Strategic pricing is the single most important factor in selling your home quickly and for maximum value.", category: "Seller Tips", imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80", publishedAt: new Date("2025-01-20"), slug: "how-to-price-your-home" },
  { id: 5, title: "Investment Properties in Fayetteville: A Deep Dive", excerpt: "The University of Arkansas creates unique rental demand. Here's how to capitalize on Fayetteville's investment market.", category: "Investment", imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80", publishedAt: new Date("2025-01-05"), slug: "investment-properties-fayetteville" },
  { id: 6, title: "Understanding Home Inspections: What Every Buyer Must Know", excerpt: "A thorough home inspection can save you thousands. Learn what inspectors look for and how to interpret their findings.", category: "Buyer Tips", imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80", publishedAt: new Date("2024-12-18"), slug: "understanding-home-inspections" },
];

const categories = ["All", "Market Update", "Buyer Tips", "Seller Tips", "Neighborhood Guide", "Investment"];

export default function Blog() {
  const { data: dbPosts } = trpc.blog.getPublished.useQuery();
  const posts = (dbPosts && dbPosts.length > 0) ? dbPosts : mockPosts;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="relative pt-20" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", minHeight: "280px", display: "flex", alignItems: "center" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=30)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1 }} />
        <div className="container relative z-10 py-16">
          <p className="section-label mb-3">Insights & Advice</p>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "white" }}>Real Estate Blog</h1>
          <div className="gold-divider" style={{ marginTop: "1rem" }} />
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any, i: number) => (
            <div key={post.id || i} className="luxury-card group">
              <div className="relative overflow-hidden" style={{ height: "220px" }}>
                <img src={post.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80"}
                  alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4">
                  <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold" style={{ background: "#d4af37", color: "#1a1a1a", fontFamily: "Montserrat, sans-serif", letterSpacing: "0.05em" }}>
                    <Tag size={10} /> {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  <Calendar size={12} />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </div>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "0.75rem", lineHeight: 1.3 }}>
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                <button className="flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all" style={{ color: "#d4af37", fontFamily: "Montserrat, sans-serif" }}>
                  Read More <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
