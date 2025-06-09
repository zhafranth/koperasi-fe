import type { PinjamanDetailProps } from "@/api/pinjaman/pinjaman.interface";
import React from "react";
import ItemCicilan from "./ItemCicilan";
import { Check } from "lucide-react";
import { formatDate } from "date-fns";
import { Button } from "@/components/ui/button";

interface Props {
  data?: PinjamanDetailProps;
  changeContent: (content: "detail" | "payment") => void;
}

const TabDetail: React.FC<Props> = ({ data, changeContent }) => {
  const {
    cicilan = [],
    nama_anggota,
    keterangan,
    jumlah,
    sisa,
    status,
    tanggal_pengajuan,
  } = data ?? {};
  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <p className="text-gray-500">Nama Peminjam</p>
          <p className="font-medium">{nama_anggota}</p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-gray-500">Tanggal Pinjaman</p>
          <p className="font-medium">
            {tanggal_pengajuan
              ? formatDate(tanggal_pengajuan, "dd MMMM yyyy")
              : "-"}
          </p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-gray-500">Keterangan</p>
          <p className="font-medium">{keterangan}</p>
        </div>
      </div>

      {status === "disetujui" && (
        <Button
          onClick={() => changeContent("payment")}
          className="w-full rounded-full bg-blue-600 hover:bg-blue-500 hover:cursor-pointer text-white"
        >
          Bayar Cicilan
        </Button>
      )}

      {cicilan.map((item, index) => {
        return <ItemCicilan index={index + 1} key={index} data={item} />;
      })}

      <div className="w-full h-[1px] bg-gray-200" />

      {status === "lunas" ? (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-2">
              <Check className="text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-green-800">Pembayaran Lunas</h4>
              <p className="text-sm text-green-600">
                Seluruh cicilan telah dibayar sepenuhnya
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className=" flex items-center justify-between pt-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Cicilan</p>
            <p className="text-lg font-semibold">Rp {jumlah}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Sisa Cicilan</p>
            <p className="text-lg font-semibold">Rp {sisa}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabDetail;
