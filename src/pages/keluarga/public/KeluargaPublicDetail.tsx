import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Home,
  Users,
  PiggyBank,
  Wallet,
  HandCoins,
  Palmtree,
  Phone,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetKeluarga } from "@/networks/keluarga";
import { formatCurrency } from "@/lib/utils";
import EmptyState from "@/components/EmptyState";

const KeluargaPublicDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: keluargaList = [], isLoading } = useGetKeluarga();

  const keluarga = keluargaList.find(
    (k) => k.id_keluarga === Number(id),
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#145a3f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!keluarga) {
    return (
      <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center">
        <EmptyState
          icon={Home}
          title="Keluarga tidak ditemukan"
          description="Data keluarga yang Anda cari tidak tersedia."
          action={
            <Button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-[#0d3b2c] to-[#145a3f] text-white rounded-xl"
            >
              Kembali ke Beranda
            </Button>
          }
        />
      </div>
    );
  }

  const stats = [
    {
      title: "Total Simpanan",
      value: formatCurrency(keluarga.total_simpanan),
      icon: PiggyBank,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-800",
      valueColor: "text-emerald-800",
    },
    {
      title: "Pinjaman",
      value: formatCurrency(keluarga.total_pinjaman),
      icon: Wallet,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-800",
      valueColor: "text-amber-800",
    },
    {
      title: "Sumb. Sukarela",
      value: formatCurrency(keluarga.total_sukarela),
      icon: HandCoins,
      iconBg: "bg-teal-50",
      iconColor: "text-teal-800",
      valueColor: "text-teal-800",
    },
    {
      title: "Tab. Liburan",
      value: formatCurrency(keluarga.total_tabungan_liburan),
      icon: Palmtree,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-800",
      valueColor: "text-blue-800",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#0d3b2c] via-[#145a3f] to-[#1a6b50]">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.15)_0%,transparent_70%)]" />
        <div className="absolute -bottom-40 -left-24 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)]" />

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="kp-diag-kd"
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
          <rect width="100%" height="100%" fill="url(#kp-diag-kd)" />
        </svg>

        {/* Back button */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="group text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
          >
            <ChevronLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Kembali ke Beranda
          </Button>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-6 pb-20 md:pt-8 md:pb-24">
          <div className="kp-fade-up flex flex-col md:flex-row items-center md:items-start gap-7">
            {/* Family Icon */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center shadow-2xl bg-[#c9a84c] font-serif">
                <Home className="w-10 h-10 md:w-12 md:h-12 text-[#0d3b2c]" />
              </div>
            </div>

            {/* Info */}
            <div className="text-center md:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#c9a84c]/70 mb-2">
                Keluarga
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight font-serif">
                {keluarga.nama_kepala_keluarga}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-white/10 text-white/80">
                  <Users className="w-3.5 h-3.5" />
                  {keluarga.anggota.length} Anggota
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 -mt-10 pb-16 space-y-10">
        {/* Financial Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className={`kp-scale-in kp-d${index + 1} bg-white rounded-2xl p-5 shadow-sm border border-[#e7e5e0] hover:shadow-md transition-all duration-300`}
            >
              <div
                className={`w-9 h-9 rounded-xl ${stat.iconBg} flex items-center justify-center mb-3`}
              >
                <stat.icon className={`w-[18px] h-[18px] ${stat.iconColor}`} />
              </div>
              <p
                className={`text-lg md:text-xl font-bold font-serif truncate ${stat.valueColor}`}
              >
                {stat.value}
              </p>
              <span className="text-[10px] font-semibold uppercase tracking-wider mt-1 block text-[#78716c]">
                {stat.title}
              </span>
            </div>
          ))}
        </div>

        {/* Member List */}
        <section className="kp-fade-up kp-d5">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-xl font-bold text-[#1c1917] font-serif">
              Anggota Keluarga
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#c9a84c]/10 text-[#92400e] text-xs font-semibold">
              <Users className="w-3 h-3" />
              {keluarga.anggota.length} orang
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {keluarga.anggota.map((member) => {
              const initials = member.nama
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();
              const isActive =
                member.status?.toLowerCase() === "aktif";

              return (
                <div
                  key={member.id}
                  className="group cursor-pointer bg-white rounded-2xl p-5 shadow-sm border border-[#e7e5e0] hover:shadow-md hover:border-[#c9a84c]/30 transition-all duration-300"
                  onClick={() => navigate(`/anggota/${member.id}`)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0d3b2c] to-[#145a3f] flex items-center justify-center text-sm font-bold text-[#c9a84c] shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-[#1c1917] truncate group-hover:text-[#145a3f] transition-colors">
                          {member.nama}
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
                              isActive
                                ? "bg-emerald-500"
                                : "bg-amber-500"
                            }`}
                          />
                          {member.status}
                        </span>
                      </div>
                      {member.no_telepon && member.no_telepon !== "-" && (
                        <p className="text-xs text-[#a8a29e] flex items-center gap-1.5 mt-1">
                          <Phone className="w-3 h-3" />
                          {member.no_telepon}
                        </p>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#d6d3d1] group-hover:text-[#c9a84c] transition-colors shrink-0" />
                  </div>

                  {/* Member financials */}
                  <div className="grid grid-cols-4 gap-3 pt-3 border-t border-[#e7e5e0]">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#a8a29e] mb-0.5">
                        Simpanan
                      </p>
                      <p className="text-xs font-bold text-emerald-800">
                        {formatCurrency(member.total_simpanan)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#a8a29e] mb-0.5">
                        Pinjaman
                      </p>
                      <p className="text-xs font-bold text-amber-800">
                        {formatCurrency(member.jumlah_pinjaman)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#a8a29e] mb-0.5">
                        Sukarela
                      </p>
                      <p className="text-xs font-bold text-teal-800">
                        {formatCurrency(member.jumlah_sukarela)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#a8a29e] mb-0.5">
                        Liburan
                      </p>
                      <p className="text-xs font-bold text-blue-800">
                        {formatCurrency(member.jumlah_tabungan_liburan)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e7e5e0] py-8 text-center bg-[#f7f5f0]">
        <p className="text-sm text-[#a8a29e] font-serif">
          Koperasi Sejahtera Bersama
        </p>
        <p className="text-xs mt-1 text-[#d6d3d1]">
          Halaman informasi keluarga
        </p>
      </footer>
    </div>
  );
};

export default KeluargaPublicDetail;
