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

  const isAuthenticated = !!localStorage.getItem("token"); // atau cek dari context/auth store

  const logout = () => {
    // Logout logic
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
      path: "/pinjaman",
    },
    {
      title: "Simpanan",
      icon: PiggyBank,
      path: "/simpanan",
    },
  ];

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 md:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 w-64 bg-white border-r shadow-sm transform transition-transform duration-200 ease-in-out z-40 flex flex-col",
          {
            "-translate-x-full md:translate-x-0": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
      >
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600 transition-all duration-300 hover:scale-110 hover:rotate-6 cursor-pointer" />
            <h2 className="text-xl font-bold text-gray-800">Koperasi App</h2>
          </div>
        </div>
        {/* Navigation Menu */}
        <nav className="flex-1 space-y-3.5 p-4">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={`/dashboard${menu.path}`}
              onClick={() => setIsOpen(false)}
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full mb-2 justify-start gap-3 h-12 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1 text-gray-600 rounded-lg",
                  {
                    "bg-blue-50 text-blue-600 font-medium shadow-sm ring-1 ring-blue-100":
                      location.pathname
                        .replace("/dashboard", "")
                        .includes(menu.path),
                  }
                )}
              >
                <menu.icon
                  className={cn("h-5 w-5", {
                    "text-blue-500": location.pathname
                      .replace("/dashboard", "")
                      .includes(menu.path),
                  })}
                />
                {menu.title}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="border-t p-5 bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="flex items-center space-x-3 mb-5">
            <div className="w-11 h-11 rounded-full bg-white shadow-sm ring-1 ring-gray-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">John Doe</p>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
          </div>
          <Button
            variant="destructive"
            className="w-full gap-2 transition-all duration-200 hover:scale-[0.98] active:scale-95 bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 shadow-sm"
            size="sm"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
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
