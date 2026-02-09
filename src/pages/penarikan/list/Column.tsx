import type { ColumnDef } from "@tanstack/react-table";
import type { PenarikanProps } from "@/api/penarikan/penarikan.interface";
import { formatDate } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const SUMBER_LABEL: Record<string, string> = {
  simpanan: "Simpanan",
  sukarela: "Sukarela",
  infaq: "Infaq",
  liburan: "Liburan",
};

const SUMBER_COLOR: Record<string, string> = {
  simpanan: "bg-emerald-100 text-emerald-700",
  sukarela: "bg-violet-100 text-violet-700",
  infaq: "bg-teal-100 text-teal-700",
  liburan: "bg-cyan-100 text-cyan-700",
};

export const columns: ColumnDef<PenarikanProps>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "sumber",
    header: "Sumber",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return (
        <Badge
          className={`rounded-full ${SUMBER_COLOR[value] || "bg-gray-100 text-gray-700"}`}
        >
          {SUMBER_LABEL[value] || value}
        </Badge>
      );
    },
  },
  {
    accessorKey: "jumlah",
    header: "Jumlah",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("jumlah"));
      return (
        <p className="text-red-600 font-medium">{formatCurrency(amount)}</p>
      );
    },
  },
  {
    accessorKey: "tanggal",
    header: "Tanggal",
    cell: ({ row }) => {
      const date = new Date(row.getValue("tanggal"));
      return formatDate(date, "dd MMM yyyy");
    },
  },
  {
    accessorKey: "keterangan",
    header: "Keterangan",
    cell: ({ getValue }) => {
      const value = getValue() as string | null;
      return value || "-";
    },
  },
];
