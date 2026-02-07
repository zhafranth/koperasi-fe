import BackButton from "@/components/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAnggotaDetail } from "@/networks/anggota";
import { formatDate } from "date-fns";
import { id as formatID } from "date-fns/locale";
import {
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  User,
  UserCircle,
  PiggyBank,
  Wallet,
  CheckCircle2,
  Clock,
  Pencil,
} from "lucide-react";
import type { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { SkeletonDetail } from "@/components/Skeleton";
import useToggle from "@/hooks/useToggle";
import ModalEditAnggota from "../list/_components/ModalEditAnggota";

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

const AnggotaDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetAnggotaDetail(Number(id));
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useToggle();

  if (isLoading) return <SkeletonDetail />;

  const {
    nama,
    alamat,
    email,
    nik,
    no_telepon,
    saldo_simpanan,
    tgl_gabung,
    username,
    jumlah_pinjaman,
    simpanan = [],
    pinjaman = [],
  } = data ?? {};

  const initials = nama
    ? nama
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  return (
    <div className="space-y-6">
      <div className="kp-fade-up">
        <BackButton />
      </div>

      {/* Member Info Card */}
      <div className="kp-fade-up kp-d1 bg-white rounded-2xl shadow-sm border border-[#e7e5e0] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0d3b2c] via-[#145a3f] to-[#1a6b50] px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#c9a84c] flex items-center justify-center text-lg font-bold text-[#0d3b2c] font-serif shadow-lg">
                {initials}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{nama}</h2>
                <p className="text-white/50 text-sm flex items-center gap-1.5">
                  <UserCircle className="w-3.5 h-3.5" />
                  {username || "-"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onEditOpen}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Personal Info */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-5">
              <InfoRow
                icon={<User className="w-4 h-4" />}
                label="NIK"
                value={nik || "-"}
              />
              <InfoRow
                icon={<Phone className="w-4 h-4" />}
                label="No. Telepon"
                value={no_telepon || "-"}
              />
              <InfoRow
                icon={<Mail className="w-4 h-4" />}
                label="Email"
                value={email || "-"}
              />
            </div>
            <div className="space-y-5">
              <InfoRow
                icon={<MapPin className="w-4 h-4" />}
                label="Alamat"
                value={alamat || "-"}
              />
              <InfoRow
                icon={<CalendarDays className="w-4 h-4" />}
                label="Bergabung"
                value={
                  tgl_gabung
                    ? formatDate(tgl_gabung, "dd MMM yyyy", {
                        locale: formatID,
                      })
                    : "-"
                }
              />
            </div>
          </div>

          {/* Financial Summary */}
          <div className="border-t border-[#e7e5e0] mt-6 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                    <PiggyBank className="w-5 h-5 text-emerald-800" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
                    Total Simpanan
                  </span>
                </div>
                <p className="text-2xl font-bold text-emerald-800">
                  {formatCurrency(saldo_simpanan || 0)}
                </p>
              </div>
              <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-amber-800" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-600">
                    Total Pinjaman
                  </span>
                </div>
                <p className="text-2xl font-bold text-amber-800">
                  {formatCurrency(jumlah_pinjaman || 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="kp-fade-up kp-d3 bg-white rounded-2xl shadow-sm border border-[#e7e5e0] p-6">
        <Tabs defaultValue="simpanan" className="w-full">
          <TabsList className="flex w-full h-12 gap-2 p-1 bg-[#f7f5f0] rounded-xl">
            <TabsTrigger
              value="simpanan"
              className="flex-1 px-6 py-3 text-sm font-medium text-[#78716c] rounded-lg data-[state=active]:bg-[#145a3f] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-300 hover:bg-[#e7e5e0] hover:text-[#1c1917]"
            >
              Simpanan
            </TabsTrigger>
            <TabsTrigger
              value="pinjaman"
              className="flex-1 px-6 py-3 text-sm font-medium text-[#78716c] rounded-lg data-[state=active]:bg-[#145a3f] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-300 hover:bg-[#e7e5e0] hover:text-[#1c1917]"
            >
              Pinjaman
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simpanan">
            <div className="mt-6 space-y-3">
              {simpanan?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-[#e7e5e0] hover:bg-stone-50/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                      <PiggyBank className="w-4 h-4 text-emerald-800" />
                    </div>
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-800">
                        Iuran Bulanan
                      </span>
                      <p className="text-sm font-semibold text-[#1c1917] mt-1">
                        {formatDate(new Date(item.tanggal), "MMMM yyyy", {
                          locale: formatID,
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-sm text-emerald-700">
                    +{formatCurrency(item.jumlah)}
                  </p>
                </div>
              ))}
              {simpanan?.length === 0 && (
                <p className="text-center py-8 text-[#a8a29e]">
                  Belum ada data simpanan
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="pinjaman">
            <div className="mt-6 space-y-3">
              {pinjaman?.map((item) => (
                <div
                  key={`pinjaman-${item.id}`}
                  className="p-4 rounded-xl border border-[#e7e5e0] hover:bg-stone-50/60 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#a8a29e]">
                        {item.createdAt
                          ? formatDate(
                              new Date(item.createdAt),
                              "dd MMM yyyy",
                              { locale: formatID },
                            )
                          : "-"}
                      </p>
                      <p className="text-sm font-semibold text-[#1c1917] mt-0.5">
                        {item.keterangan}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "lunas"
                            ? "bg-emerald-50 text-emerald-800"
                            : "bg-amber-50 text-amber-800"
                        }`}
                      >
                        {item.status === "lunas" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {item.status}
                      </span>
                      <p className="font-bold text-sm text-amber-700">
                        {formatCurrency(item.jumlah)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {pinjaman?.length === 0 && (
                <p className="text-center py-8 text-[#a8a29e]">
                  Belum ada data pinjaman
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {id && (
        <ModalEditAnggota
          isOpen={isEditOpen}
          onClose={onEditClose}
          anggotaId={Number(id)}
        />
      )}
    </div>
  );
};

export default AnggotaDetail;
