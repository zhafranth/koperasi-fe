import type { ColumnDef } from "@tanstack/react-table";
import type { TransaksiProps } from "@/api/transaksi/transaksi.interface";
import { formatDate } from "date-fns";
import Chips from "@/components/Chips";
import { TRANSAKSI_OPTIONS } from "@/constant/transaksi";

export const columns: ColumnDef<TransaksiProps>[] = [
  {
    accessorKey: "nama_anggota",
    header: "Nama",
  },
  {
    accessorKey: "jenis",
    header: "Jenis",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <Chips options={TRANSAKSI_OPTIONS} value={value} />;
    },
  },
  {
    accessorKey: "jumlah",
    header: "Jumlah",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("jumlah"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);

      return (
        <p className={`${amount < 0 ? "text-red-600" : "text-green-600"}`}>
          {formatted}
        </p>
      );
    },
  },
  {
    accessorKey: "tanggal",
    header: "Tanggal",
    cell: ({ row }) => {
      const date = new Date(row.getValue("tanggal"));
      const formatted = formatDate(date, "dd MMMM yyyy");
      return formatted;
    },
  },
  {
    accessorKey: "saldo_akhir",
    header: "Saldo Akhir",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("saldo_akhir"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);

      return formatted;
    },
  },
];
