import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, Users } from "lucide-react";
import useToggle from "@/hooks/useToggle";
import CardKeluarga from "./_components/CardKeluarga";
import Search from "./_components/Search";
import ModalAddKeluarga from "./_components/ModalAddKeluarga";
import ModalEditKeluarga from "./_components/ModalEditKeluarga";
import EmptyState from "@/components/EmptyState";
import { useGetKeluarga, useDeleteKeluarga } from "@/networks/keluarga";
import type { KeluargaProps } from "@/api/keluarga/keluarga.interface";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Keluarga = () => {
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useToggle();
  const [editData, setEditData] = useState<KeluargaProps | null>(null);
  const [deleteData, setDeleteData] = useState<KeluargaProps | null>(null);

  const { data: keluargaList = [] } = useGetKeluarga();
  const { mutate: deleteKeluarga, isPending: isDeleting } = useDeleteKeluarga();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return keluargaList;
    return keluargaList.filter((k) =>
      k.nama_kepala_keluarga.toLowerCase().includes(q)
    );
  }, [search, keluargaList]);

  return (
    <>
      <div className="space-y-6">
        <div className="kp-fade-up flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#1c1917]">Daftar Keluarga</h2>
          <Button
            onClick={onOpen}
            className="bg-gradient-to-r from-[#0d3b2c] to-[#145a3f] hover:from-[#145a3f] hover:to-[#1a6b50] text-white font-medium px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Tambah Keluarga
          </Button>
        </div>

        <div className="kp-fade-up kp-d1">
          <Search value={search} onChange={setSearch} />
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <EmptyState
              icon={Users}
              title="Keluarga tidak ditemukan"
              description={
                search
                  ? "Tidak ada keluarga yang cocok dengan pencarian Anda."
                  : "Data keluarga akan muncul di sini setelah ditambahkan."
              }
              action={
                !search ? (
                  <Button
                    onClick={onOpen}
                    className="bg-gradient-to-r from-[#0d3b2c] to-[#145a3f] hover:from-[#145a3f] hover:to-[#1a6b50] text-white font-medium px-6 py-2 rounded-xl"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Tambah Keluarga
                  </Button>
                ) : undefined
              }
            />
          ) : (
            filtered.map((keluarga, index) => {
              const delays = ["kp-d1", "kp-d2", "kp-d3", "kp-d4", "kp-d5", "kp-d6", "kp-d7"];
              return (
                <div
                  key={keluarga.id_keluarga}
                  className={`kp-scale-in ${delays[Math.min(index, 6)]}`}
                >
                  <CardKeluarga
                    data={keluarga}
                    onEdit={(data) => setEditData(data)}
                    onDelete={(data) => setDeleteData(data)}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      <ModalAddKeluarga isOpen={isOpen} onClose={onClose} />

      {editData && (
        <ModalEditKeluarga
          isOpen={editData !== null}
          onClose={() => setEditData(null)}
          data={editData}
        />
      )}

      <Dialog
        open={deleteData !== null}
        onOpenChange={() => setDeleteData(null)}
      >
        <DialogContent className="sm:max-w-[400px] rounded-2xl border-[#e7e5e0]">
          <DialogHeader>
            <DialogTitle className="text-lg text-[#1c1917]">
              Hapus Keluarga
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-[#78716c]">
            Apakah Anda yakin ingin menghapus keluarga{" "}
            <span className="font-semibold text-[#1c1917]">
              {deleteData?.nama_kepala_keluarga}
            </span>
            ? Semua anggota akan dilepas dari keluarga ini.
          </p>
          <div className="flex justify-end gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteData(null)}
              className="rounded-xl border-[#e7e5e0] text-[#78716c] hover:bg-[#f5f0e8] hover:text-[#1c1917]"
            >
              Batal
            </Button>
            <Button
              type="button"
              disabled={isDeleting}
              onClick={() => {
                if (deleteData) {
                  deleteKeluarga(deleteData.id_keluarga, {
                    onSuccess: () => setDeleteData(null),
                  });
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Keluarga;
