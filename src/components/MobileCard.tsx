import EmptyState from "@/components/EmptyState";
import { Inbox } from "lucide-react";

interface MobileCardListProps<TData> {
  data: TData[];
  renderCard: (item: TData, index: number) => React.ReactNode;
  isLoading?: boolean;
}

export function MobileCardList<TData>({
  data,
  renderCard,
  isLoading,
}: MobileCardListProps<TData>) {
  if (isLoading) {
    return (
      <div className="space-y-3 kp-fade-up kp-d2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-[#e7e5e0] p-4 space-y-3"
          >
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-[#e7e5e0] rounded kp-shimmer" />
              <div className="h-5 w-16 bg-[#e7e5e0] rounded-full kp-shimmer" />
            </div>
            <div className="flex justify-between">
              <div className="h-5 w-28 bg-[#e7e5e0] rounded kp-shimmer" />
              <div className="h-4 w-20 bg-[#e7e5e0] rounded kp-shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!data.length) {
    return (
      <EmptyState
        icon={Inbox}
        title="Tidak ada data"
        description="Belum ada data yang tersedia untuk ditampilkan."
      />
    );
  }

  return (
    <div className="space-y-3 kp-fade-up kp-d2">
      {data.map((item, index) => renderCard(item, index))}
    </div>
  );
}
