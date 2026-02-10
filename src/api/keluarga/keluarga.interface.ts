export interface KeluargaAnggotaProps {
  id: number;
  id_keluarga: number;
  nama: string;
  nik: string;
  no_telepon: string;
  status: string;
  total_simpanan: number;
  jumlah_pinjaman: number;
  jumlah_sukarela: number;
  jumlah_tabungan_liburan: number;
}

export interface KeluargaProps {
  id_keluarga: number;
  nama_kepala_keluarga: string;
  tgl_gabung: string | null;
  created_date: string;
  total_simpanan: number;
  total_pinjaman: number;
  total_sukarela: number;
  total_tabungan_liburan: number;
  anggota: KeluargaAnggotaProps[];
}

export interface CreateKeluargaPayload {
  nama_kepala_keluarga: string;
  list_id_anggota: number[];
}

export type UpdateKeluargaPayload = CreateKeluargaPayload;
