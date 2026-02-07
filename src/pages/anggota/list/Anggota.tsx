import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, Users } from "lucide-react";
import useToggle from "@/hooks/useToggle";
import ModalAddAnggota from "./_components/ModalAddAnggota";
import ModalEditAnggota from "./_components/ModalEditAnggota";

import { useGetAnggota } from "@/networks/anggota";
import CardAnggota from "./_components/CardAnggota";
import Search from "./_components/Search";
import { useSearchParams } from "react-router-dom";
import { SkeletonCard } from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";

const Anggota = () => {
  const [searchParams] = useSearchParams();
  const [editId, setEditId] = useState<number | null>(null);

  const queryObject = Object.fromEntries([...searchParams]);

  const { data = [], isLoading } = useGetAnggota(queryObject);
  const { isOpen, onOpen, onClose } = useToggle();

  return (
    <>
      <div className="space-y-6">
        <div className="kp-fade-up flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#1c1917]">Daftar Anggota</h2>
          <Button
            onClick={onOpen}
            className="bg-gradient-to-r from-[#0d3b2c] to-[#145a3f] hover:from-[#145a3f] hover:to-[#1a6b50] text-white font-medium px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Tambah Anggota
          </Button>
        </div>

        <div className="kp-fade-up kp-d1">
          <Search />
        </div>

        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={`kp-fade-up kp-d${i + 1}`}>
                <SkeletonCard />
              </div>
            ))
          ) : data.length === 0 ? (
            <EmptyState
              icon={Users}
              title="Belum ada anggota"
              description="Data anggota akan muncul di sini setelah ditambahkan."
              action={
                <Button
                  onClick={onOpen}
                  className="bg-gradient-to-r from-[#0d3b2c] to-[#145a3f] hover:from-[#145a3f] hover:to-[#1a6b50] text-white font-medium px-6 py-2 rounded-xl"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Tambah Anggota
                </Button>
              }
            />
          ) : (
            data.map((anggota, index) => {
              const delays = ["kp-d1", "kp-d2", "kp-d3", "kp-d4", "kp-d5", "kp-d6", "kp-d7"];
              return (
                <div key={`anggota-${index}`} className={`kp-scale-in ${delays[Math.min(index, 6)]}`}>
                  <CardAnggota
                    data={anggota}
                    onEdit={(id) => setEditId(id)}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      <ModalAddAnggota isOpen={isOpen} onClose={onClose} />

      {editId !== null && (
        <ModalEditAnggota
          isOpen={editId !== null}
          onClose={() => setEditId(null)}
          anggotaId={editId}
        />
      )}
    </>
  );
};

export default Anggota;
