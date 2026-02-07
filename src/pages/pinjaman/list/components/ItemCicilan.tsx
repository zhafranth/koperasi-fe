import type { CicilanProps } from "@/api/pinjaman/pinjaman.interface";
import { formatDate } from "date-fns";

interface Props {
  data: CicilanProps;
  index: number;
}

const ItemCicilan: React.FC<Props> = ({ data, index }) => {
  const { jumlah, createdAt } = data ?? {};
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Cicilan #{index}</h3>
          <p className="text-sm text-gray-500">
            Tanggal Bayar: {formatDate(createdAt, "dd MMM yyyy")}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium">Rp {jumlah}</p>
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            Lunas
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemCicilan;
