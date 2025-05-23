import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import useToggle from "@/hooks/useToggle";
import ModalAddAnggota from "./_components/ModalAddAnggota";

import { useGetAnggota } from "@/networks/anggota";
import CardAnggota from "./_components/CardAnggota";
import Search from "./_components/Search";
import { useSearchParams } from "react-router-dom";

const Anggota = () => {
  const [searchParams] = useSearchParams();

  const queryObject = Object.fromEntries([...searchParams]);

  const { data = [] } = useGetAnggota(queryObject);
  const { isOpen, onOpen, onClose } = useToggle();

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Daftar Anggota</h2>
          <Button
            onClick={onOpen}
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <PlusIcon className="h-5 w-5 mr-2 animate-pulse" />
            Tambah Anggota
          </Button>
        </div>

        <Search />

        <div className="space-y-4">
          {data.map((anggota, index) => (
            <CardAnggota data={anggota} key={`anggota-${index}`} />
          ))}
        </div>
      </div>

      <ModalAddAnggota isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Anggota;
