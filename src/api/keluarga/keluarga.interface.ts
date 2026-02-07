export interface KeluargaAnggotaProps {
  id: number;
  id_keluarga: number;
  nama: string;
  nik: string;
  no_telepon: string;
  status: string;
}

export interface KeluargaProps {
  id_keluarga: number;
  nama_kepala_keluarga: string;
  tgl_gabung: string | null;
  created_date: string;
  anggota: KeluargaAnggotaProps[];
}

export interface CreateKeluargaPayload {
  nama_kepala_keluarga: string;
  list_id_anggota: number[];
}

export type UpdateKeluargaPayload = CreateKeluargaPayload;
