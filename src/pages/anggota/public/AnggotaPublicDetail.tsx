import { useParams, useNavigate } from "react-router-dom";
import { formatDate } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import {
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  PiggyBank,
  Wallet,
  CreditCard,
  CheckCircle2,
  Clock,
  TrendingUp,
  Shield,
  Users,
  ChevronLeft,
} from "lucide-react";
import type { ReactNode } from "react";
import { useGetAnggotaDetail } from "@/networks/anggota";
import { SkeletonDetail } from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex gap-4">
    <div className="flex items-center gap-2 w-36 shrink-0 text-[#a8a29e]">
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </div>
    <p className="text-sm font-semibold text-[#1c1917]">{value}</p>
  </div>
);

const AnggotaPublicDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: member, isLoading } = useGetAnggotaDetail(Number(id));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f5f0]">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <SkeletonDetail />
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center">
        <EmptyState
          icon={Users}
          title="Anggota tidak ditemukan"
          description="Data anggota yang Anda cari tidak tersedia."
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

  const initials = member.nama
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const cicilanPercent =
    member.jumlah_cicilan && member.total_cicilan
      ? Math.round((member.jumlah_cicilan / member.total_cicilan) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      {/* Hero */}
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
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-bold shadow-2xl bg-[#c9a84c] text-[#0d3b2c] font-serif">
                {initials}
              </div>
              {member.status && (
                <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg ring-2 ring-[#145a3f]">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                {member.nama}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                {member.status && (
                  <>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-emerald-500/20 text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {member.status}
                    </span>
                    <span className="text-white/30">|</span>
                  </>
                )}
                {member.nama_kepala_keluarga && (
                  <span className="text-white/60 text-sm flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    Keluarga: {member.nama_kepala_keluarga}
                  </span>
                )}
              </div>
              {member.tgl_gabung && (
                <p className="text-white/40 text-sm flex items-center justify-center md:justify-start gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" />
                  Bergabung sejak{" "}
                  {formatDate(member.tgl_gabung, "dd MMMM yyyy", {
                    locale: idLocale,
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 -mt-10 pb-16 space-y-10">
        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {/* Simpanan */}
          <div className="kp-scale-in kp-d1 bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-[#e7e5e0]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                <PiggyBank className="w-5 h-5 text-emerald-800" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78716c]">
                Total Simpanan
              </span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-emerald-800">
              {formatCurrency(member.jumlah_simpanan || 0)}
            </p>
            <p className="text-xs mt-2 text-[#a8a29e]">
              {member.simpanan?.length || 0} transaksi tercatat
            </p>
          </div>

          {/* Pinjaman */}
          <div className="kp-scale-in kp-d2 bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-[#e7e5e0]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-amber-800" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78716c]">
                Total Pinjaman
              </span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-amber-800">
              {formatCurrency(member.jumlah_pinjaman || 0)}
            </p>
            <p className="text-xs mt-2 text-[#a8a29e]">
              {member.pinjaman?.length || 0} pinjaman tercatat
            </p>
          </div>

          {/* Cicilan */}
          <div className="kp-scale-in kp-d3 bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-[#e7e5e0]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-800" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78716c]">
                Cicilan
              </span>
            </div>
            {member.jumlah_cicilan != null && member.total_cicilan ? (
              <>
                <div className="flex items-end gap-1">
                  <p className="text-2xl md:text-3xl font-bold text-blue-800">
                    {member.jumlah_cicilan}
                  </p>
                  <p className="text-lg text-[#78716c] mb-0.5">
                    /{member.total_cicilan}
                  </p>
                </div>
                <div className="mt-3 w-full h-2 rounded-full bg-[#e7e5e0] overflow-hidden">
                  <div
                    className="kp-progress-bar h-full rounded-full bg-gradient-to-r from-blue-800 to-blue-500"
                    style={{ width: `${cicilanPercent}%` }}
                  />
                </div>
                <p className="text-xs mt-2 text-[#a8a29e]">
                  {cicilanPercent}% selesai
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl md:text-3xl font-bold text-blue-800">
                  {member.cicilan?.length || 0}
                </p>
                <p className="text-xs mt-2 text-[#a8a29e]">cicilan tercatat</p>
              </>
            )}
          </div>
        </div>

        {/* Informasi Pribadi */}
        <section className="kp-fade-up kp-d4">
          <h2 className="text-xl font-bold text-[#1c1917] mb-5">
            Informasi Pribadi
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-[#e7e5e0] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#e7e5e0]">
              <div className="p-6 space-y-5">
                <InfoRow
                  icon={<Phone className="w-4 h-4" />}
                  label="No. Telepon"
                  value={member.no_telepon || "-"}
                />
                <InfoRow
                  icon={<Mail className="w-4 h-4" />}
                  label="Email"
                  value={member.email || "-"}
                />
              </div>
              <div className="p-6 space-y-5">
                <InfoRow
                  icon={<MapPin className="w-4 h-4" />}
                  label="Alamat"
                  value={member.alamat || "-"}
                />
                <InfoRow
                  icon={<CalendarDays className="w-4 h-4" />}
                  label="Bergabung"
                  value={
                    member.tgl_gabung
                      ? formatDate(member.tgl_gabung, "dd MMMM yyyy", {
                          locale: idLocale,
                        })
                      : "-"
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* Keluarga Terkait */}
        {member.anggota_keluarga && member.anggota_keluarga.length > 0 && (
          <section className="kp-fade-up kp-d5">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-xl font-bold text-[#1c1917]">
                Keluarga Terkait
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#c9a84c]/10 text-[#92400e] text-xs font-semibold">
                <Users className="w-3 h-3" />
                {member.anggota_keluarga.length} orang
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {member.anggota_keluarga
                ?.filter((item) => item.id !== member.id)
                .map((family) => {
                  const fInitials = family.nama
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();
                  return (
                    <div
                      key={family.id}
                      onClick={() => navigate(`/anggota/${family.id}`)}
                      className="bg-white rounded-2xl p-5 shadow-sm border border-[#e7e5e0] hover:shadow-md hover:border-[#c9a84c]/30 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#fef3c7] text-[#92400e] flex items-center justify-center text-sm font-bold shrink-0 group-hover:bg-[#c9a84c]/20 transition-colors">
                          {fInitials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold capitalize text-sm text-[#1c1917] truncate group-hover:text-[#145a3f] transition-colors">
                            {family.nama}
                          </p>
                          {family.no_telepon && family.no_telepon !== "-" && (
                            <p className=" text-xs text-[#a8a29e] flex items-center gap-1.5">
                              <Phone className="w-3 h-3" /> {family.no_telepon}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        )}

        {/* Riwayat Simpanan */}
        {member.simpanan && member.simpanan.length > 0 && (
          <section className="kp-fade-up kp-d6">
            <h2 className="text-xl font-bold text-[#1c1917] mb-5">
              Riwayat Simpanan
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-[#e7e5e0] overflow-hidden">
              {member.simpanan.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-5 hover:bg-stone-50/60 transition-colors"
                  style={{
                    borderBottom:
                      index < member.simpanan.length - 1
                        ? "1px solid #e7e5e0"
                        : "none",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4 text-emerald-800" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#1c1917]">
                        Iuran Bulanan
                      </p>
                      <p className="text-xs mt-0.5 text-[#a8a29e]">
                        {formatDate(item.tanggal, "dd MMMM yyyy", {
                          locale: idLocale,
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-sm text-emerald-700 shrink-0">
                    +{formatCurrency(item.jumlah)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Riwayat Pinjaman */}
        {member.pinjaman && member.pinjaman.length > 0 && (
          <section className="kp-fade-up kp-d7">
            <h2 className="text-xl font-bold text-[#1c1917] mb-5">
              Riwayat Pinjaman
            </h2>
            <div className="space-y-4">
              {member.pinjaman.map((item) => {
                const isLunas = item.status?.toLowerCase() === "lunas";
                const sisa = item.sisa ?? 0;
                const paidPercent =
                  item.jumlah > 0
                    ? ((item.jumlah - sisa) / item.jumlah) * 100
                    : 100;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-sm border border-[#e7e5e0] p-5 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-semibold text-[#1c1917]">
                          {item.keterangan}
                        </p>
                        <p className="text-xs mt-1 text-[#a8a29e]">
                          Diajukan{" "}
                          {item.createdAt
                            ? formatDate(item.createdAt, "dd MMMM yyyy", {
                                locale: idLocale,
                              })
                            : "-"}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
                          isLunas
                            ? "bg-emerald-50 text-emerald-800"
                            : "bg-amber-50 text-amber-800"
                        }`}
                      >
                        {isLunas ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {item.status}
                      </span>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-medium text-[#a8a29e]">
                          Jumlah Pinjaman
                        </p>
                        <p className="text-lg font-bold text-[#1c1917]">
                          {formatCurrency(item.jumlah)}
                        </p>
                      </div>
                      {item.sisa != null && (
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-wider font-medium text-[#a8a29e]">
                            Sisa
                          </p>
                          <p
                            className={`text-lg font-bold ${
                              isLunas ? "text-emerald-700" : "text-amber-700"
                            }`}
                          >
                            {formatCurrency(sisa)}
                          </p>
                        </div>
                      )}
                    </div>
                    {!isLunas && item.sisa != null && (
                      <div className="mt-3 w-full h-1.5 rounded-full bg-[#e7e5e0] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                          style={{ width: `${paidPercent}%` }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Riwayat Cicilan */}
        {member.cicilan && member.cicilan.length > 0 && (
          <section className="kp-fade-up kp-d7">
            <h2 className="text-xl font-bold text-[#1c1917] mb-5">
              Riwayat Cicilan
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-[#e7e5e0] overflow-hidden">
              {member.cicilan.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-5 hover:bg-stone-50/60 transition-colors"
                  style={{
                    borderBottom:
                      index < (member.cicilan?.length ?? 0) - 1
                        ? "1px solid #e7e5e0"
                        : "none",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <CreditCard className="w-4 h-4 text-blue-800" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#1c1917]">
                        {item.keterangan}
                      </p>
                      <p className="text-xs mt-0.5 text-[#a8a29e]">
                        {formatDate(item.tanggal_bayar, "dd MMMM yyyy", {
                          locale: idLocale,
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-sm text-blue-800 shrink-0">
                    {formatCurrency(item.jumlah)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e7e5e0] py-8 text-center bg-[#f7f5f0]">
        <p className="text-sm text-[#a8a29e] font-serif">
          Koperasi Sejahtera Bersama
        </p>
        <p className="text-xs mt-1 text-[#d6d3d1]">Halaman informasi anggota</p>
      </footer>
    </div>
  );
};

export default AnggotaPublicDetail;
