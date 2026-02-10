import ChartKoperasi from "@/components/ChartsKoperasi";
import {
  Users,
  PiggyBank,
  BadgeDollarSign,
  HandCoins,
  Palmtree,
  TrendingUp,
  CalendarDays,
  MapPin,
  Clock,
  ChevronRight,
  Sparkles,
  Plus,
} from "lucide-react";
import { useGetEvents } from "@/networks/event";
import { useGetTransaksiTotal } from "@/networks/transaksi";
import useToggle from "@/hooks/useToggle";
import ModalAddEvent from "./_components/ModalAddEvent";
import ModalDetailEvent from "./_components/ModalDetailEvent";
import type { EventProps } from "@/api/event/event.interface";
import dayjs from "dayjs";
import "dayjs/locale/id";
import EmptyState from "@/components/EmptyState";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { useIsPengurus } from "@/hooks/useAuth";

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

const DashboardHome = () => {
  const { data: events = [] } = useGetEvents();
  const { data: totalData } = useGetTransaksiTotal();
  const isPengurus = useIsPengurus();

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
      },
      {
        title: "Jumlah Dana",
        value: formatCurrency(d?.jumlah_dana || 0),
        icon: PiggyBank,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-800",
        valueColor: "text-emerald-800",
        delay: "kp-d2",
      },
      {
        title: "Jumlah Pinjaman",
        value: formatCurrency(d?.jumlah_pinjaman || 0),
        icon: BadgeDollarSign,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-800",
        valueColor: "text-amber-800",
        delay: "kp-d3",
      },
      {
        title: "Simpanan Sukarela",
        value: formatCurrency(d?.jumlah_simpanan_sukarela || 0),
        icon: HandCoins,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-800",
        valueColor: "text-blue-800",
        delay: "kp-d4",
      },
      {
        title: "Tab. Liburan",
        value: formatCurrency(d?.jumlah_tabungan_liburan || 0),
        icon: Palmtree,
        iconBg: "bg-teal-50",
        iconColor: "text-teal-800",
        valueColor: "text-teal-800",
        delay: "kp-d5",
      },
      {
        title: "Total Dana",
        value: formatCurrency(d?.total_dana || 0),
        icon: TrendingUp,
        iconBg: "bg-[#c9a84c]/10",
        iconColor: "text-[#92400e]",
        valueColor: "text-[#92400e]",
        delay: "kp-d6",
      },
    ];
  }, [totalData]);
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useToggle();
  const [selectedEvent, setSelectedEvent] = useState<EventProps | null>(null);
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="kp-fade-up">
        <h1 className="text-2xl font-bold text-[#1c1917] font-serif">
          Dashboard
        </h1>
        <p className="text-sm text-[#a8a29e] mt-1">
          Ringkasan data dan kegiatan koperasi
        </p>
      </div>

      {/* Stats Cards - Single Row Strip */}
      <div className="flex gap-3 overflow-x-auto -mx-6 px-6 pb-1 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-6 snap-x snap-mandatory lg:snap-none scrollbar-hide">
        {stats.map((stat, index) => {
          const isHighlight = index === stats.length - 1;
          return (
            <div
              key={stat.title}
              className={`kp-scale-in ${stat.delay} snap-start relative min-w-[152px] flex-shrink-0 lg:min-w-0 rounded-2xl p-4 pb-5 transition-all duration-300 overflow-hidden ${
                isHighlight
                  ? "bg-gradient-to-br from-[#0d3b2c] via-[#145a3f] to-[#0d3b2c] shadow-lg shadow-[#0d3b2c]/25 border border-[#1a6b50]/30"
                  : "bg-white border border-[#e7e5e0] shadow-sm hover:shadow-md hover:border-[#c9a84c]/30"
              }`}
            >
              {isHighlight && (
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
              )}
              <div
                className={`relative w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                  isHighlight ? "bg-[#c9a84c]/15" : stat.iconBg
                }`}
              >
                <stat.icon
                  className={`w-[18px] h-[18px] ${
                    isHighlight ? "text-[#c9a84c]" : stat.iconColor
                  }`}
                />
              </div>
              <p
                className={`relative text-lg font-bold font-serif truncate ${
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

      {/* Chart + Events */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Chart */}
        <div className="lg:col-span-3 kp-fade-up kp-d5">
          <ChartKoperasi />
        </div>

        {/* Event Terdekat - Compact sidebar */}
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

      {/* Event Koperasi List */}
      <div className="kp-fade-up kp-d3">
        <div className="bg-white rounded-2xl shadow-sm border border-[#e7e5e0] overflow-hidden">
          {/* Section Header */}
          <div className="px-6 py-5 border-b border-[#e7e5e0] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center">
                <CalendarDays className="w-4 h-4 text-[#92400e]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1c1917]">
                  Event Koperasi
                </h3>
                <p className="text-xs text-[#a8a29e]">
                  Agenda kegiatan koperasi mendatang
                </p>
              </div>
            </div>
            {isPengurus && (
              <button
                type="button"
                onClick={onAddOpen}
                className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#0d3b2c] to-[#145a3f] hover:from-[#145a3f] hover:to-[#1a6b50] flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Event Cards Grid */}
          <div className="p-6">
            {events.length === 0 ? (
              <EmptyState
                icon={CalendarDays}
                title="Belum ada event"
                description="Belum ada agenda kegiatan koperasi"
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event, index) => {
                  const delays = [
                    "kp-d1",
                    "kp-d2",
                    "kp-d3",
                    "kp-d4",
                    "kp-d5",
                    "kp-d6",
                  ];
                  const categoryColor =
                    KATEGORI_COLOR[event.kategori] ||
                    "text-gray-800 bg-gray-50";
                  const categoryLabel =
                    KATEGORI_LABEL[event.kategori] || event.kategori;
                  return (
                    <div
                      key={event.id}
                      className={`kp-scale-in ${delays[Math.min(index, 5)]} group cursor-pointer rounded-xl border border-[#e7e5e0] p-5 hover:shadow-md hover:border-[#c9a84c]/40 transition-all duration-300 bg-white flex flex-col`}
                    >
                      {/* Category + Arrow */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`inline-flex items-center text-[10px] font-semibold px-2.5 py-1 rounded-full ${categoryColor}`}
                        >
                          {categoryLabel}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#d6d3d1] group-hover:text-[#c9a84c] transition-colors" />
                      </div>

                      {/* Title & Description */}
                      <h4 className="font-semibold text-sm text-[#1c1917] mb-2 leading-snug">
                        {event.title}
                      </h4>
                      <p className="text-xs text-[#a8a29e] leading-relaxed mb-4 line-clamp-2 flex-1">
                        {event.description || "-"}
                      </p>

                      {/* Meta */}
                      <div className="space-y-1.5 pt-3 border-t border-[#e7e5e0]">
                        <div className="flex items-center gap-2 text-xs text-[#78716c]">
                          <CalendarDays className="w-3.5 h-3.5 text-[#a8a29e]" />
                          {dayjs(event.tanggal).format("D MMMM YYYY")}
                        </div>
                        {event.waktu && (
                          <div className="flex items-center gap-2 text-xs text-[#78716c]">
                            <Clock className="w-3.5 h-3.5 text-[#a8a29e]" />
                            {event.waktu}
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-2 text-xs text-[#78716c]">
                            <MapPin className="w-3.5 h-3.5 text-[#a8a29e]" />
                            {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalAddEvent isOpen={isAddOpen} onClose={onAddClose} />
      <ModalDetailEvent
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
      />
    </div>
  );
};

export default DashboardHome;
