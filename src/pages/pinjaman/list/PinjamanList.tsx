import { DataTable } from "@/components/Table";
import { columns } from "./Column";
import { useGetPinjaman } from "@/networks/pinjaman";

const PinjamanList = () => {
  const { data = [] } = useGetPinjaman();
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PinjamanList;
