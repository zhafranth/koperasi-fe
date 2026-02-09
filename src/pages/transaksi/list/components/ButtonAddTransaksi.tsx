import { Button } from "@/components/ui/button";
import useToggle from "@/hooks/useToggle";
import ModalFormTransaksi from "./ModalFormTransaksi";
import { useIsPengurus } from "@/hooks/useAuth";

const ButtonAddTransaksi = () => {
  const { toggle, isOpen } = useToggle();
  const isPengurus = useIsPengurus();

  if (!isPengurus) return null;

  return (
    <>
      <Button onClick={toggle}>Add Transaksi </Button>
      {isOpen && <ModalFormTransaksi onClose={toggle} />}
    </>
  );
};

export default ButtonAddTransaksi;
