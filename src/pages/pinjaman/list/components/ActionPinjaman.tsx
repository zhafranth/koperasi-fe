import { Button } from "@/components/ui/button";
import useToggle from "@/hooks/useToggle";
import { EyeIcon } from "lucide-react";
import ModalCicilan from "./ModalCicilan";
import type { PinjamanProps } from "@/api/pinjaman/pinjaman.interface";

interface Props {
  data: PinjamanProps;
}

const ActionPinjaman: React.FC<Props> = ({ data }) => {
  const { isOpen, toggle } = useToggle();
  return (
    <>
      <Button
        onClick={toggle}
        className="bg-blue-100 text-blue-500 hover:text-white hover:cursor-pointer hover:bg-blue-400"
      >
        <EyeIcon />
      </Button>
      {isOpen && <ModalCicilan isOpen onClose={toggle} data={data} />}
    </>
  );
};

export default ActionPinjaman;
