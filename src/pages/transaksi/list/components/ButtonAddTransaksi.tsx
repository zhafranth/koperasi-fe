import { Button } from "@/components/ui/button";
import useToggle from "@/hooks/useToggle";
import ModalFormTransaksi from "./ModalFormTransaksi";

const ButtonAddTransaksi = () => {
  const { toggle, isOpen } = useToggle();
  return (
    <>
      <Button onClick={toggle}>Add Transaksi </Button>
      {isOpen && <ModalFormTransaksi onClose={toggle} />}
    </>
  );
};

export default ButtonAddTransaksi;
