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
