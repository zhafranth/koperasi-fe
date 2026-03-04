# Task List: Unit Test Dashboard

## Status Legend
- [ ] Pending
- [x] Completed
- [~] In Progress

---

## Task 1 — Setup konfigurasi test environment untuk dashboard
**Status**: [x] Completed

Persiapkan konfigurasi testing yang diperlukan sebelum menulis unit test dashboard:
- Pastikan Vitest + @testing-library/react + @testing-library/user-event sudah terinstall
- Buat setup file untuk mock global (axios, react-router-dom, react-query QueryClient)
- Buat helper/wrapper untuk menyediakan QueryClientProvider + MemoryRouter di setiap test
- Buat mock factories untuk data transaksi total (TransaksiTotalProps), event (EventProps), dan user auth
- Konfigurasi mock untuk window.localStorage (token auth)

**File referensi**: `src/pages/dashboard/Dashboard.tsx`, `src/pages/dashboard/DashboardHome.tsx`

---

## Task 2 — Unit test komponen Dashboard (Layout & Sidebar)
**Status**: [ ] Pending

Tulis unit test untuk `src/pages/dashboard/Dashboard.tsx`:

1. **Rendering dasar**: Sidebar tampil dengan logo/brand koperasi
2. **Navigasi menu**: Semua item menu (Dashboard, Transaksi, Anggota, Pinjaman, Keluarga, Penarikan) ter-render dengan link yang benar
3. **Responsive mobile**: Hamburger menu muncul di layar kecil, sidebar toggle saat diklik
4. **Profil user di sidebar**: Nama dan role user ditampilkan dari data `useAuth()`
5. **Logout**: Klik tombol logout → token dihapus dari localStorage → redirect ke /login
6. **Active route highlighting**: Item menu aktif mendapat styling berbeda
7. **Outlet rendering**: Konten child route ditampilkan di area utama

**Mock yang diperlukan**: useAuth hook, useNavigate, localStorage

---

## Task 3 — Unit test komponen DashboardHome (Stat Cards & Totals)
**Status**: [ ] Pending

Tulis unit test untuk `src/pages/dashboard/DashboardHome.tsx` — bagian statistik finansial:

1. **Loading state**: Skeleton/spinner tampil saat data belum tersedia (isLoading: true)
2. **Stat cards rendering**: 4 kartu utama tampil dengan nilai dari `useGetTransaksiTotal()`:
   - Total Anggota (total_anggota)
   - Jumlah Dana (jumlah_dana)
   - Jumlah Pinjaman (jumlah_pinjaman)
   - Total Dana (total_dana)
3. **Dana Koperasi section**: 3 item tampil (Simpanan Sukarela, Infaq, Tabungan Liburan)
4. **Format currency**: Angka diformat dengan thousand separator (Rp 1.500.000)
5. **Info tooltip**: Tooltip info muncul saat hover pada kartu
6. **Error state**: Komponen tidak crash saat data null/undefined

**Mock yang diperlukan**: useGetTransaksiTotal, useGetEvents, useIsPengurus, useAuth

---

## Task 4 — Unit test komponen DashboardHome (Event List & Role-based UI)
**Status**: [ ] Pending

Tulis unit test untuk `src/pages/dashboard/DashboardHome.tsx` — bagian event dan role-based UI:

1. **Event sidebar**: 4 event terdekat ditampilkan di sidebar
2. **Event grid**: Semua event ditampilkan di section utama dengan tanggal, waktu, lokasi
3. **Empty state events**: EmptyState component tampil saat tidak ada event
4. **Event kategori badge**: Warna Chips sesuai kategori (rapat, pelatihan, sosial, dll)
5. **Role-based UI (pengurus)**:
   - Tombol "Tambah Event" TAMPIL jika `useIsPengurus()` = true
   - Tombol "Tambah Event" TIDAK TAMPIL jika `useIsPengurus()` = false
6. **Klik "Tambah Event"**: Modal ModalAddEvent terbuka
7. **Klik event card**: Modal ModalDetailEvent terbuka dengan data event yang benar
8. **Loading state events**: Skeleton tampil saat events belum load

**Mock yang diperlukan**: useGetEvents, useIsPengurus, useToggle, dayjs

---

## Task 5 — Unit test ModalAddEvent (Form & Validasi)
**Status**: [ ] Pending

Tulis unit test untuk `src/pages/dashboard/_components/ModalAddEvent.tsx`:

1. **Rendering form**: Semua field tampil (title, tanggal, kategori, waktu, location, description)
2. **Validasi required fields**:
   - Submit tanpa title → pesan error muncul
   - Submit tanpa tanggal → pesan error muncul
   - Submit tanpa kategori → pesan error muncul
3. **Submit valid**: Isi semua field wajib → `useCreateEvent()` mutation dipanggil dengan payload yang benar
4. **Loading state submit**: Tombol Save disabled/spinner saat mutation pending
5. **Close modal**: Klik Cancel → `onClose` dipanggil, form tidak di-submit
6. **Reset form**: Modal dibuka ulang → field kosong kembali
7. **Date picker**: Memilih tanggal dari calendar popover mengupdate nilai form
8. **Kategori dropdown**: Memilih kategori dari dropdown mengupdate nilai form

