import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { Users, Mail, Phone, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  New: "bg-blue-50 text-blue-700 border-blue-200",
  Contacted: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Qualified: "bg-green-50 text-green-700 border-green-200",
  Closed: "bg-gray-50 text-gray-600 border-gray-200",
};

export default function Admin() {
  const { user, loading } = useAuth();
  const { data: leads, refetch } = trpc.leads.getAll.useQuery(undefined, { enabled: user?.role === "admin" });
  const updateStatus = trpc.leads.updateStatus.useMutation({
    onSuccess: () => { toast.success("Status updated"); refetch(); },
    onError: () => toast.error("Failed to update status"),
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" /></div>;

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-gold" />
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.8rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "1rem" }}>Access Restricted</h2>
          <p className="text-gray-600 mb-6">This area is for authorized personnel only.</p>
          <Link href="/" className="btn-gold">Return Home</Link>
        </div>
      </div>
    );
  }

  const counts = { New: 0, Contacted: 0, Qualified: 0, Closed: 0 };
  leads?.forEach(l => { if (l.status && counts[l.status as keyof typeof counts] !== undefined) counts[l.status as keyof typeof counts]++; });

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-[#1a1a2e] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <span style={{ fontFamily: "Playfair Display, serif", fontSize: "1.2rem", fontWeight: 700, color: "#d4af37" }}>Lenore Realty</span>
          <span className="text-white/50 text-sm ml-3">Admin Dashboard</span>
        </div>
        <Link href="/" className="text-white/70 hover:text-gold text-sm transition-colors">Back to Site</Link>
      </div>

      <div className="container py-10">
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "2rem" }}>Lead Management</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "New Leads", count: counts.New, icon: AlertCircle, color: "#3b82f6" },
            { label: "Contacted", count: counts.Contacted, icon: Clock, color: "#d4af37" },
            { label: "Qualified", count: counts.Qualified, icon: CheckCircle, color: "#22c55e" },
            { label: "Closed", count: counts.Closed, icon: XCircle, color: "#6b7280" },
          ].map(({ label, count, icon: Icon, color }) => (
            <div key={label} className="bg-white border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500" style={{ fontFamily: "Montserrat, sans-serif" }}>{label}</span>
                <Icon size={18} style={{ color }} />
              </div>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", fontWeight: 700, color: "#1a1a2e" }}>{count}</div>
            </div>
          ))}
        </div>

        {/* Leads Table */}
        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.2rem", fontWeight: 700, color: "#1a1a2e" }}>All Inquiries</h2>
          </div>
          {!leads || leads.length === 0 ? (
            <div className="text-center py-16">
              <Users size={40} className="mx-auto mb-3 text-gray-300" />
              <p className="text-gray-500">No leads yet. They will appear here when customers submit the contact form.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {["Name", "Contact", "Type", "Message", "Date", "Status", "Actions"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider" style={{ fontFamily: "Montserrat, sans-serif" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-semibold text-sm text-gray-900">{lead.firstName} {lead.lastName}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-xs text-gray-600 hover:text-gold"><Mail size={11} />{lead.email}</a>
                          {lead.phone && <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-xs text-gray-600 hover:text-gold"><Phone size={11} />{lead.phone}</a>}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs px-2 py-1 rounded-full border" style={{ background: "rgba(212,175,55,0.1)", color: "#b8960c", borderColor: "rgba(212,175,55,0.3)", fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}>
                          {lead.inquiryType}
                        </span>
                      </td>
                      <td className="px-4 py-4 max-w-xs">
                        <p className="text-xs text-gray-500 truncate">{lead.message || "—"}</p>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-500 whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full border font-semibold ${statusColors[lead.status || "New"]}`} style={{ fontFamily: "Montserrat, sans-serif" }}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <select value={lead.status || "New"}
                          onChange={e => updateStatus.mutate({ id: lead.id, status: e.target.value as any })}
                          className="text-xs border border-gray-200 rounded px-2 py-1 focus:border-gold focus:outline-none">
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
