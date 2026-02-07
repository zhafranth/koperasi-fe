export interface InfaqProps {
  id: number;
  id_anggota: number;
  nama: string;
  jumlah: number;
  jenis: "masuk" | "keluar";
  keterangan: string | null;
  createdAt: string;
}

export interface CreateInfaqPayload {
  id_anggota: number;
  jumlah: number;
  jenis: "masuk" | "keluar";
  keterangan?: string;
}
