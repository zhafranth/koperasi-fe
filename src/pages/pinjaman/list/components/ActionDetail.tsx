import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetPinjamanDetail } from "@/networks/pinjaman";
import type { PinjamanProps } from "@/api/pinjaman/pinjaman.interface";
import { useState } from "react";
import TabDetail from "./TabDetail";
import TabPayment from "./TabPayment";
import { Button } from "@/components/ui/button";
import { ArrowLeft, EyeIcon } from "lucide-react";
import useToggle from "@/hooks/useToggle";

interface Props {
  data: PinjamanProps;
}

const ActionDetail: React.FC<Props> = ({ data }) => {
  const { isOpen, toggle } = useToggle();
  const [contentMode, setContentMode] = useState<"detail" | "payment">(
    "detail"
  );
  const { id } = data ?? {};
  const { data: detail } = useGetPinjamanDetail(id);

  const handleChangeContent = (content: "detail" | "payment") => {
    setContentMode(content);
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger asChild>
        <Button className="bg-blue-100 text-blue-500 hover:text-white hover:cursor-pointer hover:bg-blue-400">
          <EyeIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
      </DialogContent>
    </Dialog>
  );
};

export default ActionDetail;
