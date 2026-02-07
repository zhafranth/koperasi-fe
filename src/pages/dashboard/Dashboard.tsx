import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Receipt,
  PiggyBank,
  Wallet,
  Menu,
  X,
  LogOut,
  Building2,
} from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menus = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      title: "Transaksi",
      icon: Receipt,
      path: "/transaksi",
    },
    {
      title: "Anggota",
      icon: Users,
      path: "/anggota",
    },
    {
      title: "Pinjaman",
      icon: Wallet,
      path: "/pinjaman?status=disetujui",
    },
    {
      title: "Simpanan",
      icon: PiggyBank,
      path: "/simpanan",
    },
  ];

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="flex h-screen bg-[#f7f5f0]">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 md:hidden z-50 text-white hover:bg-white/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 w-64 bg-gradient-to-b from-[#0d3b2c] via-[#145a3f] to-[#0d3b2c] transform transition-transform duration-300 ease-in-out z-40 flex flex-col shadow-xl",
          {
            "-translate-x-full md:translate-x-0": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c] flex items-center justify-center shadow-lg">
              <Building2 className="w-5 h-5 text-[#0d3b2c]" />
            </div>
            <h2 className="text-lg font-bold text-white font-serif">
              Koperasi
            </h2>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menus.map((menu) => {
            const isActive = location.pathname
              .replace("/dashboard", "")
              .includes(menu.path);
            return (
              <Link
                key={menu.path}
                to={`/dashboard${menu.path}`}
                onClick={() => setIsOpen(false)}
              >
                <div
                  className={cn(
                    "flex items-center gap-3 h-11 px-4 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-[#c9a84c]/15 text-[#c9a84c]"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <menu.icon
                    className={cn(
                      "h-[18px] w-[18px]",
                      isActive ? "text-[#c9a84c]" : ""
                    )}
                  />
                  {menu.title}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Profile Section */}
        <div className="border-t border-white/10 p-5">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c] flex items-center justify-center text-sm font-bold text-[#0d3b2c] font-serif">
              JD
            </div>
            <div>
              <p className="font-semibold text-sm text-white">John Doe</p>
              <p className="text-xs text-white/40">Admin</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full gap-2 h-10 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 justify-start"
            size="sm"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
