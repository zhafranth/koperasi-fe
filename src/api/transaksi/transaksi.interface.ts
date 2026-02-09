export interface TransaksiProps {
  id: number;
  id_anggota: number;
  jenis: string;
  jumlah: number;
  tanggal: string;
  keterangan: string | null;
  saldo_akhir: number;
  nama_anggota: string;
}

export interface TransaksiTotalProps {
  total_anggota: number;
  jumlah_dana: number;
  jumlah_pinjaman: number;
  jumlah_simpanan_sukarela: number;
  jumlah_tabungan_liburan: number;
  total_dana: number;
}
