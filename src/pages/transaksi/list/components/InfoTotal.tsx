import { useGetTransaksiTotal } from "@/networks/transaksi";
import { PiggyBank, Wallet, HandCoins, Palmtree, TrendingUp, Gift } from "lucide-react";
import { useMemo } from "react";
import { formatCurrency } from "@/lib/utils";

const InfoTotal = () => {
  const { data } = useGetTransaksiTotal();

  const {
    jumlah_dana,
    jumlah_pinjaman,
    jumlah_simpanan_sukarela,
    jumlah_tabungan_liburan,
    jumlah_infaq,
    total_dana,
  } = data || {};

  const metrics = useMemo(
    () => [
      {
        title: "Jumlah Dana",
        value: jumlah_dana,
        icon: PiggyBank,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-700",
        valueColor: "text-emerald-800",
        bar: "bg-emerald-400",
      },
      {
        title: "Jumlah Pinjaman",
        value: jumlah_pinjaman,
        icon: Wallet,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-700",
        valueColor: "text-amber-800",
        bar: "bg-amber-400",
      },
      {
        title: "Simpanan Sukarela",
        value: jumlah_simpanan_sukarela,
        icon: HandCoins,
        iconBg: "bg-violet-50",
        iconColor: "text-violet-700",
        valueColor: "text-violet-800",
        bar: "bg-violet-400",
      },
      {
        title: "Tab. Liburan",
        value: jumlah_tabungan_liburan,
        icon: Palmtree,
        iconBg: "bg-cyan-50",
        iconColor: "text-cyan-700",
        valueColor: "text-cyan-800",
        bar: "bg-cyan-400",
      },
      {
        title: "Infaq",
        value: jumlah_infaq,
        icon: Gift,
        iconBg: "bg-teal-50",
        iconColor: "text-teal-700",
        valueColor: "text-teal-800",
        bar: "bg-teal-400",
      },
    ],
    [jumlah_dana, jumlah_pinjaman, jumlah_simpanan_sukarela, jumlah_tabungan_liburan, jumlah_infaq],
  );

  return (
    <div className="flex flex-col gap-3 mb-4 kp-fade-up kp-d1">
      {/* 5 metric cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {metrics.map((info, index) => (
          <div
            key={index}
            className="relative flex flex-col gap-y-2 bg-white py-3 px-4 rounded-2xl shadow-sm border border-[#e7e5e0] hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* colored top accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-[3px] ${info.bar} rounded-t-2xl`} />

            <div className="flex items-center gap-x-2 mt-1">
              <div
                className={`w-8 h-8 rounded-lg ${info.iconBg} flex items-center justify-center shrink-0`}
              >
                <info.icon className={`w-4 h-4 ${info.iconColor}`} />
              </div>
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[#78716c] leading-tight">
                {info.title}
              </h3>
            </div>

            <p className={`text-sm font-bold ${info.valueColor} leading-none`}>
              {formatCurrency(info.value || 0)}
            </p>
          </div>
        ))}
      </div>

      {/* Total Dana — featured hero card */}
      <div className="relative flex flex-col gap-3 bg-[#0d3b2c] py-4 px-5 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 md:flex-row md:items-center md:justify-between md:px-6">
        {/* decorative rings */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border border-[#c9a84c]/20" />
        <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full border border-[#c9a84c]/15" />
        <div className="absolute right-16 -bottom-6 w-24 h-24 rounded-full border border-white/5" />

        <div className="flex items-center gap-x-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 border border-[#c9a84c]/30 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-[#c9a84c]" />
          </div>
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[#c9a84c]/70">
              Total Dana Koperasi
            </h3>
            <p className="text-xs text-white/40 mt-0.5">Akumulasi seluruh dana aktif</p>
          </div>
        </div>

        <p className="text-xl font-bold text-[#c9a84c] relative z-10 tracking-tight md:text-2xl">
          {formatCurrency(total_dana || 0)}
        </p>
      </div>
    </div>
  );
};

export default InfoTotal;
