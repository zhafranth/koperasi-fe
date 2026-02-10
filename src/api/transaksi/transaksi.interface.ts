export interface TransaksiProps {
  id: number;
  id_anggota: number | null;
  jenis: string;
  jumlah: number;
  createdAt: string;
  keterangan: string | null;
  nama_anggota: string | null;
}

export interface TransaksiTotalProps {
  total_anggota: number;
  jumlah_dana: number;
  jumlah_pinjaman: number;
  jumlah_simpanan_sukarela: number;
  jumlah_infaq: number;
  jumlah_tabungan_liburan: number;
  total_dana: number;
}
