import type { PinjamanAggregatedListItem } from "@/api/pinjaman/pinjaman.interface";
import Chips from "@/components/Chips";
import { STATUS_PINJAMAN_OPTIONS } from "@/constant/pinjaman";
import type { ColumnDef } from "@tanstack/react-table";
import ActionDetail from "./components/ActionDetail";
import { formatCurrency } from "@/lib/utils";

export const columns: ColumnDef<PinjamanAggregatedListItem>[] = [
  {
    accessorKey: "nama_anggota",
    header: "Nama",
  },
  {
    accessorKey: "total_sisa",
    header: "Sisa Pinjaman",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_sisa"));
      return <p>{formatCurrency(amount)}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <Chips options={STATUS_PINJAMAN_OPTIONS} value={value} />;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const data = row.original;
      return <ActionDetail data={data} />;
    },
  },
];
