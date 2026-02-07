import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import type { EventProps } from "@/api/event/event.interface";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

const KATEGORI_COLOR: Record<string, string> = {
  rapat: "text-blue-800 bg-blue-50",
  pelatihan: "text-[#92400e] bg-[#c9a84c]/10",
  sosial: "text-emerald-800 bg-emerald-50",
  silaturahmi: "text-rose-800 bg-rose-50",
  olahraga: "text-cyan-800 bg-cyan-50",
  pendidikan: "text-indigo-800 bg-indigo-50",
  kesehatan: "text-pink-800 bg-pink-50",
  keagamaan: "text-teal-800 bg-teal-50",
  musyawarah: "text-violet-800 bg-violet-50",
  penggalangan_dana: "text-orange-800 bg-orange-50",
};

const KATEGORI_LABEL: Record<string, string> = {
  rapat: "Rapat",
  pelatihan: "Pelatihan",
  sosial: "Sosial",
  silaturahmi: "Silaturahmi",
  olahraga: "Olahraga",
  pendidikan: "Pendidikan",
  kesehatan: "Kesehatan",
  keagamaan: "Keagamaan",
  musyawarah: "Musyawarah",
  penggalangan_dana: "Penggalangan Dana",
};

interface ModalDetailEventProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventProps | null;
}

const ModalDetailEvent = ({ isOpen, onClose, event }: ModalDetailEventProps) => {
  if (!event) return null;

  const categoryColor =
    KATEGORI_COLOR[event.kategori] || "text-gray-800 bg-gray-50";
  const categoryLabel =
    KATEGORI_LABEL[event.kategori] || event.kategori;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl border-[#e7e5e0]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-flex items-center text-[10px] font-semibold px-2.5 py-1 rounded-full ${categoryColor}`}
            >
              {categoryLabel}
            </span>
          </div>
          <DialogTitle className="text-lg text-[#1c1917]">
            {event.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Description */}
          {event.description && (
            <p className="text-sm text-[#78716c] leading-relaxed">
              {event.description}
            </p>
          )}

          {/* Detail Info */}
          <div className="space-y-3 rounded-xl bg-[#f7f5f0] p-4">
            <div className="flex items-center gap-3 text-sm text-[#1c1917]">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <CalendarDays className="w-4 h-4 text-[#145a3f]" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#a8a29e]">
                  Tanggal
                </p>
                <p className="font-medium">
                  {dayjs(event.tanggal).format("dddd, D MMMM YYYY")}
                </p>
              </div>
            </div>

            {event.waktu && (
              <div className="flex items-center gap-3 text-sm text-[#1c1917]">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  <Clock className="w-4 h-4 text-[#145a3f]" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#a8a29e]">
                    Waktu
                  </p>
                  <p className="font-medium">{event.waktu}</p>
                </div>
              </div>
            )}

            {event.location && (
              <div className="flex items-center gap-3 text-sm text-[#1c1917]">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  <MapPin className="w-4 h-4 text-[#145a3f]" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#a8a29e]">
                    Lokasi
                  </p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetailEvent;
