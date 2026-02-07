import { cn } from "@/lib/utils";

/* ── Primitives ── */

export const SkeletonLine = ({
  className,
}: {
  className?: string;
}) => <div className={cn("kp-shimmer rounded-lg h-4 w-full", className)} />;

export const SkeletonCircle = ({
  className,
}: {
  className?: string;
}) => (
  <div className={cn("kp-shimmer rounded-full w-12 h-12 shrink-0", className)} />
);

/* ── Card skeleton — mirrors CardAnggota ── */

export const SkeletonCard = () => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e7e5e0]">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <SkeletonCircle className="w-12 h-12 rounded-xl" />
        <div className="space-y-2">
          <SkeletonLine className="h-4 w-36" />
          <SkeletonLine className="h-3 w-24" />
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="space-y-2 text-right">
          <SkeletonLine className="h-2.5 w-20 ml-auto" />
          <SkeletonLine className="h-5 w-28" />
        </div>
        <div className="space-y-2 text-right">
          <SkeletonLine className="h-2.5 w-20 ml-auto" />
          <SkeletonLine className="h-5 w-28" />
        </div>
      </div>
    </div>
  </div>
);

/* ── Table skeleton — mirrors DataTable ── */

export const SkeletonTableRows = ({
  columns = 4,
  rows = 5,
}: {
  columns?: number;
  rows?: number;
}) => (
  <>
    {Array.from({ length: rows }).map((_, rowIdx) => (
      <tr key={rowIdx} className="border-b border-[#e7e5e0] last:border-b-0">
        {Array.from({ length: columns }).map((_, colIdx) => (
          <td key={colIdx} className="py-4 px-4">
            <SkeletonLine
              className={cn(
                "h-4",
                colIdx === 0 ? "w-32" : colIdx === columns - 1 ? "w-20" : "w-24"
              )}
            />
          </td>
        ))}
      </tr>
    ))}
  </>
);

/* ── Detail page skeleton — mirrors AnggotaDetail ── */

export const SkeletonDetail = () => (
  <div className="space-y-6">
    {/* Back button area */}
    <div className="kp-fade-up">
      <SkeletonLine className="h-9 w-28 rounded-xl" />
    </div>

    {/* Member Info Card */}
    <div className="kp-fade-up kp-d1 bg-white rounded-2xl shadow-sm border border-[#e7e5e0] overflow-hidden">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-[#0d3b2c] via-[#145a3f] to-[#1a6b50] px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-white/10 animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-40 rounded-lg bg-white/15 animate-pulse" />
            <div className="h-3 w-24 rounded-lg bg-white/10 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Info rows */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <SkeletonLine className="h-4 w-36" />
                <SkeletonLine className="h-4 w-40" />
              </div>
            ))}
          </div>
          <div className="space-y-5">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4">
                <SkeletonLine className="h-4 w-36" />
                <SkeletonLine className="h-4 w-40" />
              </div>
            ))}
          </div>
        </div>

        {/* Financial summary */}
        <div className="border-t border-[#e7e5e0] mt-6 pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100/50">
              <SkeletonLine className="h-3 w-24 mb-3 bg-emerald-100" />
              <SkeletonLine className="h-7 w-36 bg-emerald-100" />
            </div>
            <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100/50">
              <SkeletonLine className="h-3 w-24 mb-3 bg-amber-100" />
              <SkeletonLine className="h-7 w-36 bg-amber-100" />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Tabs skeleton */}
    <div className="kp-fade-up kp-d3 bg-white rounded-2xl shadow-sm border border-[#e7e5e0] p-6">
      <div className="flex gap-2 h-12 p-1 bg-[#f7f5f0] rounded-xl mb-6">
        <SkeletonLine className="flex-1 rounded-lg" />
        <SkeletonLine className="flex-1 rounded-lg" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-xl border border-[#e7e5e0]"
          >
            <div className="flex items-center gap-4">
              <SkeletonCircle className="w-10 h-10 rounded-xl" />
              <div className="space-y-2">
                <SkeletonLine className="h-3 w-20" />
                <SkeletonLine className="h-4 w-32" />
              </div>
            </div>
            <SkeletonLine className="h-5 w-24" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
