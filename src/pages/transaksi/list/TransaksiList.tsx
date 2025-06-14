import { columns } from "./Column";
import { useGetTransaksi } from "@/networks/transaksi";
import ListLayout from "@/components/ListLayout";
import InfoTotal from "./components/InfoTotal";
import { TRANSAKSI_OPTIONS } from "@/constant/transaksi";
import { useSearchParams } from "react-router-dom";
import { removeEmptyObjectValues } from "@/utils";

const TransaksiList = () => {
  const [searchParams] = useSearchParams();
  const queryObject = Object.fromEntries([...searchParams]);

  const { data } = useGetTransaksi(removeEmptyObjectValues(queryObject));
  const { data: items = [], pagination } = data || {};

  console.log("pagination", pagination);
  return (
    <>
      <ListLayout
        columns={columns}
        data={items}
        title="Transaksi"
        filters={[
          {
            label: "Jenis",
            options: [
              {
                label: "All",
                value: "*",
              },
              ...TRANSAKSI_OPTIONS.map((item) => ({
                label: item.label,
                value: item.key,
              })),
            ],
            queryKey: "jenis",
          },
        ]}
        extraComponents={<InfoTotal />}
        pagination={pagination}
      />
    </>
  );
};

export default TransaksiList;
