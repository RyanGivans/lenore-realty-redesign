import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", inquiryType: "General" as const, message: "" });
  const [submitted, setSubmitted] = useState(false);
  const createLead = trpc.leads.create.useMutation({
    onSuccess: () => { setSubmitted(true); },
    onError: () => { toast.error("Something went wrong. Please try again."); },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email) { toast.error("Please fill in all required fields."); return; }
    createLead.mutate(form);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="relative pt-20" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", minHeight: "280px", display: "flex", alignItems: "center" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=30)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1 }} />
        <div className="container relative z-10 py-16">
          <p className="section-label mb-3">Get In Touch</p>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "white" }}>Contact Lenore</h1>
          <div className="gold-divider" style={{ marginTop: "1rem" }} />
        </div>
      </div>

      <div className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.6rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "1.5rem" }}>Let's Connect</h2>
            <p className="text-gray-600 leading-relaxed mb-8">Ready to take the next step? Reach out today for a free, no-obligation consultation.</p>
            <div className="space-y-6">
              {[
                { Icon: Phone, label: "Phone", value: "(479) 555-1234", href: "tel:+14795551234" },
                { Icon: Mail, label: "Email", value: "lenore@lenorerealty.com", href: "mailto:lenore@lenorerealty.com" },
                { Icon: MapPin, label: "Area", value: "Northwest Arkansas\nBentonville · Rogers · Fayetteville", href: null },
                { Icon: Clock, label: "Hours", value: "Mon–Fri: 8am–7pm\nSat–Sun: 9am–5pm", href: null },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Icon size={16} style={{ color: "#d4af37" }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#d4af37", marginBottom: "2px" }}>{label}</div>
                    {href ? (
                      <a href={href} className="text-gray-700 hover:text-gold transition-colors text-sm whitespace-pre-line">{value}</a>
                    ) : (
                      <p className="text-gray-700 text-sm whitespace-pre-line">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="text-center py-16">
                <CheckCircle size={60} className="mx-auto mb-4" style={{ color: "#d4af37" }} />
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.8rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "1rem" }}>Thank You!</h3>
                <p className="text-gray-600 max-w-md mx-auto">I have received your message and will be in touch within 24 hours. I look forward to helping you achieve your real estate goals.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-8 shadow-sm">
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "1.5rem" }}>Send a Message</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">First Name *</label>
                    <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">Last Name *</label>
                    <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors" placeholder="Smith" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">Email *</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors" placeholder="(479) 555-0000" />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">I am interested in</label>
                  <select value={form.inquiryType} onChange={e => setForm({ ...form, inquiryType: e.target.value as any })}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors">
                    <option value="Buy">Buying a Home</option>
                    <option value="Sell">Selling a Home</option>
                    <option value="Investment">Investment Properties</option>
                    <option value="General">General Inquiry</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">Message</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your real estate goals..." />
                </div>
                <button type="submit" disabled={createLead.isPending} className="btn-gold w-full" style={{ padding: "1rem" }}>
                  {createLead.isPending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
