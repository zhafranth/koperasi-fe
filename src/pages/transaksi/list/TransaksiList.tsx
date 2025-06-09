import { columns } from "./Column";
import { useGetTransaksi } from "@/networks/transaksi";
import ListLayout from "@/components/ListLayout";

const TransaksiList = () => {
  const { data = [] } = useGetTransaksi();

  return (
    <>
      <ListLayout columns={columns} data={data} title="Transaksi" />
    </>
  );
};

export default TransaksiList;
