import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => (
  <div className="kp-fade-up flex flex-col items-center justify-center py-16 px-6">
    {/* Decorative circles + icon */}
    <div className="relative mb-6">
      <div className="absolute inset-0 w-24 h-24 rounded-full bg-[#145a3f]/5 scale-150" />
      <div className="absolute inset-0 w-24 h-24 rounded-full bg-[#c9a84c]/8 scale-[1.15]" />
      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#f5f0e8] to-[#e7e5e0] flex items-center justify-center border border-[#e7e5e0]">
        <Icon className="w-10 h-10 text-[#a8a29e]" strokeWidth={1.5} />
      </div>
    </div>

    <h3 className="text-lg font-semibold text-[#1c1917] mb-1 font-serif">
      {title}
    </h3>
    {description && (
      <p className="text-sm text-[#a8a29e] text-center max-w-xs">
        {description}
      </p>
    )}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export default EmptyState;
