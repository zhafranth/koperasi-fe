import type { ColumnDef } from "@tanstack/react-table";
import type { TransaksiProps } from "@/api/transaksi/transaksi.interface";
import { formatDate } from "date-fns";
import Chips from "@/components/Chips";
import { TRANSAKSI_OPTIONS } from "@/constant/transaksi";
import { formatCurrency } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";

export const getColumns = (options?: {
  onEdit?: (data: TransaksiProps) => void;
  onDelete?: (data: TransaksiProps) => void;
}): ColumnDef<TransaksiProps>[] => {
  const base: ColumnDef<TransaksiProps>[] = [
    {
      accessorKey: "nama_anggota",
      header: "Nama",
      cell: ({ getValue }) => {
        const value = getValue() as string | null;
        return value || "Koperasi";
      },
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
        return (
          <p className={`${amount < 0 ? "text-red-600" : "text-green-600"}`}>
            {formatCurrency(amount)}
          </p>
        );
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
    {
      accessorKey: "createdAt",
      header: "Tanggal Input",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        const formatted = formatDate(date, "dd MMM yyyy");
        return formatted;
      },
    },
  ];

  if (options?.onEdit || options?.onDelete) {
    base.push({
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="flex items-center gap-1">
            {options.onEdit && (
              <button
                type="button"
                onClick={() => options.onEdit!(data)}
                className="w-8 h-8 rounded-lg bg-[#f7f5f0] hover:bg-[#145a3f]/10 flex items-center justify-center transition-colors"
              >
                <Pencil className="w-3.5 h-3.5 text-[#78716c]" />
              </button>
            )}
            {options.onDelete && (
              <button
                type="button"
                onClick={() => options.onDelete!(data)}
                className="w-8 h-8 rounded-lg bg-[#f7f5f0] hover:bg-red-50 flex items-center justify-center transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5 text-[#78716c] hover:text-red-500" />
              </button>
            )}
          </div>
        );
      },
    });
  }

  return base;
};

// Backward compatible export
export const columns = getColumns();
