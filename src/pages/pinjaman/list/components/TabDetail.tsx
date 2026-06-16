import type { PinjamanAggregatedDetail } from "@/api/pinjaman/pinjaman.interface";
import React, { useState } from "react";
import ItemCicilan from "./ItemCicilan";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { formatDate } from "date-fns";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface Props {
  data?: PinjamanAggregatedDetail;
  changeContent: (content: "detail" | "payment") => void;
}

const TabDetail: React.FC<Props> = ({ data, changeContent }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const {
    nama_anggota,
    total_pinjaman = 0,
    total_sisa = 0,
    total_cicilan = 0,
    status,
    pinjaman = [],
    cicilan = [],
  } = data ?? {};

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <p className="text-gray-500">Nama Peminjam</p>
          <p className="font-medium">{nama_anggota}</p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-gray-500">Jumlah Pinjaman</p>
          <p className="font-medium">{pinjaman.length} pinjaman</p>
        </div>
      </div>

      {status === "lunas" ? (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-2">
              <Check className="text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-green-800">Pembayaran Lunas</h4>
              <p className="text-sm text-green-600">
                Seluruh pinjaman telah dibayar sepenuhnya
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 rounded-lg border bg-gray-50 p-3">
          <div>
            <p className="text-xs text-gray-500">Total Pokok</p>
            <p className="text-sm font-semibold">
              {formatCurrency(total_pinjaman)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Dibayar</p>
            <p className="text-sm font-semibold text-emerald-700">
              {formatCurrency(total_cicilan)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Sisa</p>
            <p className="text-sm font-semibold text-amber-700">
              {formatCurrency(total_sisa)}
            </p>
          </div>
        </div>
      )}

      {pinjaman.length > 0 && (
        <div className="rounded-lg border">
          <button
            type="button"
            className="flex w-full items-center justify-between p-3 text-sm font-medium hover:bg-gray-50"
            onClick={() => setShowBreakdown((v) => !v)}
          >
            <span>Rincian Pinjaman ({pinjaman.length})</span>
            {showBreakdown ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {showBreakdown && (
            <div className="space-y-2 border-t p-3">
              {pinjaman.map((p) => (
                <div
                  key={p.id_pinjaman}
                  className="rounded-md border bg-white p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {p.keterangan || `Pinjaman #${p.id_pinjaman}`}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(p.createdAt, "dd MMM yyyy")}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                        p.status === "lunas"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between text-xs">
                    <span className="text-gray-500">
                      Pokok: {formatCurrency(p.jumlah)}
                    </span>
                    <span className="font-medium text-amber-700">
                      Sisa: {formatCurrency(p.sisa)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {cicilan.length > 0 && (
        <>
          <div className="w-full h-[1px] bg-gray-200" />
          <h4 className="text-sm font-semibold">Riwayat Cicilan</h4>
          {cicilan.map((item, index) => (
            <ItemCicilan
              key={item.id}
              index={cicilan.length - index}
              data={{
                id: item.id,
                id_pinjaman: item.id_pinjaman,
                jumlah: item.jumlah,
                createdAt: item.createdAt,
                keterangan: item.pinjaman_keterangan,
              }}
            />
          ))}
        </>
      )}

      {status === "proses" && (
        <Button
          onClick={() => changeContent("payment")}
          className="w-full rounded-full bg-blue-600 hover:bg-blue-500 hover:cursor-pointer text-white"
        >
          Bayar Cicilan
        </Button>
      )}
    </div>
  );
};

export default TabDetail;
