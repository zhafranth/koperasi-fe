export interface PemasukanProps {
  id: number;
  sumber: "infaq" | "sukarela";
  jumlah: number;
  keterangan: string | null;
  createdAt: string;
  nama_anggota: string;
}

export interface PengeluaranProps {
  id: number;
  sumber: "infaq" | "sukarela";
  jumlah: number;
  keterangan: string | null;
  tanggal: string;
  tahun: string;
}
