import { DataTable } from "@/components/Table";
import { columns } from "./Column";
import { useGetTransaksi } from "@/networks/transaksi";

const TransaksiList = () => {
  const { data = [] } = useGetTransaksi();

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TransaksiList;
