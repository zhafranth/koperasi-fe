import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";
import { Route, Routes } from "react-router-dom";
import Home from "./pages";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Anggota from "./pages/anggota/list";
import AnggotaDetail from "./pages/anggota/detail";
import Transaksi from "./pages/transaksi/list";
import Pinjaman from "./pages/pinjaman/list";
import AnggotaPublicDetail from "./pages/anggota/public";
import Keluarga from "./pages/keluarga/list";
import DashboardHome from "./pages/dashboard/DashboardHome";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/anggota/:id" element={<AnggotaPublicDetail />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="transaksi" element={<Transaksi />} />
          <Route path="anggota" element={<Anggota />} />
          <Route path="anggota/:id" element={<AnggotaDetail />} />
          <Route path="pinjaman" element={<Pinjaman />} />
          <Route path="simpanan" element={<div>simpanan</div>} />
          <Route path="keluarga" element={<Keluarga />} />
        </Route>
      </Routes>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
