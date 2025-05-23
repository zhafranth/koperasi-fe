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
  tanggal_bergabung: string;
  status: string;
  saldo_simpanan: number;
  username: string;
  jumlah_pinjaman: number;
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
    tanggal_pengajuan: string;
    tanggal_disetujui: string;
    tanggal_jatuh_tempo: string | null;
    status: string;
    keterangan: string;
    id_pengurus: number | null;
  }[];
}
