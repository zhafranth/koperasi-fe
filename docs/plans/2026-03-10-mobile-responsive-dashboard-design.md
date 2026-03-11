# Mobile-Friendly Dashboard Design

**Date:** 2026-03-10
**Scope:** Dashboard responsive untuk mobile (< 768px / `md` breakpoint)

---

## Overview

Membuat dashboard koperasi mobile-friendly dengan 3 perubahan utama:
1. Sidebar berubah menjadi floating dock
2. Tabel berubah menjadi card list
3. Layout adjustments (padding, filter stacking, simplified pagination)

Semua perubahan aktif di breakpoint `< md` (768px), konsisten dengan breakpoint sidebar yang sudah ada.

---

## 1. Floating Dock

**Menggantikan sidebar di < 768px.**

- **Posisi:** Fixed bottom, center-aligned, margin ~16px dari edge layar
- **Style:** `rounded-full`, glass effect (`bg-black/70 backdrop-blur-xl`), shadow
- **Items (4 + 1):**
  - Dashboard (LayoutDashboard icon)
  - Transaksi (Receipt icon)
  - Anggota (Users icon)
  - Pinjaman (Wallet icon)
  - More (Ellipsis icon) — buka popover/sheet ke atas
- **"More" popover** menampilkan:
  - Keluarga (Home icon)
  - Penarikan (ArrowDownToLine icon)
  - Logout button
- **Active state:** Icon gold (`#c9a84c`) + subtle dot indicator di bawah icon
- **Sidebar & hamburger menu:** Completely hidden di < md, diganti dock

## 2. Table to Card List

**Halaman yang terkena:** Transaksi, Pinjaman, Penarikan.

- **Kondisi render:** Di `ListLayout`, conditional render — card list jika `< md`, table jika `>= md`
- **Card format (compact):**
  - Row 1: Nama anggota (left) + Status badge/chips (right)
  - Row 2: Jumlah currency bold (left) + Tanggal secondary text (right)
- **Card styling:** `bg-white rounded-xl border border-[#e7e5e0] p-4`, stacked dengan `gap-3`
- **Tap action:** Navigate ke detail (sama behavior seperti klik row di table)

## 3. Layout Adjustments

- **Content area:** Padding `p-6` → `p-4`, tambah `pb-24` untuk clearance di atas dock
- **Header/Filter:** Stack vertical, buttons full-width
- **Pagination:** Simplified — prev/next saja, tanpa page numbers

---

## Breakpoint Summary

| Fitur | Breakpoint |
|-------|-----------|
| Floating dock | `< md` (768px) |
| Table → Card list | `< md` (768px) |
| Layout adjustments | `< md` (768px) |

## Files yang Akan Dimodifikasi

| File | Perubahan |
|------|-----------|
| `src/pages/dashboard/Dashboard.tsx` | Hide sidebar & hamburger di < md, tambah floating dock |
| `src/components/ListLayout.tsx` | Conditional render table vs card list |
| `src/components/Table.tsx` | (mungkin) mobile card variant |
| `src/components/Pagination.tsx` | Simplified mode untuk mobile |
| `src/components/Header.tsx` | Stack vertical di mobile |

## Files Baru

| File | Deskripsi |
|------|-----------|
| `src/components/FloatingDock.tsx` | Komponen floating dock + more popover |
| `src/components/MobileCard.tsx` | Generic card component untuk mobile table replacement |

## Design Constraints

- Menggunakan Tailwind responsive classes, tidak custom CSS media queries
- Konsisten dengan color palette yang sudah ada (#0d3b2c, #c9a84c, #f7f5f0)
- Tidak mengubah behavior/logic existing, hanya presentasi
- Touch-friendly: minimum tap target 44px
