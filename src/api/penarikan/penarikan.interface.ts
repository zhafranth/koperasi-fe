export interface PenarikanProps {
  id: number;
  id_anggota: number;
  nama: string;
  jumlah: number;
  tanggal: string;
  tahun: string | null;
  sumber: "simpanan" | "sukarela" | "infaq" | "liburan";
  keterangan: string | null;
}

export interface CreatePenarikanPayload {
  id_anggota: number;
  jumlah: number;
  sumber: "simpanan" | "sukarela" | "infaq" | "liburan";
  keterangan?: string;
}

export interface SaldoPenarikanProps {
  saldo: number;
}
