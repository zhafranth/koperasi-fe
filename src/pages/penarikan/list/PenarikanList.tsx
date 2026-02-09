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

const SUMBER_FILTER_OPTIONS = [
  { label: "All", value: "*" },
  { label: "Simpanan", value: "simpanan" },
  { label: "Sukarela", value: "sukarela" },
  { label: "Infaq", value: "infaq" },
  { label: "Liburan", value: "liburan" },
];

const PenarikanList = () => {
  const [searchParams] = useSearchParams();
  const queryObject = Object.fromEntries([...searchParams]);
  const { isOpen, onOpen, onClose } = useToggle();
  const isPengurus = useIsPengurus();

  const { data = [], isLoading } = useGetPenarikan(
    removeEmptyObjectValues(queryObject)
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
      />
      <ModalAddPenarikan isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PenarikanList;
