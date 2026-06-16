import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetAggregatedPinjamanByAnggota } from "@/networks/pinjaman";
import type { PinjamanAggregatedListItem } from "@/api/pinjaman/pinjaman.interface";
import { useState } from "react";
import TabDetail from "./TabDetail";
import TabPayment from "./TabPayment";
import { Button } from "@/components/ui/button";
import { ArrowLeft, EyeIcon } from "lucide-react";
import useToggle from "@/hooks/useToggle";
import { useIsPengurus } from "@/hooks/useAuth";

interface Props {
  data: PinjamanAggregatedListItem;
}

const ActionDetail: React.FC<Props> = ({ data }) => {
  const { isOpen, toggle } = useToggle();
  const isPengurus = useIsPengurus();
  const [contentMode, setContentMode] = useState<"detail" | "payment">(
    "detail",
  );
  const { id_anggota } = data ?? {};
  const { data: detail } = useGetAggregatedPinjamanByAnggota(id_anggota, {
    enabled: !!id_anggota && isOpen,
  });

  const handleChangeContent = (content: "detail" | "payment") => {
    setContentMode(content);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        toggle();
        setContentMode("detail");
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-blue-100 text-blue-500 hover:text-white hover:cursor-pointer hover:bg-blue-400">
          <EyeIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center ">
          {contentMode === "payment" && (
            <Button
              className="bg-transparent hover:bg-gray hover:cursor-pointer text-neutral-900 shadow-none"
              size="sm"
              onClick={() => handleChangeContent("detail")}
            >
              <ArrowLeft />
            </Button>
          )}
          <DialogTitle>
            {contentMode === "detail" ? "Detail Pinjaman" : "Bayar Cicilan"}
          </DialogTitle>
        </DialogHeader>

        {contentMode === "detail" && (
          <TabDetail data={detail} changeContent={handleChangeContent} />
        )}
        {contentMode === "payment" && (
          <TabPayment data={detail} changeContent={handleChangeContent} />
        )}
        {contentMode === "detail" &&
          detail?.status === "proses" &&
          isPengurus && (
            <Button
              className="bg-transparent hover:bg-gray hover:cursor-pointer text-neutral-900 shadow-none"
              size="sm"
              onClick={() => handleChangeContent("payment")}
            >
              Bayar cicilan
            </Button>
          )}
      </DialogContent>
    </Dialog>
  );
};

export default ActionDetail;
