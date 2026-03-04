/**
 * src/test/setup.test.ts
 *
 * Smoke tests that verify the test environment infrastructure created in
 * Task 1 is wired up correctly.
 *
 * These tests do NOT cover application logic — they simply assert that:
 *   1. The test helper utilities (renderWithProviders, createHookWrapper) work.
 *   2. The mock factories produce objects with the right shape.
 *   3. localStorage helpers interact with the real jsdom storage.
 *   4. The global mocks defined in setup.ts (sonner, ResizeObserver) are in place.
 */

import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useQueryClient } from "@tanstack/react-query";
import {
  createTestQueryClient,
  createHookWrapper,
  setAuthToken,
  clearAuthToken,
} from "./utils";
import {
  createMockTransaksiTotal,
  createMockEvent,
  createMockEventList,
  createMockUserPengurus,
  createMockUserAnggota,
} from "./mocks/factories";

// ─── QueryClient factory ──────────────────────────────────────────────────────

describe("createTestQueryClient()", () => {
  it("creates a QueryClient with retry disabled", () => {
    const qc = createTestQueryClient();
    const { retry } = qc.getDefaultOptions().queries ?? {};
    expect(retry).toBe(false);
  });

  it("creates a QueryClient with gcTime 0", () => {
    const qc = createTestQueryClient();
    const { gcTime } = qc.getDefaultOptions().queries ?? {};
    expect(gcTime).toBe(0);
  });
});

// ─── createHookWrapper ────────────────────────────────────────────────────────

describe("createHookWrapper()", () => {
  it("provides QueryClientProvider context so useQueryClient() works", () => {
    const wrapper = createHookWrapper();
    const { result } = renderHook(() => useQueryClient(), { wrapper });
    expect(result.current).toBeDefined();
  });

  it("exposes the queryClient on the wrapper component", () => {
    const wrapper = createHookWrapper();
    expect(wrapper.queryClient).toBeDefined();
  });

  it("accepts a pre-created queryClient and uses it", () => {
    const qc = createTestQueryClient();
    const wrapper = createHookWrapper({ queryClient: qc });
    expect(wrapper.queryClient).toBe(qc);
  });
});

// ─── localStorage helpers ─────────────────────────────────────────────────────

describe("setAuthToken() / clearAuthToken()", () => {
  it("setAuthToken stores the token in localStorage", () => {
    setAuthToken("my-secret-token");
    expect(localStorage.getItem("token")).toBe("my-secret-token");
  });

  it("setAuthToken uses a default token when none is provided", () => {
    setAuthToken();
    expect(localStorage.getItem("token")).toBe("test-jwt-token");
  });

  it("clearAuthToken removes the token from localStorage", () => {
    setAuthToken();
    clearAuthToken();
    expect(localStorage.getItem("token")).toBeNull();
  });
});

// ─── Mock factories ───────────────────────────────────────────────────────────

describe("createMockTransaksiTotal()", () => {
  it("returns an object with all required TransaksiTotalProps keys", () => {
    const total = createMockTransaksiTotal();

    expect(total).toHaveProperty("total_anggota");
    expect(total).toHaveProperty("jumlah_dana");
    expect(total).toHaveProperty("jumlah_pinjaman");
    expect(total).toHaveProperty("jumlah_simpanan_sukarela");
    expect(total).toHaveProperty("jumlah_infaq");
    expect(total).toHaveProperty("jumlah_tabungan_liburan");
    expect(total).toHaveProperty("total_dana");
  });

  it("allows overriding individual fields", () => {
    const total = createMockTransaksiTotal({ total_anggota: 99 });
    expect(total.total_anggota).toBe(99);
    // Other fields retain their default values
    expect(total.jumlah_dana).toBe(50_000_000);
  });

  it("returns numeric values for all monetary fields", () => {
    const total = createMockTransaksiTotal();
    expect(typeof total.jumlah_dana).toBe("number");
    expect(typeof total.total_dana).toBe("number");
  });
});

describe("createMockEvent()", () => {
  it("returns an object with all required EventProps keys", () => {
    const event = createMockEvent();

    expect(event).toHaveProperty("id");
    expect(event).toHaveProperty("title");
    expect(event).toHaveProperty("description");
    expect(event).toHaveProperty("tanggal");
    expect(event).toHaveProperty("waktu");
    expect(event).toHaveProperty("location");
    expect(event).toHaveProperty("kategori");
    expect(event).toHaveProperty("createdAt");
  });

  it("allows nullable fields (description, waktu, location)", () => {
    const event = createMockEvent({
      description: null,
      waktu: null,
      location: null,
    });
    expect(event.description).toBeNull();
    expect(event.waktu).toBeNull();
    expect(event.location).toBeNull();
  });

  it("allows overriding the title", () => {
    const event = createMockEvent({ title: "Pelatihan Koperasi" });
    expect(event.title).toBe("Pelatihan Koperasi");
  });
});

describe("createMockEventList()", () => {
  it("returns the requested number of events", () => {
    expect(createMockEventList(4)).toHaveLength(4);
    expect(createMockEventList(1)).toHaveLength(1);
  });

  it("assigns unique ids to each event", () => {
    const events = createMockEventList(5);
    const ids = events.map((e) => e.id);
    expect(new Set(ids).size).toBe(5);
  });

  it("returns 3 events by default", () => {
    expect(createMockEventList()).toHaveLength(3);
  });

  it("applies overrides to every event in the list", () => {
    const events = createMockEventList(2, { location: "Balai Desa" });
    events.forEach((e) => expect(e.location).toBe("Balai Desa"));
  });
});

describe("createMockUserPengurus()", () => {
  it("returns a UserProfile with role pengurus", () => {
    const user = createMockUserPengurus();
    expect(user.role).toBe("pengurus");
  });

  it("allows overriding the nama field", () => {
    const user = createMockUserPengurus({ nama: "Budi Ketua" });
    expect(user.nama).toBe("Budi Ketua");
  });
});

describe("createMockUserAnggota()", () => {
  it("returns a UserProfile with role anggota", () => {
    const user = createMockUserAnggota();
    expect(user.role).toBe("anggota");
  });

  it("allows overriding the email field", () => {
    const user = createMockUserAnggota({ email: "siti@example.com" });
    expect(user.email).toBe("siti@example.com");
  });
});

// ─── Global mocks (setup.ts) ──────────────────────────────────────────────────

describe("Global mocks from setup.ts", () => {
  it("sonner toast.success is mocked as a vi.fn()", async () => {
    const { toast } = await import("sonner");
    expect(vi.isMockFunction(toast.success)).toBe(true);
  });

  it("sonner toast.error is mocked as a vi.fn()", async () => {
    const { toast } = await import("sonner");
    expect(vi.isMockFunction(toast.error)).toBe(true);
  });

  it("ResizeObserver is defined globally", () => {
    expect(globalThis.ResizeObserver).toBeDefined();
    const ro = new ResizeObserver(() => {});
    expect(ro.observe).toBeDefined();
    expect(ro.disconnect).toBeDefined();
  });

  it("window.matchMedia is mocked as a vi.fn()", () => {
    expect(vi.isMockFunction(window.matchMedia)).toBe(true);
  });
});
