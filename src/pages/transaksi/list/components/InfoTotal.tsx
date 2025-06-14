import AnimatedPulse from "@/components/AnimatedPulse";
import { useGetTransaksiTotal } from "@/networks/transaksi";
import { useMemo } from "react";

const InfoTotal = () => {
  const { data } = useGetTransaksiTotal();
  const infos = useMemo(() => {
    const { jumlah_dana, jumlah_pinjaman, total_dana } = data || {};
    return [
      {
        title: "Jumlah Dana",
        value: jumlah_dana,
        color: "blue",
      },
      {
        title: "Jumlah Pinjaman",
        value: jumlah_pinjaman,
        color: "red",
      },
      {
        title: "Total Dana",
        value: total_dana,
        color: "purple",
      },
    ];
  }, [data]);
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      {infos.map((info, index) => (
        <div
          key={index}
          className="flex gap-x-4 items-center bg-white py-1 px-3 rounded-lg shadow"
        >
          <AnimatedPulse size="sm" color={info.color} />
          <div>
            <h3 className="text-xs font-semibold text-gray-700">
              {info.title}
            </h3>
            <p className={`text-base font-bold text-${info.color}-600`}>
              Rp {info.value?.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoTotal;