**Mock yang diperlukan**: useCreateEvent mutation, onClose callback

---

## Task 6 — Unit test ModalDetailEvent (Display)
**Status**: [ ] Pending

Tulis unit test untuk `src/pages/dashboard/_components/ModalDetailEvent.tsx`:

1. **Rendering detail**: Semua field event ditampilkan (title, tanggal, waktu, lokasi, deskripsi, kategori)
2. **Format tanggal**: Tanggal diformat dengan dayjs (misal "Senin, 04 Maret 2026")
3. **Kategori badge**: Chips dengan warna yang sesuai kategori event ditampilkan
4. **Field opsional**: Komponen tidak crash jika waktu/lokasi/deskripsi null/undefined
5. **Close modal**: Klik tombol close → `onClose` callback dipanggil
6. **Data null**: Komponen handle gracefully jika prop event adalah null/undefined

**Mock yang diperlukan**: onClose callback, dayjs (format date)

---

## Task 7 — Unit test komponen ChartsKoperasi (Bar Chart)
**Status**: [ ] Pending

Tulis unit test untuk `src/components/ChartsKoperasi.tsx`:

1. **Rendering chart**: BarChart Recharts ter-render tanpa error
2. **Year selector**: Dropdown berisi 5 tahun terakhir dari tahun sekarang
3. **Default tahun**: Tahun sekarang (2026) terpilih sebagai default
4. **Ganti tahun**: Pilih tahun lain → `useGetSimpananChart` dipanggil dengan tahun baru
5. **Loading state**: Spinner/skeleton tampil saat data loading
6. **Data chart**: Semua 12 bulan (Jan-Des) tampil di X-axis
7. **Format currency tooltip**: Tooltip menampilkan nilai dalam format Rupiah
8. **Empty data**: Chart tetap render meski data simpanan kosong (semua 0)

**Mock yang diperlukan**: useGetSimpananChart hook, Recharts (mock minimal untuk avoid SVG issues)

---

## Task 8 — Unit test custom hooks (useAuth, useIsPengurus, useToggle)
**Status**: [ ] Pending

Tulis unit test untuk hooks yang digunakan dashboard:

**useAuth & useIsPengurus** (`src/hooks/useAuth.ts`):
1. `useAuth()` memanggil GET /auth/me dan return data user
2. `useAuth()` menggunakan query key ["auth", "me"]
3. `useIsPengurus()` return true jika role === "pengurus"
4. `useIsPengurus()` return false jika role === "anggota"
5. `useIsPengurus()` return false jika data user belum ada (loading)

**useToggle** (`src/hooks/useToggle.ts`):
1. `isOpen` awalnya false
2. `onOpen()` → isOpen menjadi true
3. `onClose()` → isOpen menjadi false
4. `toggle()` → isOpen berpindah state (false→true→false)
5. Bisa dipanggil berulang kali tanpa error

**Testing strategy**: gunakan renderHook dari @testing-library/react, wrap dengan QueryClientProvider untuk hooks yang pakai React Query

---

## Task 9 — Unit test React Query hooks dashboard (networks layer)
**Status**: [ ] Pending

Tulis unit test untuk network hooks yang digunakan dashboard:

**useGetEvents & useCreateEvent** (`src/networks/event.ts`):
1. `useGetEvents()` memanggil `getListEvents()` API
2. `useGetEvents()` menggunakan query key ["events"]
3. `useCreateEvent()` memanggil `postCreateEvent()` dengan payload yang benar
4. `useCreateEvent()` melakukan invalidateQueries ["events"] setelah sukses
5. `useCreateEvent()` menampilkan toast sukses setelah berhasil

**useGetTransaksiTotal** (`src/networks/transaksi.ts`):
1. Memanggil `getTotalTransaksi()` API
2. Menggunakan query key ["transaksi", "total"]
3. Return data TransaksiTotalProps dengan benar

**useGetSimpananChart** (`src/networks/simpanan.ts`):
1. Memanggil `getSimpananChart(tahun)` API
2. Menggunakan query key ["simpanan", "chart", tahun]
3. Re-fetch saat parameter tahun berubah

**Testing strategy**: Mock API functions (vi.mock), gunakan renderHook + QueryClientProvider, vi.mock untuk axios

---

## Task 10 — Integration test alur lengkap DashboardHome
**Status**: [ ] Pending

Tulis integration test untuk alur end-to-end DashboardHome:

1. **Full render dengan mock API**: Render DashboardHome dengan semua data di-mock, verifikasi semua section tampil
2. **Alur tambah event (pengurus)**:
   - Login sebagai pengurus
   - Klik "Tambah Event"
   - Isi form dengan data valid
   - Submit → event baru muncul di list
3. **Alur view detail event**:
   - Klik salah satu event card
   - Modal detail terbuka dengan data yang benar
   - Klik close → modal tertutup
4. **Alur non-pengurus**:
   - Login sebagai anggota biasa
   - Verifikasi tombol "Tambah Event" tidak ada
   - Verifikasi event masih bisa dilihat
5. **Data refresh**: Setelah tambah event, query di-invalidate dan list terupdate

**Testing strategy**: Gunakan wrapper dengan QueryClientProvider + MemoryRouter, mock semua API calls dengan vi.mock atau MSW handlers
