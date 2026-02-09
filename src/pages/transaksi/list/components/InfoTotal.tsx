import { useGetTransaksiTotal } from "@/networks/transaksi";
import { PiggyBank, Wallet, HandCoins, Palmtree, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { formatCurrency } from "@/lib/utils";

const InfoTotal = () => {
  const { data } = useGetTransaksiTotal();
  const infos = useMemo(() => {
    const { jumlah_dana, jumlah_pinjaman, jumlah_simpanan_sukarela, jumlah_tabungan_liburan, total_dana } = data || {};
    return [
      {
        title: "Jumlah Dana",
        value: jumlah_dana,
        icon: PiggyBank,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-800",
        valueColor: "text-emerald-800",
      },
      {
        title: "Jumlah Pinjaman",
        value: jumlah_pinjaman,
        icon: Wallet,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-800",
        valueColor: "text-amber-800",
      },
      {
        title: "Simpanan Sukarela",
        value: jumlah_simpanan_sukarela,
        icon: HandCoins,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-800",
        valueColor: "text-blue-800",
      },
      {
        title: "Tab. Liburan",
        value: jumlah_tabungan_liburan,
        icon: Palmtree,
        iconBg: "bg-teal-50",
        iconColor: "text-teal-800",
        valueColor: "text-teal-800",
      },
      {
        title: "Total Dana",
        value: total_dana,
        icon: TrendingUp,
        iconBg: "bg-[#c9a84c]/10",
        iconColor: "text-[#92400e]",
        valueColor: "text-[#92400e]",
      },
    ];
  }, [data]);
  return (
    <div className="grid grid-cols-5 gap-4 mb-4 kp-fade-up kp-d1">
      {infos.map((info, index) => (
        <div
          key={index}
          className="flex gap-x-4 items-center bg-white py-3 px-4 rounded-2xl shadow-sm border border-[#e7e5e0] hover:shadow-md transition-all duration-300"
        >
          <div
            className={`w-10 h-10 rounded-xl ${info.iconBg} flex items-center justify-center shrink-0`}
          >
            <info.icon className={`w-4 h-4 ${info.iconColor}`} />
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#78716c]">
              {info.title}
            </h3>
            <p className={`text-base font-bold ${info.valueColor}`}>
              {formatCurrency(info.value || 0)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoTotal;
