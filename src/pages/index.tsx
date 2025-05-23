import ChartKoperasi from "@/components/ChartsKoperasi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Wallet, PiggyBank, BadgeDollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="p-6 container mx-auto py-10 dark:bg-slate-950 dark:text-white min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          Dashboard Koperasi
        </h1>
        <Button
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          onClick={navigateToLogin}
        >
          <Users className="h-5 w-5" />
          Login
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-blue-100 hover:via-blue-50 hover:to-slate-50 bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-blue-900/30 dark:via-slate-900 dark:to-slate-800 dark:hover:from-blue-800/50 dark:hover:via-slate-800 dark:hover:to-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Anggota</CardTitle>
            <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              Aktif: 150 orang
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-green-100 hover:via-green-50 hover:to-slate-50 bg-gradient-to-br from-green-50 via-white to-slate-50 dark:from-green-900/30 dark:via-slate-900 dark:to-slate-800 dark:hover:from-green-800/50 dark:hover:via-slate-800 dark:hover:to-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kas</CardTitle>
            <div className="p-2 bg-green-100 rounded-full dark:bg-green-900">
              <Wallet className="h-4 w-4 text-green-600 dark:text-green-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 50.000.000</div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
              <span className="text-lg">↑</span>
              +20% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-purple-100 hover:via-purple-50 hover:to-slate-50 bg-gradient-to-br from-purple-50 via-white to-slate-50 dark:from-purple-900/30 dark:via-slate-900 dark:to-slate-800 dark:hover:from-purple-800/50 dark:hover:via-slate-800 dark:hover:to-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pinjaman
            </CardTitle>
            <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900">
              <BadgeDollarSign className="h-4 w-4 text-purple-600 dark:text-purple-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 35.000.000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="flex h-2 w-2 rounded-full bg-yellow-500"></span>
              10 pinjaman aktif
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-orange-100 hover:via-orange-50 hover:to-slate-50 bg-gradient-to-br from-orange-50 via-white to-slate-50 dark:from-orange-900/30 dark:via-slate-900 dark:to-slate-800 dark:hover:from-orange-800/50 dark:hover:via-slate-800 dark:hover:to-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Simpanan
            </CardTitle>
            <div className="p-2 bg-orange-100 rounded-full dark:bg-orange-900">
              <PiggyBank className="h-4 w-4 text-orange-600 dark:text-orange-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 45.000.000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
              Dari 120 anggota
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-x-6 my-6 h-[50vh]">
        <ChartKoperasi />

        <Card className="w-full bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 hover:shadow-xl transition-all duration-300">
          <CardHeader className="border-b dark:border-slate-700">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BadgeDollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
              Pembayaran Iuran Bulan Ini
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(50vh-4rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
            <div className="space-y-4 py-2">
              {/* This would typically come from an API/database */}
              {[
                {
                  name: "Ahmad Dahlan",
                  date: "2024-01-05",
                  amount: "Rp 100.000",
                },
                {
                  name: "Budi Santoso",
                  date: "2024-01-03",
                  amount: "Rp 100.000",
                },
                {
                  name: "Citra Dewi",
                  date: "2024-01-02",
                  amount: "Rp 100.000",
                },
                {
                  name: "David Wijaya",
                  date: "2024-01-01",
                  amount: "Rp 100.000",
                },
              ].map((payment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-slate-50 dark:hover:from-green-900/20 dark:hover:to-slate-800 transition-all duration-300 hover:shadow-md hover:border-green-200 dark:hover:border-green-800 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900 dark:to-emerald-800 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                      <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-base group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
                        {payment.name}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        {payment.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-base group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
                      {payment.amount}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 flex items-center justify-end gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 text-xs font-medium">
                        Lunas
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
