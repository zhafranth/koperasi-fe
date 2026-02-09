import { Button } from "@/components/ui/button";
import useToggle from "@/hooks/useToggle";
import { PlusIcon } from "lucide-react";
import ModalAddPinjaman from "./ModalCreatePinjaman";
import { useIsPengurus } from "@/hooks/useAuth";

const ButtonAddPinjaman = () => {
  const { toggle, isOpen } = useToggle();
  const isPengurus = useIsPengurus();

  if (!isPengurus) return null;

  return (
    <>
      <Button
        onClick={toggle}
        className="bg-gradient-to-r from-[#0d3b2c] to-[#145a3f] hover:from-[#145a3f] hover:to-[#1a6b50] text-white font-medium px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
      >
        <PlusIcon className="h-4 w-4 mr-2" />
        Pinjaman
      </Button>

      {isOpen && <ModalAddPinjaman isOpen onClose={toggle} />}
    </>
  );
};

export default ButtonAddPinjaman;
