export interface SimpananPayload {
  jumlah: number;
  id_anggota: number;
  start: string | null;
  end: string | null;
}

export interface SimpananChartItem {
  bulan: number;
  total: number;
}
