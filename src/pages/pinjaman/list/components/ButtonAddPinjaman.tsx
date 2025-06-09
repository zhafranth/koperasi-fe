import { Button } from "@/components/ui/button";
import useToggle from "@/hooks/useToggle";
import { PlusIcon } from "lucide-react";
import ModalAddPinjaman from "./ModalCreatePinjaman";

const ButtonAddPinjaman = () => {
  const { toggle, isOpen } = useToggle();
  return (
    <>
      <Button
        disabled
        onClick={toggle}
        className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
      >
        <PlusIcon className="h-5 w-5 mr-2 animate-pulse" />
        Pinjaman
      </Button>

      {isOpen && <ModalAddPinjaman isOpen onClose={toggle} />}
    </>
  );
};

export default ButtonAddPinjaman;
