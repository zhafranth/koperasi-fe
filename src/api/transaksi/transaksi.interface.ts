export interface TransaksiProps {
  id: number;
  id_anggota: number | null;
  jenis: string;
  jumlah: number;
  createdAt: string;
  keterangan: string | null;
  nama_anggota: string | null;
}

export interface UpdateTransaksiPayload {
  jumlah?: number;
  keterangan?: string;
}

/**
 * Dashboard summary, framed as an accounting picture of the koperasi:
 *   jumlah_dana  ≡  saldo_simpanan + jumlah_simpanan_sukarela
 *                 + jumlah_infaq    + jumlah_tabungan_liburan   (total titipan = total aset)
 *   total_dana   =  jumlah_dana − jumlah_pinjaman               (kas yang masih di dompet)
 */
export interface TransaksiTotalProps {
  total_anggota: number;
  /** Saldo simpanan wajib (setoran − penarikan sumber=simpanan) */
  saldo_simpanan: number;
  /** Saldo simpanan sukarela (setoran − penarikan sumber=sukarela) */
  jumlah_simpanan_sukarela: number;
  /** Saldo infaq (masuk − keluar − penarikan sumber=infaq) */
  jumlah_infaq: number;
  /** Saldo tabungan liburan (setoran − penarikan sumber=liburan) */
  jumlah_tabungan_liburan: number;
  /** Piutang: total sisa pinjaman aktif (jumlah − cicilan dibayar) */
  jumlah_pinjaman: number;
  /** Total titipan anggota = total aset koperasi */
  jumlah_dana: number;
  /** Kas koperasi (uang yang masih di dompet) = jumlah_dana − jumlah_pinjaman */
  total_dana: number;
}
