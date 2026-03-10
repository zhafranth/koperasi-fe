import { useState, useMemo } from "react";
import { getColumns } from "./Column";
import { useGetTransaksi } from "@/networks/transaksi";
import ListLayout from "@/components/ListLayout";
import InfoTotal from "./components/InfoTotal";
import { TRANSAKSI_OPTIONS } from "@/constant/transaksi";
import { useSearchParams } from "react-router-dom";
import { removeEmptyObjectValues } from "@/utils";
import ButtonAddTransaksi from "./components/ButtonAddTransaksi";
import ModalEditTransaksi from "./components/ModalEditTransaksi";
import DialogDeleteTransaksi from "./components/DialogDeleteTransaksi";
import { useIsPengurus } from "@/hooks/useAuth";
import type { TransaksiProps } from "@/api/transaksi/transaksi.interface";
import Chips from "@/components/Chips";
import { formatCurrency } from "@/lib/utils";
import { formatDate } from "date-fns";

const TransaksiList = () => {
  const [searchParams] = useSearchParams();
  const queryObject = Object.fromEntries([...searchParams]);
  const isPengurus = useIsPengurus();

  const [editData, setEditData] = useState<TransaksiProps | null>(null);
  const [deleteData, setDeleteData] = useState<TransaksiProps | null>(null);

  const { data, isLoading } = useGetTransaksi(removeEmptyObjectValues(queryObject));
  const { data: items = [], pagination } = data || {};

  const columns = useMemo(
    () =>
      getColumns(
        isPengurus
          ? {
              onEdit: (data) => setEditData(data),
              onDelete: (data) => setDeleteData(data),
            }
          : undefined,
      ),
    [isPengurus],
  );

  const renderMobileCard = (item: TransaksiProps, index: number) => {
    const amount = Number(item.jumlah);
    return (
      <div
        key={item.id}
        className="bg-white rounded-xl border border-[#e7e5e0] p-4 kp-fade-up"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-[#1c1917] truncate mr-2">
            {item.nama_anggota || "Koperasi"}
          </p>
          <Chips options={TRANSAKSI_OPTIONS} value={item.jenis} />
        </div>
        <div className="flex items-center justify-between">
          <p className={`text-sm font-bold ${amount < 0 ? "text-red-600" : "text-green-600"}`}>
            {formatCurrency(amount)}
          </p>
          <p className="text-xs text-[#a8a29e]">
            {formatDate(new Date(item.createdAt), "dd MMM yyyy")}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <ListLayout
        columns={columns}
        data={items}
        isLoading={isLoading}
        title="Transaksi"
        filters={[
          {
            label: "Jenis",
            options: [
              {
                label: "All",
                value: "*",
              },
              ...TRANSAKSI_OPTIONS.map((item) => ({
                label: item.label,
                value: item.key,
              })),
            ],
            queryKey: "jenis",
          },
        ]}
        extraComponents={<InfoTotal />}
        pagination={pagination}
        extendButtons={<ButtonAddTransaksi />}
        renderMobileCard={renderMobileCard}
      />

      {editData && (
        <ModalEditTransaksi
          data={editData}
          onClose={() => setEditData(null)}
        />
      )}

      {deleteData && (
        <DialogDeleteTransaksi
          data={deleteData}
          onClose={() => setDeleteData(null)}
        />
      )}
    </>
  );
};

export default TransaksiList;
