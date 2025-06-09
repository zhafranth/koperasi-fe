import { DataTable } from "@/components/Table";
import { columns } from "./Column";
import { useGetPinjaman } from "@/networks/pinjaman";
import Filter from "@/components/Filter";
import { useSearchParams } from "react-router-dom";

const PinjamanList = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "";

  const { data = [] } = useGetPinjaman({ status });
  return (
    <div>
      <Filter
        queryKey="status"
        label="Status"
        options={[
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
        ]}
        className="mb-5"
      />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PinjamanList;
