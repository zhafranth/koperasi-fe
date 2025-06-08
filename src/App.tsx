import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";
import { Route, Routes } from "react-router-dom";
import Home from "./pages";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Anggota from "./pages/anggota/list";
import AnggotaDetail from "./pages/anggota/detail";
import Transaksi from "./pages/transaksi/list";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="dashboard" element={<div>dashboard</div>} />
          <Route path="transaksi" element={<Transaksi />} />
          <Route path="anggota" element={<Anggota />} />
          <Route path="anggota/:id" element={<AnggotaDetail />} />
          <Route path="pinjaman" element={<div>pinjaman</div>} />
          <Route path="simpanan" element={<div>simpanan</div>} />
        </Route>
      </Routes>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
