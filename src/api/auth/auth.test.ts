import { describe, it, expect, vi, beforeEach } from "vitest";
import { loginAccount, getMe, register } from "./index";

// Mock axios instance
vi.mock("../../../config/axios", () => ({
  default: vi.fn(),
}));

import apiRequest from "../../../config/axios";
const apiRequestMock = vi.mocked(apiRequest);

describe("Auth API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── loginAccount ───────────────────────────────────────────────────────────

  describe("loginAccount()", () => {
    it("melakukan POST ke /auth/login dengan data yang benar", async () => {
      const fakeToken = "eyJhbGciOiJIUzI1NiJ9.test";
      apiRequestMock.mockResolvedValueOnce({ data: { token: fakeToken } });

      const credentials = { username: "johndoe", password: "secret123" };
      await loginAccount(credentials);

      expect(apiRequestMock).toHaveBeenCalledWith({
        method: "POST",
        url: "/auth/login",
        data: credentials,
      });
    });

    it("mengembalikan token dari response", async () => {
      const fakeToken = "eyJhbGciOiJIUzI1NiJ9.test";
      apiRequestMock.mockResolvedValueOnce({ data: { token: fakeToken } });

      const result = await loginAccount({ username: "johndoe", password: "secret123" });

      expect(result).toEqual({ token: fakeToken });
    });

    it("melempar error jika request gagal", async () => {
      apiRequestMock.mockRejectedValueOnce(new Error("Network Error"));

      await expect(
        loginAccount({ username: "johndoe", password: "wrong" })
      ).rejects.toThrow("Network Error");
    });
  });

  // ─── getMe ──────────────────────────────────────────────────────────────────

  describe("getMe()", () => {
    it("melakukan GET ke /auth/me", async () => {
      const fakeProfile = {
        id: 1,
        nama: "John Doe",
        username: "johndoe",
        role: "anggota" as const,
        email: "john@example.com",
        no_telepon: "08123456789",
      };
      apiRequestMock.mockResolvedValueOnce({ data: { data: fakeProfile } });

      await getMe();

      expect(apiRequestMock).toHaveBeenCalledWith({
        method: "GET",
        url: "/auth/me",
      });
    });

    it("mengembalikan UserProfile dari response", async () => {
      const fakeProfile = {
        id: 1,
        nama: "John Doe",
        username: "johndoe",
        role: "pengurus" as const,
        email: null,
        no_telepon: null,
      };
      apiRequestMock.mockResolvedValueOnce({ data: { data: fakeProfile } });

      const result = await getMe();

      expect(result).toEqual(fakeProfile);
    });

    it("melempar error jika request gagal (misal 401)", async () => {
      apiRequestMock.mockRejectedValueOnce(new Error("Unauthorized"));

      await expect(getMe()).rejects.toThrow("Unauthorized");
    });
  });

  // ─── register ───────────────────────────────────────────────────────────────

  describe("register()", () => {
    it("melakukan POST ke /auth/register dengan data yang benar", async () => {
      const newUser = { nama: "Budi", username: "budi99", password: "password123" };
      apiRequestMock.mockResolvedValueOnce({ data: { data: { id: 10 } } });

      await register(newUser);

      expect(apiRequestMock).toHaveBeenCalledWith({
        method: "POST",
        url: "/auth/register",
        data: newUser,
      });
    });

    it("mengembalikan data dari response", async () => {
      const responseData = { id: 10, nama: "Budi" };
      apiRequestMock.mockResolvedValueOnce({ data: { data: responseData } });

      const result = await register({ nama: "Budi", username: "budi99", password: "password123" });

      expect(result).toEqual(responseData);
    });
  });
});
