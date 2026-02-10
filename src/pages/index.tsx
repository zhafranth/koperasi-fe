import { useMemo, useState } from "react";
import ChartKoperasi from "@/components/ChartsKoperasi";
import { Button } from "@/components/ui/button";
import {
  Users,
  PiggyBank,
  BadgeDollarSign,
  HandCoins,
  Palmtree,
  TrendingUp,
  Building2,
  Search,
  ChevronRight,
  CalendarDays,
  Clock,
  Sparkles,
  Home as HomeIcon,
  Heart,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";
import { useGetAnggota } from "@/networks/anggota";
import { useGetEvents } from "@/networks/event";
import { useGetTransaksiTotal } from "@/networks/transaksi";
import { useGetKeluarga } from "@/networks/keluarga";
import EmptyState from "@/components/EmptyState";
import ModalDetailEvent from "./dashboard/_components/ModalDetailEvent";
import type { EventProps } from "@/api/event/event.interface";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

const KATEGORI_COLOR: Record<string, string> = {
  rapat: "text-blue-800 bg-blue-50",
  pelatihan: "text-[#92400e] bg-[#c9a84c]/10",
  sosial: "text-emerald-800 bg-emerald-50",
  silaturahmi: "text-rose-800 bg-rose-50",
  olahraga: "text-cyan-800 bg-cyan-50",
  pendidikan: "text-indigo-800 bg-indigo-50",
  kesehatan: "text-pink-800 bg-pink-50",
  keagamaan: "text-teal-800 bg-teal-50",
  musyawarah: "text-violet-800 bg-violet-50",
  penggalangan_dana: "text-orange-800 bg-orange-50",
};

const KATEGORI_LABEL: Record<string, string> = {
  rapat: "Rapat",
  pelatihan: "Pelatihan",
  sosial: "Sosial",
  silaturahmi: "Silaturahmi",
  olahraga: "Olahraga",
  pendidikan: "Pendidikan",
  kesehatan: "Kesehatan",
  keagamaan: "Keagamaan",
  musyawarah: "Musyawarah",
  penggalangan_dana: "Penggalangan Dana",
};

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventProps | null>(null);
  const { data: anggotaList = [] } = useGetAnggota();
  const { data: events = [] } = useGetEvents();
  const { data: totalData } = useGetTransaksiTotal();
  const { data: keluargaList = [] } = useGetKeluarga();

  const stats = useMemo(() => {
    const d = totalData;
    return [
      {
        title: "Total Anggota",
        value: String(d?.total_anggota || 0),
        icon: Users,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-800",
        valueColor: "text-emerald-800",
        delay: "kp-d1",
        info: "Jumlah anggota aktif terdaftar",
      },
      {
        title: "Jumlah Dana",
        value: formatCurrency(d?.jumlah_dana || 0),
        icon: PiggyBank,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-800",
        valueColor: "text-emerald-800",
        delay: "kp-d2",
        info: "Total simpanan wajib + infaq masuk + sukarela + cicilan + tab. liburan",
      },
      {
        title: "Jumlah Pinjaman",
        value: formatCurrency(d?.jumlah_pinjaman || 0),
        icon: BadgeDollarSign,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-800",
        valueColor: "text-amber-800",
        delay: "kp-d3",
        info: "Total pinjaman berstatus proses",
      },
      {
        title: "Total Dana",
        value: formatCurrency(d?.total_dana || 0),
        icon: TrendingUp,
        iconBg: "bg-[#c9a84c]/10",
        iconColor: "text-[#92400e]",
        valueColor: "text-[#92400e]",
        delay: "kp-d4",
        info: "Dana bersih setelah dikurangi penarikan dan pinjaman",
        isHighlight: true,
      },
    ];
  }, [totalData]);

  const danaKoperasi = useMemo(() => {
    const d = totalData;
    return [
      {
        title: "Simpanan Sukarela",
        value: formatCurrency(d?.jumlah_simpanan_sukarela || 0),
        icon: HandCoins,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-800",
        valueColor: "text-blue-800",
        info: "Simpanan sukarela − penarikan sukarela",
      },
      {
        title: "Infaq",
        value: formatCurrency(d?.jumlah_infaq || 0),
        icon: Heart,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-800",
        valueColor: "text-rose-800",
        info: "Infaq masuk − penarikan infaq",
      },
      {
        title: "Tab. Liburan",
        value: formatCurrency(d?.jumlah_tabungan_liburan || 0),
        icon: Palmtree,
        iconBg: "bg-teal-50",
        iconColor: "text-teal-800",
        valueColor: "text-teal-800",
        info: "Tabungan liburan − penarikan liburan",
      },
    ];
  }, [totalData]);

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
        {/* Stats Cards - Main Row */}
        <div className="space-y-3">
          <div className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory lg:snap-none lg:grid lg:grid-cols-4 scrollbar-hide">
            {stats.map((stat) => {
              const isHighlight = stat.isHighlight;
              return (
                <div
                  key={stat.title}
                  className={`kp-scale-in ${stat.delay} snap-start relative min-w-[170px] flex-shrink-0 lg:min-w-0 rounded-2xl p-4 pb-5 transition-all duration-300 overflow-hidden ${
                    isHighlight
                      ? "bg-gradient-to-br from-[#0d3b2c] via-[#145a3f] to-[#0d3b2c] shadow-lg shadow-[#0d3b2c]/25 border border-[#1a6b50]/30"
                      : "bg-white border border-[#e7e5e0] shadow-sm hover:shadow-md hover:border-[#c9a84c]/30"
                  }`}
                >
                  {isHighlight && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                  )}
                  <div className="relative flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isHighlight ? "bg-[#c9a84c]/15" : stat.iconBg
                      }`}
                    >
                      <stat.icon
                        className={`w-[18px] h-[18px] ${
                          isHighlight ? "text-[#c9a84c]" : stat.iconColor
                        }`}
                      />
                    </div>
                    <div className="group/info relative">
                      <Info
                        className={`w-3.5 h-3.5 cursor-help ${
                          isHighlight ? "text-white/30 hover:text-white/60" : "text-[#d6d3d1] hover:text-[#a8a29e]"
                        } transition-colors`}
                      />
                      <div className="absolute bottom-full right-0 mb-1.5 hidden group-hover/info:block z-20 pointer-events-none">
                        <div className="bg-[#1c1917] text-white text-[10px] leading-snug px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap max-w-[200px] text-wrap">
                          {stat.info}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p
                    className={`relative text-xl font-bold font-serif truncate ${
                      isHighlight ? "text-white" : stat.valueColor
                    }`}
                  >
                    {stat.value}
                  </p>
                  <span
                    className={`relative text-[10px] font-semibold uppercase tracking-wider mt-1 block ${
                      isHighlight ? "text-[#c9a84c]/60" : "text-[#78716c]"
                    }`}
                  >
                    {stat.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Dana Koperasi - Combined Card */}
          <div className="kp-scale-in kp-d5 rounded-2xl bg-white border border-[#e7e5e0] shadow-sm overflow-hidden">
            <div className="grid grid-cols-3 divide-x divide-[#e7e5e0]">
              {danaKoperasi.map((item) => (
                <div
                  key={item.title}
                  className="group/item relative px-5 py-4 hover:bg-stone-50/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.iconBg}`}
                    >
                      <item.icon
                        className={`w-4 h-4 ${item.iconColor}`}
                      />
                    </div>
                    <div className="group/info relative">
                      <Info className="w-3.5 h-3.5 cursor-help text-[#d6d3d1] hover:text-[#a8a29e] transition-colors" />
                      <div className="absolute bottom-full right-0 mb-1.5 hidden group-hover/info:block z-20 pointer-events-none">
                        <div className="bg-[#1c1917] text-white text-[10px] leading-snug px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap max-w-[200px] text-wrap">
                          {item.info}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className={`text-lg font-bold font-serif ${item.valueColor}`}>
                    {item.value}
                  </p>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#78716c] mt-0.5 block">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart + Payments */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Chart */}
          <div className="lg:col-span-3 kp-fade-up kp-d5">
            <ChartKoperasi />
          </div>

          {/* Event Terdekat */}
          <div className="lg:col-span-2 kp-fade-up kp-d6">
            <div className="bg-white rounded-2xl shadow-sm border border-[#e7e5e0] h-full flex flex-col">
              <div className="px-6 py-5 border-b border-[#e7e5e0]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-violet-800" />
                  </div>
                  <h3 className="text-base font-bold text-[#1c1917]">
                    Event Terdekat
                  </h3>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {events.length > 0 ? (
                  events.slice(0, 4).map((event, index) => (
                    <div
                      key={event.id}
                      className="group flex items-start gap-3 px-6 py-4 hover:bg-stone-50/60 transition-colors cursor-pointer"
                      style={{
                        borderBottom:
                          index < Math.min(events.length, 4) - 1
                            ? "1px solid #e7e5e0"
                            : "none",
                      }}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0d3b2c] to-[#145a3f] flex items-center justify-center shrink-0 mt-0.5">
                        <CalendarDays className="w-4 h-4 text-[#c9a84c]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm text-[#1c1917] truncate">
                            {event.title}
                          </p>
                        </div>
                        <p className="text-xs text-[#a8a29e] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {dayjs(event.tanggal).format("D MMMM YYYY")}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${KATEGORI_COLOR[event.kategori] || "text-gray-800 bg-gray-50"}`}
                      >
                        {KATEGORI_LABEL[event.kategori] || event.kategori}
                      </span>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    icon={CalendarDays}
                    title="Tidak ada event"
                    description="Tidak ada event yang akan datang"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Daftar Keluarga */}
        {keluargaList.length > 0 && (
          <div className="kp-fade-up kp-d3 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[#1c1917] font-serif">
                Daftar Keluarga
              </h3>
              <p className="text-xs text-[#a8a29e] mt-0.5">
                Data keluarga anggota koperasi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keluargaList.map((keluarga, index) => {
                const delays = [
                  "kp-d1",
                  "kp-d2",
                  "kp-d3",
                  "kp-d4",
                  "kp-d5",
                  "kp-d6",
                ];
                return (
                  <div
                    key={keluarga.id_keluarga}
                    className={`kp-scale-in ${delays[Math.min(index, 5)]} group cursor-pointer rounded-2xl border border-[#0d3b2c]/8 p-5 hover:shadow-lg hover:border-[#c9a84c]/40 transition-all duration-300 bg-gradient-to-br from-[#0d3b2c]/[0.04] via-white to-white`}
                    onClick={() =>
                      navigate(`/keluarga/${keluarga.id_keluarga}`)
                    }
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-[#0d3b2c]/[0.08] flex items-center justify-center shrink-0 group-hover:bg-[#0d3b2c]/[0.12] transition-colors">
                          <HomeIcon className="w-[18px] h-[18px] text-[#145a3f]" />
                        </div>
                        <div>
                          <p className="font-bold text-[15px] text-[#1c1917] font-serif group-hover:text-[#0d3b2c] transition-colors">
                            {keluarga.nama_kepala_keluarga}
                          </p>
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#78716c] mt-0.5">
                            <Users className="w-3 h-3" />
                            {keluarga.anggota.length} anggota
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#a8a29e] group-hover:text-[#c9a84c] group-hover:translate-x-0.5 transition-all" />
                    </div>

                    {/* Financial row */}
                    <div className="flex items-stretch gap-0 rounded-xl bg-white/80 border border-[#0d3b2c]/[0.05] overflow-hidden">
                      <div className="flex-1 px-3 py-2.5 text-center">
                        <p className="text-[9px] uppercase tracking-wider text-[#a8a29e] mb-1">
                          Simpanan
                        </p>
                        <p className="text-xs font-bold text-[#145a3f]">
                          {formatCurrency(keluarga.total_simpanan)}
                        </p>
                      </div>
                      <div className="w-px bg-[#0d3b2c]/[0.06]" />
                      <div className="flex-1 px-3 py-2.5 text-center">
                        <p className="text-[9px] uppercase tracking-wider text-[#a8a29e] mb-1">
                          Pinjaman
                        </p>
                        <p className="text-xs font-bold text-amber-700">
                          {formatCurrency(keluarga.total_pinjaman)}
                        </p>
                      </div>
                      <div className="w-px bg-[#0d3b2c]/[0.06]" />
                      <div className="flex-1 px-3 py-2.5 text-center">
                        <p className="text-[9px] uppercase tracking-wider text-[#a8a29e] mb-1">
                          Sukarela
                        </p>
                        <p className="text-xs font-bold text-teal-700">
                          {formatCurrency(keluarga.total_sukarela)}
                        </p>
                      </div>
                      <div className="w-px bg-[#0d3b2c]/[0.06]" />
                      <div className="flex-1 px-3 py-2.5 text-center">
                        <p className="text-[9px] uppercase tracking-wider text-[#a8a29e] mb-1">
                          Tab. Liburan
                        </p>
                        <p className="text-xs font-bold text-blue-700">
                          {formatCurrency(keluarga.total_tabungan_liburan)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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

      <ModalDetailEvent
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
      />
    </div>
  );
};

export default Home;
