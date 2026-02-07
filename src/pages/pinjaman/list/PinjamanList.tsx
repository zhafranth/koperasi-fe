import { columns } from "./Column";
import { useGetPinjaman } from "@/networks/pinjaman";
import { useSearchParams } from "react-router-dom";
import ListLayout from "@/components/ListLayout";
import ButtonAddPinjaman from "./components/ButtonAddPinjaman";

const PinjamanList = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "";

  const { data = [], isLoading } = useGetPinjaman({ status });
  return (
    <>
      <ListLayout
        columns={columns}
        data={data}
        isLoading={isLoading}
        title="Pinjaman"
        filters={[
          {
            queryKey: "status",
            label: "Status",
            options: [
              {
                value: "proses",
                label: "Proses",
              },
              {
                value: "lunas",
                label: "Lunas",
              },
            ],
          },
        ]}
        extendButtons={<ButtonAddPinjaman />}
      />
    </>
  );
};

export default PinjamanList;
