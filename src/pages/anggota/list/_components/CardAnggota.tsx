import type { AnggotaProps } from "@/api/anggota/anggota.interface";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Props {
  data: AnggotaProps;
  onEdit?: (id: number) => void;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const CardAnggota: React.FC<Props> = ({ data, onEdit }) => {
  const { id, nama, no_telepon, saldo_simpanan, jumlah_pinjaman } = data ?? {};
  const navigate = useNavigate();

  const handleDetail = () => navigate(`/dashboard/anggota/${id}`);
  return (
    <div
      className="bg-white rounded-2xl p-5 shadow-sm border border-[#e7e5e0] hover:shadow-lg hover:cursor-pointer transition-all duration-300 group"
      onClick={handleDetail}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 text-[#92400e] flex items-center justify-center text-sm font-bold shrink-0 group-hover:bg-[#c9a84c]/20 transition-colors font-serif">
            {getInitials(nama)}
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#1c1917]">{nama}</h3>
            <p className="text-xs text-[#a8a29e] mt-0.5">{no_telepon}</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider font-medium text-[#a8a29e]">
              Saldo Simpanan
            </p>
            <p className="text-base font-bold text-emerald-700">
              {formatCurrency(saldo_simpanan)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider font-medium text-[#a8a29e]">
              Total Pinjaman
            </p>
            <p className="text-base font-bold text-amber-700">
              {formatCurrency(jumlah_pinjaman)}
            </p>
          </div>
          {onEdit && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(id);
              }}
              className="w-9 h-9 rounded-xl bg-[#f7f5f0] hover:bg-[#145a3f]/10 flex items-center justify-center text-[#78716c] hover:text-[#145a3f] transition-colors shrink-0"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardAnggota;
