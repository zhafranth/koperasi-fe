import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteTransaksi } from "@/networks/transaksi";
import type { TransaksiProps } from "@/api/transaksi/transaksi.interface";
import { formatCurrency } from "@/lib/utils";
import { TRANSAKSI_OPTIONS } from "@/constant/transaksi";

const DialogDeleteTransaksi = ({
  data,
  onClose,
}: {
  data: TransaksiProps;
  onClose: () => void;
}) => {
  const { mutate: deleteTransaksi, isPending } = useDeleteTransaksi();

  const jenisLabel =
    TRANSAKSI_OPTIONS.find((opt) => opt.key === data.jenis)?.label ||
    data.jenis;

  const handleDelete = () => {
    deleteTransaksi(data.id, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[400px] rounded-2xl border-[#e7e5e0]">
        <DialogHeader>
          <DialogTitle className="text-lg text-[#1c1917]">
            Hapus Transaksi
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-sm text-[#78716c]">
            Apakah Anda yakin ingin menghapus transaksi ini? Data terkait di
            tabel sumber ({jenisLabel}) juga akan ikut terhapus.
          </p>
          <div className="rounded-lg bg-[#f7f5f0] p-3 text-sm space-y-1">
            <p>
              <span className="text-[#78716c]">Jenis:</span>{" "}
              <span className="font-medium">{jenisLabel}</span>
            </p>
            <p>
              <span className="text-[#78716c]">Nama:</span>{" "}
              <span className="font-medium">
                {data.nama_anggota || "Koperasi"}
              </span>
            </p>
            <p>
              <span className="text-[#78716c]">Jumlah:</span>{" "}
              <span className="font-medium">
                {formatCurrency(data.jumlah)}
              </span>
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Menghapus..." : "Hapus"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDeleteTransaksi;
