import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement } from "react";
import { useAuth, useIsPengurus } from "./useAuth";

vi.mock("@/api/auth", () => ({
  getMe: vi.fn(),
}));

import { getMe } from "@/api/auth";
const getMeMock = vi.mocked(getMe);

function wrapper(queryClient: QueryClient) {
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
}

describe("useAuth()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("tidak memanggil getMe jika tidak ada token di localStorage", async () => {
    const qc = makeQueryClient();
    const { result } = renderHook(() => useAuth(), { wrapper: wrapper(qc) });

    // query disabled — data harus undefined
    expect(result.current.data).toBeUndefined();
    expect(getMeMock).not.toHaveBeenCalled();
  });

  it("memanggil getMe jika token ada di localStorage", async () => {
    localStorage.setItem("token", "my-token");
    const fakeProfile = {
      id: 1,
      nama: "John Doe",
      username: "johndoe",
      role: "anggota" as const,
      email: null,
      no_telepon: null,
    };
    getMeMock.mockResolvedValueOnce(fakeProfile);

    const qc = makeQueryClient();
    const { result } = renderHook(() => useAuth(), { wrapper: wrapper(qc) });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getMeMock).toHaveBeenCalledOnce();
    expect(result.current.data).toEqual(fakeProfile);
  });

  it("query key adalah ['auth', 'me']", async () => {
    localStorage.setItem("token", "my-token");
    getMeMock.mockResolvedValueOnce({
      id: 1,
      nama: "John",
      username: "john",
      role: "anggota",
      email: null,
      no_telepon: null,
    });

    const qc = makeQueryClient();
    renderHook(() => useAuth(), { wrapper: wrapper(qc) });

    await waitFor(() => {
      const cachedData = qc.getQueryData(["auth", "me"]);
      expect(cachedData).toBeDefined();
    });
  });
});

describe("useIsPengurus()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("mengembalikan false jika tidak ada token (data undefined)", () => {
    const qc = makeQueryClient();
    const { result } = renderHook(() => useIsPengurus(), { wrapper: wrapper(qc) });

    expect(result.current).toBe(false);
  });

  it("mengembalikan true jika role adalah pengurus", async () => {
    localStorage.setItem("token", "my-token");
    getMeMock.mockResolvedValueOnce({
      id: 1,
      nama: "Admin",
      username: "admin",
      role: "pengurus",
      email: null,
      no_telepon: null,
    });

    const qc = makeQueryClient();
    const { result } = renderHook(() => useIsPengurus(), { wrapper: wrapper(qc) });

    await waitFor(() => expect(result.current).toBe(true));
  });

  it("mengembalikan false jika role adalah anggota", async () => {
    localStorage.setItem("token", "my-token");
    getMeMock.mockResolvedValueOnce({
      id: 2,
      nama: "Member",
      username: "member",
      role: "anggota",
      email: null,
      no_telepon: null,
    });

    const qc = makeQueryClient();
    const { result } = renderHook(() => useIsPengurus(), { wrapper: wrapper(qc) });

    await waitFor(() => expect(result.current).toBe(false));
  });
});
