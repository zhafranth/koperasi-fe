import { columns } from "./Column";
import { useGetPinjaman } from "@/networks/pinjaman";
import { useSearchParams } from "react-router-dom";
import ListLayout from "@/components/ListLayout";
import ButtonAddPinjaman from "./components/ButtonAddPinjaman";
import type { PinjamanProps } from "@/api/pinjaman/pinjaman.interface";
import Chips from "@/components/Chips";
import { STATUS_PINJAMAN_OPTIONS } from "@/constant/pinjaman";
import { formatCurrency } from "@/lib/utils";
import { formatDate } from "date-fns";

const PinjamanList = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "";

  const { data = [], isLoading } = useGetPinjaman({ status });

  const renderMobileCard = (item: PinjamanProps, index: number) => (
    <div
      key={item.id_pinjaman}
      className="bg-white rounded-xl border border-[#e7e5e0] p-4 kp-fade-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-[#1c1917] truncate mr-2">
          {item.nama_anggota}
        </p>
        <Chips options={STATUS_PINJAMAN_OPTIONS} value={item.status} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-[#1c1917]">
          {formatCurrency(Number(item.jumlah))}
        </p>
        <p className="text-xs text-[#a8a29e]">
          {formatDate(new Date(item.createdAt), "dd MMM yyyy")}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <ListLayout
        columns={columns}
        data={data}
        isLoading={isLoading}
        title="Pinjaman"
        filters={[
          {
            queryKey: "status",
            label: "Status",
            options: [
              {
                value: "proses",
                label: "Proses",
              },
              {
                value: "lunas",
                label: "Lunas",
              },
            ],
          },
        ]}
        extendButtons={<ButtonAddPinjaman />}
        renderMobileCard={renderMobileCard}
      />
    </>
  );
};

export default PinjamanList;
