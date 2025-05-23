import { Card, CardContent } from "@/components/ui/card";
import type { AnggotaProps } from "@/api/anggota/anggota.interface";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  data: AnggotaProps;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const CardAnggota: React.FC<Props> = ({ data }) => {
  const { id, nama, no_telepon, saldo_simpanan, jumlah_pinjaman } = data ?? {};
  const navigate = useNavigate();

  const handleDetail = () => navigate(`/dashboard/anggota/${id}`);
  return (
    <Card
      key={id}
      className="hover:shadow-lg hover:cursor-pointer transition-all duration-300 hover:border-emerald-200 group"
      onClick={handleDetail}
    >
      <CardContent className="px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 w-12 h-12 rounded-full group-hover:bg-emerald-200 transition-colors flex items-center justify-center">
              <span className="text-xl font-semibold text-emerald-600">
                {getInitials(nama)}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{nama}</h3>
              <p className="text-sm text-gray-500">{no_telepon}</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-sm text-gray-500">Saldo Simpanan</p>
              <p className="text-lg font-bold text-emerald-600">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(saldo_simpanan)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Pinjaman</p>
              <p className="text-lg font-bold text-red-600">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(jumlah_pinjaman)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardAnggota;
