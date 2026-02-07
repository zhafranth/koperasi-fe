import { useState } from "react";
import { ChevronDown, CalendarDays, Users, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

import type { KeluargaProps } from "@/api/keluarga/keluarga.interface";
import dayjs from "dayjs";

interface Props {
  data: KeluargaProps;
  onEdit?: (data: KeluargaProps) => void;
  onDelete?: (data: KeluargaProps) => void;
}

const CardKeluarga: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const { nama_kepala_keluarga, created_date, anggota } = data;

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-[#e7e5e0] hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Collapsed header — always visible */}
      <div
        className="flex items-center justify-between gap-4 p-5 cursor-pointer group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 text-[#92400e] flex items-center justify-center shrink-0 group-hover:bg-[#c9a84c]/20 transition-colors">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#1c1917]">{nama_kepala_keluarga}</h3>
            <p className="text-xs text-[#a8a29e] mt-0.5 flex items-center gap-1.5">
              <CalendarDays className="w-3 h-3" />
              {dayjs(created_date).format("DD MMMM YYYY")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#a8a29e] hidden sm:block mr-1">
            {anggota.length} anggota
          </span>
          {onEdit && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(data);
              }}
              className="w-8 h-8 rounded-lg bg-[#f7f5f0] hover:bg-[#145a3f]/10 flex items-center justify-center transition-colors"
            >
              <Pencil className="w-3.5 h-3.5 text-[#78716c]" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(data);
              }}
              className="w-8 h-8 rounded-lg bg-[#f7f5f0] hover:bg-red-50 flex items-center justify-center transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-[#78716c] hover:text-red-500" />
            </button>
          )}
          <div
            className={cn(
              "w-8 h-8 rounded-lg bg-[#f7f5f0] flex items-center justify-center transition-transform duration-300",
              expanded && "rotate-180"
            )}
          >
            <ChevronDown className="w-4 h-4 text-[#78716c]" />
          </div>
        </div>
      </div>

      {/* Expanded content */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 border-t border-[#e7e5e0]">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-[#a8a29e] mt-4 mb-3">
              Anggota Keluarga
            </p>
            <div className="space-y-2">
              {anggota.map((member) => {
                const initials = member.nama
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();
                return (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#f7f5f0] border border-[#e7e5e0]/50"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#145a3f]/10 text-[#145a3f] flex items-center justify-center text-xs font-bold shrink-0">
                      {initials}
                    </div>
                    <span className="text-sm font-medium text-[#1c1917]">
                      {member.nama}
                    </span>
                  </div>
                );
              })}
              {anggota.length === 0 && (
                <p className="text-sm text-[#a8a29e] text-center py-3">
                  Belum ada anggota keluarga
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardKeluarga;
