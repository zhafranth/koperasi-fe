import { useState } from "react";
import ChartKoperasi from "@/components/ChartsKoperasi";
import { Button } from "@/components/ui/button";
import {
  Users,
  Wallet,
  PiggyBank,
  BadgeDollarSign,
  TrendingUp,
  Building2,
  CheckCircle2,
  Search,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetAnggota } from "@/networks/anggota";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: anggotaList = [] } = useGetAnggota();

  const filteredAnggota = anggotaList.filter((anggota) =>
    anggota.nama.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      {/* Hero Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#0d3b2c] via-[#145a3f] to-[#1a6b50]">
        {/* Decorative orbs */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.15)_0%,transparent_70%)]" />
        <div className="absolute -bottom-40 -left-24 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)]" />

        {/* Diagonal line pattern */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="kp-diag"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="40"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#kp-diag)" />
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-20 md:pt-16 md:pb-24">
          <div className="kp-fade-up flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#c9a84c] flex items-center justify-center shadow-lg">
                <Building2 className="w-5 h-5 text-[#0d3b2c]" />
              </div>
              <h1 className="text-xl font-bold text-white font-serif">
                Koperasi Sejahtera
              </h1>
            </div>
            <Button
              className="bg-[#c9a84c] hover:bg-[#b8983f] text-[#0d3b2c] font-semibold px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate("/login")}
            >
              <Users className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>

          <div className="kp-fade-up kp-d2 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight font-serif">
              Dashboard Koperasi
            </h2>
            <p className="text-white/50 text-base">
              Pantau perkembangan koperasi secara real-time. Data keuangan,
              anggota, dan transaksi dalam satu tampilan.
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 -mt-10 pb-16 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Total Anggota",
              value: "150",
              subtitle: "Aktif: 150 orang",
              icon: Users,
              iconBg: "bg-emerald-50",
              iconColor: "text-emerald-800",
              valueColor: "text-emerald-800",
              delay: "kp-d1",
            },
            {
              title: "Total Kas",
              value: formatCurrency(50000000),
              subtitle: "+20% dari bulan lalu",
              icon: Wallet,
              iconBg: "bg-[#c9a84c]/10",
              iconColor: "text-[#92400e]",
              valueColor: "text-[#92400e]",
              delay: "kp-d2",
            },
            {
              title: "Total Pinjaman",
              value: formatCurrency(35000000),
              subtitle: "10 pinjaman aktif",
              icon: BadgeDollarSign,
              iconBg: "bg-amber-50",
              iconColor: "text-amber-800",
              valueColor: "text-amber-800",
              delay: "kp-d3",
            },
            {
              title: "Total Simpanan",
              value: formatCurrency(45000000),
              subtitle: "Dari 120 anggota",
              icon: PiggyBank,
              iconBg: "bg-blue-50",
              iconColor: "text-blue-800",
              valueColor: "text-blue-800",
              delay: "kp-d4",
            },
          ].map((stat) => (
            <div
              key={stat.title}
              className={`kp-scale-in ${stat.delay} bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-[#e7e5e0]`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-11 h-11 rounded-xl ${stat.iconBg} flex items-center justify-center`}
                >
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78716c]">
                  {stat.title}
                </span>
              </div>
              <p className={`text-2xl font-bold ${stat.valueColor}`}>
                {stat.value}
              </p>
              <p className="text-xs mt-2 text-[#a8a29e] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {stat.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Chart + Payments */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Chart */}
          <div className="lg:col-span-3 kp-fade-up kp-d5">
            <ChartKoperasi />
          </div>

          {/* Pembayaran */}
          <div className="lg:col-span-2 kp-fade-up kp-d6">
            <div className="bg-white rounded-2xl shadow-sm border border-[#e7e5e0] h-full flex flex-col">
              <div className="px-6 py-5 border-b border-[#e7e5e0]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-emerald-800" />
                  </div>
                  <h3 className="text-base font-bold text-[#1c1917]">
                    Pembayaran Iuran
                  </h3>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {[
                  {
                    name: "Ahmad Dahlan",
                    date: "5 Januari 2024",
                    amount: 100000,
                  },
                  {
                    name: "Budi Santoso",
                    date: "3 Januari 2024",
                    amount: 100000,
                  },
                  {
                    name: "Citra Dewi",
                    date: "2 Januari 2024",
                    amount: 100000,
                  },
                  {
                    name: "David Wijaya",
                    date: "1 Januari 2024",
                    amount: 100000,
                  },
                ].map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-6 py-4 hover:bg-stone-50/60 transition-colors"
                    style={{
                      borderBottom: index < 3 ? "1px solid #e7e5e0" : "none",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-xs font-bold text-emerald-800">
                        {payment.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#1c1917]">
                          {payment.name}
                        </p>
                        <p className="text-xs text-[#a8a29e]">{payment.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-emerald-700">
                        +{formatCurrency(payment.amount)}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Lunas
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Anggota List */}
        <div className="kp-fade-up kp-d3">
          <div className="bg-white rounded-2xl shadow-sm border border-[#e7e5e0] overflow-hidden">
            {/* Section Header */}
            <div className="px-6 py-5 border-b border-[#e7e5e0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Users className="w-4 h-4 text-emerald-800" />
                </div>
                <h3 className="text-base font-bold text-[#1c1917]">
                  Daftar Anggota
                </h3>
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a8a29e]" />
                <input
                  type="text"
                  placeholder="Cari anggota..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#e7e5e0] bg-[#f7f5f0] text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#145a3f] focus:ring-1 focus:ring-[#145a3f]/20 transition-colors"
                />
              </div>
            </div>

            {/* Anggota Cards Grid */}
            <div className="p-6">
              {filteredAnggota.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-2xl bg-[#f7f5f0] flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-[#a8a29e]" />
                  </div>
                  <p className="text-sm text-[#78716c]">
                    {searchQuery
                      ? "Tidak ada anggota yang ditemukan"
                      : "Belum ada data anggota"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAnggota.map((anggota, index) => {
                    const delays = [
                      "kp-d1",
                      "kp-d2",
                      "kp-d3",
                      "kp-d4",
                      "kp-d5",
                      "kp-d6",
                    ];
                    const initials = anggota.nama
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase();
                    const isActive = anggota.status?.toLowerCase() === "aktif";

                    return (
                      <div
                        key={anggota.id}
                        className={`kp-scale-in ${delays[Math.min(index, 5)]} group cursor-pointer rounded-xl border border-[#e7e5e0] p-4 hover:shadow-md hover:border-[#c9a84c]/40 transition-all duration-300 bg-white`}
                        onClick={() => navigate(`/anggota/${anggota.id}`)}
                      >
                        <div className="flex items-center gap-3">
                          {/* Avatar */}
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0d3b2c] to-[#145a3f] flex items-center justify-center text-xs font-bold text-[#c9a84c] shrink-0">
                            {initials}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-sm text-[#1c1917] truncate">
                                {anggota.nama}
                              </p>
                              <span
                                className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                                  isActive
                                    ? "text-emerald-800 bg-emerald-50"
                                    : "text-amber-800 bg-amber-50"
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    isActive ? "bg-emerald-500" : "bg-amber-500"
                                  }`}
                                />
                                {anggota.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                              <Users className="w-3 h-3 text-[#a8a29e]" />
                              <p className="text-xs text-[#a8a29e]">
                                {`Keluarga ${anggota?.nama_kepala_keluarga || "-"}`}
                              </p>
                            </div>
                          </div>

                          {/* Arrow */}
                          <ChevronRight className="w-4 h-4 text-[#d6d3d1] group-hover:text-[#c9a84c] transition-colors shrink-0" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e7e5e0] py-8 text-center bg-[#f7f5f0]">
        <p className="text-sm text-[#a8a29e] font-serif">
          Koperasi Sejahtera Bersama
        </p>
        <p className="text-xs mt-1 text-[#d6d3d1]">
          Dashboard ringkasan koperasi
        </p>
      </footer>
    </div>
  );
};

export default Home;
