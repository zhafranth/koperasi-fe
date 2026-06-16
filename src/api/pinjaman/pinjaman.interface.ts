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

// Aggregated list row: one per anggota that has any pinjaman record.
export interface PinjamanAggregatedListItem {
  id_anggota: number;
  nama_anggota: string;
  total_pinjaman: number;
  total_sisa: number;
  total_cicilan: number;
  count_aktif: number;
  count_lunas: number;
  status: "proses" | "lunas";
  last_createdAt: string;
}

// Aggregated detail per anggota: rolled-up totals + per-pinjaman breakdown
// (so the UI can show an expandable section) + full cicilan history.
export interface PinjamanAggregatedDetail {
  id_anggota: number;
  nama_anggota: string;
  total_pinjaman: number;
  total_sisa: number;
  total_cicilan: number;
  status: "proses" | "lunas";
  pinjaman: {
    id_pinjaman: number;
    jumlah: number;
    sisa: number;
    cicilan_paid: number;
    status: "proses" | "lunas";
    createdAt: string;
    keterangan: string;
  }[];
  cicilan: {
    id: number;
    id_pinjaman: number;
    jumlah: number;
    createdAt: string;
    pinjaman_keterangan: string;
  }[];
}

export interface CreateDistributedCicilanPayload {
  id_anggota: number;
  jumlah: number;
  keterangan?: string;
}
