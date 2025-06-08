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
