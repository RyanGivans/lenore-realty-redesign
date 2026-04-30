import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Search, Bed, Bath, Square, MapPin, SlidersHorizontal } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const mockProperties = [
  { id: 1, title: "Luxury Lakefront Estate", price: "1250000", beds: 5, baths: 4, sqft: 4200, city: "Bentonville", state: "AR", address: "1234 Lakeview Dr", status: "Available", type: "Single Family", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", year: 2019 },
  { id: 2, title: "Modern Downtown Condo", price: "385000", beds: 2, baths: 2, sqft: 1450, city: "Fayetteville", state: "AR", address: "500 College Ave #12", status: "Available", type: "Condo", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", year: 2021 },
  { id: 3, title: "Charming Family Home", price: "525000", beds: 4, baths: 3, sqft: 2800, city: "Rogers", state: "AR", address: "789 Maple Street", status: "Available", type: "Single Family", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", year: 2015 },
  { id: 4, title: "Executive Golf Course Home", price: "875000", beds: 5, baths: 5, sqft: 5100, city: "Bentonville", state: "AR", address: "22 Fairway Blvd", status: "Pending", type: "Single Family", img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80", year: 2017 },
  { id: 5, title: "Cozy Starter Home", price: "265000", beds: 3, baths: 2, sqft: 1650, city: "Springdale", state: "AR", address: "415 Oak Lane", status: "Available", type: "Single Family", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80", year: 2008 },
  { id: 6, title: "Investment Duplex", price: "450000", beds: 4, baths: 4, sqft: 3200, city: "Fayetteville", state: "AR", address: "88 University Ave", status: "Available", type: "Multi-Family", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80", year: 2012 },
];

export default function Properties() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data: dbProps } = trpc.properties.getAll.useQuery();
  const allProps = (dbProps && dbProps.length > 0) ? dbProps.map(p => ({
    id: p.id, title: p.title, price: p.price || "0", beds: p.bedrooms || 0, baths: p.bathrooms || 0,
    sqft: p.squareFeet || 0, city: p.city || "", state: p.state || "", address: p.address || "",
    status: p.status || "Available", type: p.propertyType || "Single Family",
    img: p.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", year: p.yearBuilt || 2020
  })) : mockProperties;

  const filtered = allProps.filter(p => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.city.toLowerCase().includes(search.toLowerCase()) || p.address.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    const matchType = typeFilter === "All" || p.type === typeFilter;
    const matchPrice = !maxPrice || Number(p.price) <= Number(maxPrice);
    return matchSearch && matchStatus && matchType && matchPrice;
  });

  const formatPrice = (price: string) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(price));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Banner */}
      <div className="relative pt-20" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", minHeight: "280px", display: "flex", alignItems: "center" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=30)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1 }} />
        <div className="container relative z-10 py-16">
          <p className="section-label mb-3">Our Listings</p>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "white" }}>
            Available Properties
          </h1>
          <div className="gold-divider" style={{ marginTop: "1rem" }} />
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border-b border-gray-100 sticky top-20 z-30 shadow-sm">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by address, city, or name..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm text-sm focus:border-gold focus:outline-none" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-sm text-sm hover:border-gold transition-colors">
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>
          {showFilters && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:border-gold focus:outline-none">
                <option value="All">All Status</option>
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
              </select>
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:border-gold focus:outline-none">
                <option value="All">All Types</option>
                <option value="Single Family">Single Family</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Multi-Family">Multi-Family</option>
              </select>
              <input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max Price" type="number"
                className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:border-gold focus:outline-none" />
              <button onClick={() => { setSearch(""); setStatusFilter("All"); setTypeFilter("All"); setMaxPrice(""); }}
                className="text-sm text-gray-500 hover:text-gold transition-colors">Clear Filters</button>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container py-12">
        <p className="text-sm text-gray-500 mb-8" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Showing <strong>{filtered.length}</strong> properties
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((prop) => (
            <div key={prop.id} className="luxury-card group">
              <div className="relative overflow-hidden" style={{ height: "240px" }}>
                <img src={prop.img} alt={prop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4">
                  <span className={prop.status === "Available" ? "status-available" : prop.status === "Pending" ? "status-pending" : "status-sold"}>{prop.status}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                  <div style={{ background: "linear-gradient(135deg, #d4af37, #b8960c)", color: "white", fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "1rem", padding: "0.35rem 0.875rem", display: "inline-block" }}>
                    {formatPrice(prop.price)}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "0.5rem" }}>{prop.title}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-1"><MapPin size={12} /><span>{prop.address}</span></div>
                <div className="text-sm text-gray-400 mb-4">{prop.city}, {prop.state}</div>
                <div className="flex items-center gap-4 text-sm text-gray-600 pt-4 border-t border-gray-100">
                  <span className="flex items-center gap-1"><Bed size={13} /> {prop.beds} Beds</span>
                  <span className="flex items-center gap-1"><Bath size={13} /> {prop.baths} Baths</span>
                  <span className="flex items-center gap-1"><Square size={13} /> {prop.sqft.toLocaleString()} sqft</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#1a1a2e" }}>No properties found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
