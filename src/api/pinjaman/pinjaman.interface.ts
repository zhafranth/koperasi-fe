export interface PinjamanProps {
  id: number;
  id_anggota: number;
  jumlah: number;
  tanggal_pengajuan: string;
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
  tanggal_bayar: string;
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
