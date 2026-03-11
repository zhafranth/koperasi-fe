import { columns } from "./Column";
import { useGetPenarikan } from "@/networks/penarikan";
import ListLayout from "@/components/ListLayout";
import { useSearchParams } from "react-router-dom";
import { removeEmptyObjectValues } from "@/utils";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import useToggle from "@/hooks/useToggle";
import ModalAddPenarikan from "./components/ModalAddPenarikan";
import { useIsPengurus } from "@/hooks/useAuth";
import type { PenarikanProps } from "@/api/penarikan/penarikan.interface";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { formatDate } from "date-fns";

const SUMBER_FILTER_OPTIONS = [
  { label: "All", value: "*" },
  { label: "Simpanan", value: "simpanan" },
  { label: "Sukarela", value: "sukarela" },
  { label: "Infaq", value: "infaq" },
  { label: "Liburan", value: "liburan" },
];

const SUMBER_LABEL: Record<string, string> = {
  simpanan: "Simpanan",
  sukarela: "Sukarela",
  infaq: "Infaq",
  liburan: "Liburan",
};

const SUMBER_COLOR: Record<string, string> = {
  simpanan: "bg-emerald-100 text-emerald-700",
  sukarela: "bg-violet-100 text-violet-700",
  infaq: "bg-teal-100 text-teal-700",
  liburan: "bg-cyan-100 text-cyan-700",
};

const PenarikanList = () => {
  const [searchParams] = useSearchParams();
  const queryObject = Object.fromEntries([...searchParams]);
  const { isOpen, onOpen, onClose } = useToggle();
  const isPengurus = useIsPengurus();

  const { data = [], isLoading } = useGetPenarikan(
    removeEmptyObjectValues(queryObject)
  );

  const renderMobileCard = (item: PenarikanProps, index: number) => (
    <div
      key={item.id}
      className="bg-white rounded-xl border border-[#e7e5e0] p-4 kp-fade-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-[#1c1917] truncate mr-2">
          {item.nama || "Koperasi"}
        </p>
        <Badge className={`rounded-full ${SUMBER_COLOR[item.sumber] || "bg-gray-100 text-gray-700"}`}>
          {SUMBER_LABEL[item.sumber] || item.sumber}
        </Badge>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-red-600">
          {formatCurrency(Number(item.jumlah))}
        </p>
        <p className="text-xs text-[#a8a29e]">
          {formatDate(new Date(item.tanggal), "dd MMM yyyy")}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <ListLayout
        columns={columns}
        data={data}
        isLoading={isLoading}
        title="Penarikan"
        filters={[
          {
            label: "Sumber",
            options: SUMBER_FILTER_OPTIONS,
            queryKey: "sumber",
          },
        ]}
        extendButtons={
          isPengurus ? (
            <Button
              onClick={onOpen}
              className="bg-gradient-to-r from-[#0d3b2c] to-[#145a3f] hover:from-[#145a3f] hover:to-[#1a6b50] text-white font-medium px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Penarikan
            </Button>
          ) : undefined
        }
        renderMobileCard={renderMobileCard}
      />
      <ModalAddPenarikan isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PenarikanList;
