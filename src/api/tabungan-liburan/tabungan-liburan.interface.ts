export interface TabunganLiburanProps {
  id: number;
  id_anggota: number;
  nama: string;
  jumlah: number;
  tanggal: string;
  keterangan: string | null;
  createdAt: string;
}

export interface CreateTabunganLiburanPayload {
  id_anggota: number;
  jumlah: number;
  tanggal?: string;
  keterangan?: string;
}
