import type { PinjamanProps } from "@/api/pinjaman/pinjaman.interface";
import Chips from "@/components/Chips";
import { STATUS_PINJAMAN_OPTIONS } from "@/constant/pinjaman";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import ActionDetail from "./components/ActionDetail";
import { formatCurrency } from "@/lib/utils";

export const columns: ColumnDef<PinjamanProps>[] = [
  {
    accessorKey: "nama_anggota",
    header: "Nama",
  },
  {
    accessorKey: "keterangan",
    header: "Keterangan",
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
    accessorKey: "jumlah",
    header: "Jumlah",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("jumlah"));
      return <p>{formatCurrency(amount)}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = formatDate(date, "dd MMMM yyyy");
      return formatted;
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
