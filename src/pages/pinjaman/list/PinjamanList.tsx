import { columns } from "./Column";
import { useGetPinjaman } from "@/networks/pinjaman";
import { useSearchParams } from "react-router-dom";
import ListLayout from "@/components/ListLayout";
import ButtonAddPinjaman from "./components/ButtonAddPinjaman";

const PinjamanList = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "";

  const { data = [] } = useGetPinjaman({ status });
  return (
    <>
      <ListLayout
        columns={columns}
        data={data}
        title="Pinjaman"
        filters={[
          {
            queryKey: "status",
            label: "Status",
            options: [
              {
                value: "lunas",
                label: "Lunas",
              },
              {
                value: "disetujui",
                label: "Disetujui",
              },
              {
                value: "ditolak",
                label: "Ditolak",
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
