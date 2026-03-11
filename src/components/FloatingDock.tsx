import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  Users,
  Wallet,
  MoreHorizontal,
  Home,
  ArrowDownToLine,
  LogOut,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const dockItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Transaksi", icon: Receipt, path: "/transaksi" },
  { title: "Anggota", icon: Users, path: "/anggota" },
  { title: "Pinjaman", icon: Wallet, path: "/pinjaman?status=proses" },
];

const moreItems = [
  { title: "Keluarga", icon: Home, path: "/keluarga" },
  { title: "Penarikan", icon: ArrowDownToLine, path: "/penarikan" },
];

interface FloatingDockProps {
  onLogout: () => void;
}

const FloatingDock = ({ onLogout }: FloatingDockProps) => {
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setShowMore(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) =>
    location.pathname.replace("/dashboard", "").includes(path);

  // Check if any "more" item is active
  const isMoreActive = moreItems.some((item) => isActive(item.path));

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
      {/* More popover */}
      {showMore && (
        <div
          ref={moreRef}
          className="absolute bottom-full mb-3 right-0 bg-[#0d3b2c]/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-2 min-w-[160px] kp-fade-up"
        >
          {moreItems.map((item) => (
            <Link
              key={item.path}
              to={`/dashboard${item.path}`}
              onClick={() => setShowMore(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                isActive(item.path)
                  ? "text-[#c9a84c] bg-[#c9a84c]/15"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
          <div className="h-px bg-white/10 my-1" />
          <button
            type="button"
            onClick={() => {
              setShowMore(false);
              onLogout();
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-white/10 transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}

      {/* Dock bar */}
      <div className="flex items-center gap-1 bg-black/70 backdrop-blur-xl rounded-full px-3 py-2 shadow-2xl border border-white/10">
        {dockItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={`/dashboard${item.path}`}
              className="flex flex-col items-center justify-center w-14 h-12 rounded-full transition-colors"
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  active ? "text-[#c9a84c]" : "text-white/50"
                )}
              />
              {active && (
                <div className="w-1 h-1 rounded-full bg-[#c9a84c] mt-1" />
              )}
            </Link>
          );
        })}

        {/* More button */}
        <button
          type="button"
          onClick={() => setShowMore(!showMore)}
          className="flex flex-col items-center justify-center w-14 h-12 rounded-full transition-colors"
        >
          <MoreHorizontal
            className={cn(
              "h-5 w-5 transition-colors",
              showMore || isMoreActive ? "text-[#c9a84c]" : "text-white/50"
            )}
          />
          {isMoreActive && !showMore && (
            <div className="w-1 h-1 rounded-full bg-[#c9a84c] mt-1" />
          )}
        </button>
      </div>
    </div>
  );
};

export default FloatingDock;
