export interface AnggotaProps {
  id: number;
  nama: string;
  status: string;
  no_telepon: string;
  jumlah_pinjaman: number;
  saldo_simpanan: number;
}

export interface AnggotaDetailProps {
  id: number;
  nama: string;
  nik: string;
  alamat: string;
  no_telepon: string;
  email: string;
  tgl_gabung: string;
  status: string;
  saldo_simpanan: number;
  username: string;
  jumlah_simpanan: number;
  jumlah_pinjaman: number;
  jumlah_cicilan?: number;
  total_cicilan?: number;
  simpanan: {
    id: number;
    id_jenis: number;
    id_anggota: number;
    jumlah: number;
    tanggal: string;
    bulan: string | null;
    tahun: string | null;
    metode_pembayaran: string;
    status: string;
  }[];
  pinjaman: {
    id: number;
    id_anggota: number;
    jumlah: number;
    createdAt: string;
    status: string;
    keterangan: string;
    sisa?: number;
    id_pengurus: number | null;
  }[];
  keluarga?: {
    id: number;
    nama: string;
    hubungan: string;
    no_telepon: string;
  }[];
  cicilan?: {
    id: number;
    jumlah: number;
    tanggal_bayar: string;
    keterangan: string;
  }[];
}
