/**
 * src/test/mocks/factories.ts
 *
 * Mock data factories for use in unit and integration tests.
 *
 * Each factory function accepts a partial override object so tests can
 * customise only the fields they care about while keeping sensible defaults
 * for everything else.
 *
 * Interfaces mirrored from:
 *   - TransaksiTotalProps  → src/api/transaksi/transaksi.interface.ts
 *   - EventProps           → src/api/event/event.interface.ts
 *   - UserProfile          → src/api/auth/index.ts
 */

import type { TransaksiTotalProps } from "@/api/transaksi/transaksi.interface";
import type { EventProps } from "@/api/event/event.interface";
import type { UserProfile } from "@/api/auth";

// ─── TransaksiTotal ───────────────────────────────────────────────────────────

/**
 * Creates a mock TransaksiTotalProps object.
 *
 * @example
 * // Default values
 * const totals = createMockTransaksiTotal();
 *
 * // Override specific fields
 * const totals = createMockTransaksiTotal({ total_anggota: 50 });
 */
export function createMockTransaksiTotal(
  overrides: Partial<TransaksiTotalProps> = {},
): TransaksiTotalProps {
  return {
    total_anggota: 25,
    jumlah_dana: 50_000_000,
    jumlah_pinjaman: 10_000_000,
    jumlah_simpanan_sukarela: 5_000_000,
    jumlah_infaq: 2_000_000,
    jumlah_tabungan_liburan: 3_000_000,
    total_dana: 30_000_000,
    ...overrides,
  };
}

// ─── Event ────────────────────────────────────────────────────────────────────

/**
 * Creates a mock EventProps object.
 *
 * @example
 * const event = createMockEvent({ title: "Rapat Tahunan" });
 * const events = createMockEventList(3);
 */
export function createMockEvent(
  overrides: Partial<EventProps> = {},
): EventProps {
  return {
    id: 1,
    title: "Rapat Bulanan Koperasi",
    description: "Rapat rutin membahas perkembangan koperasi",
    tanggal: "2026-03-15",
    waktu: "09:00 - 12:00 WIB",
    location: "Aula Koperasi",
    kategori: "rapat",
    createdAt: "2026-03-01T08:00:00.000Z",
    ...overrides,
  };
}

/**
 * Creates an array of mock EventProps objects with incrementing ids and
 * distinct titles so they can be uniquely identified in the DOM.
 *
 * @param count - Number of events to generate (default 3).
 * @param overrides - Fields to apply to every generated event.
 */
export function createMockEventList(
  count = 3,
  overrides: Partial<EventProps> = {},
): EventProps[] {
  const CATEGORIES = [
    "rapat",
    "pelatihan",
    "sosial",
    "silaturahmi",
    "olahraga",
    "pendidikan",
    "kesehatan",
    "keagamaan",
    "musyawarah",
    "penggalangan_dana",
  ] as const;

  return Array.from({ length: count }, (_, i) =>
    createMockEvent({
      id: i + 1,
      title: `Event ${i + 1}`,
      kategori: CATEGORIES[i % CATEGORIES.length],
      tanggal: `2026-03-${String(i + 10).padStart(2, "0")}`,
      ...overrides,
    }),
  );
}

// ─── UserProfile (Auth) ───────────────────────────────────────────────────────

/**
 * Creates a mock UserProfile for role "pengurus".
 *
 * @example
 * const pengurus = createMockUserPengurus({ nama: "Budi Santoso" });
 */
export function createMockUserPengurus(
  overrides: Partial<UserProfile> = {},
): UserProfile {
  return {
    id: 1,
    nama: "Ahmad Pengurus",
    username: "pengurus01",
    role: "pengurus",
    email: "pengurus@koperasi.id",
    no_telepon: "08111111111",
    ...overrides,
  };
}

/**
 * Creates a mock UserProfile for role "anggota".
 *
 * @example
 * const anggota = createMockUserAnggota({ nama: "Siti Anggota" });
 */
export function createMockUserAnggota(
  overrides: Partial<UserProfile> = {},
): UserProfile {
  return {
    id: 2,
    nama: "Siti Anggota",
    username: "anggota01",
    role: "anggota",
    email: "anggota@koperasi.id",
    no_telepon: "08222222222",
    ...overrides,
  };
}
