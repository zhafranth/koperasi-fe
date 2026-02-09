export interface PinjamanProps {
  id_pinjaman: number;
  id_anggota: number;
  jumlah: number;
  createdAt: string;
  tanggal_disetujui: string;
  tanggal_jatuh_tempo: string | null;
  status: string;
  keterangan: string;
  id_pengurus: number | null;
  nama_anggota: string;
}

export interface CicilanProps {
  id: number;
  id_pinjaman: number;
  jumlah: number;
  createdAt: string;
  keterangan: string;
}

export interface PinjamanDetailProps extends PinjamanProps {
  sisa: number;
  cicilan: CicilanProps[];
}

export interface CreatePinjamanPayload {
  id_anggota: number;
  jumlah: number;
  keterangan?: string;
}

export interface LimitPinjamanProps {
  simpanan_keluarga: number;
  max_pinjaman: number;
  pinjaman_aktif: number;
  sisa_limit: number;
}
