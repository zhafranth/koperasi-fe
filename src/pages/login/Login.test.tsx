import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./Login";

// Mock dependencies
vi.mock("@/api/auth", () => ({
  loginAccount: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { loginAccount } from "@/api/auth";
import { toast } from "sonner";

const loginAccountMock = vi.mocked(loginAccount);
const toastSuccess = vi.mocked(toast.success);
const toastError = vi.mocked(toast.error);

function renderLogin() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("Login Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  // ─── Render ────────────────────────────────────────────────────────────────

  describe("Render", () => {
    it("menampilkan field username dan password", () => {
      renderLogin();
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it("menampilkan tombol Masuk", () => {
      renderLogin();
      expect(screen.getByRole("button", { name: /masuk/i })).toBeInTheDocument();
    });

    it("menampilkan tombol Kembali ke Beranda", () => {
      renderLogin();
      expect(
        screen.getByRole("button", { name: /kembali ke beranda/i })
      ).toBeInTheDocument();
    });

    it("tidak menampilkan pesan error saat pertama kali render", () => {
      renderLogin();
      expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/at least 6 characters/i)).not.toBeInTheDocument();
    });
  });

  // ─── Validasi Form ─────────────────────────────────────────────────────────

  describe("Validasi Form", () => {
    it("menampilkan error jika username kosong saat submit", async () => {
      const user = userEvent.setup();
      renderLogin();

      await user.click(screen.getByRole("button", { name: /masuk/i }));

      await waitFor(() => {
        expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      });
    });

    it("menampilkan error jika password kosong saat submit", async () => {
      const user = userEvent.setup();
      renderLogin();

      await user.type(screen.getByLabelText(/username/i), "johndoe");
      await user.click(screen.getByRole("button", { name: /masuk/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/password must be at least 6 characters/i)
        ).toBeInTheDocument();
      });
    });

    it("menampilkan error jika password kurang dari 6 karakter", async () => {
      const user = userEvent.setup();
      renderLogin();

      await user.type(screen.getByLabelText(/username/i), "johndoe");
      await user.type(screen.getByLabelText(/password/i), "abc");
      await user.click(screen.getByRole("button", { name: /masuk/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/password must be at least 6 characters/i)
        ).toBeInTheDocument();
      });
    });

    it("tidak menampilkan error jika username dan password valid", async () => {
      const user = userEvent.setup();
      loginAccountMock.mockResolvedValueOnce({ token: "fake-token" });
      renderLogin();

      await user.type(screen.getByLabelText(/username/i), "johndoe");
      await user.type(screen.getByLabelText(/password/i), "password123");
      await user.click(screen.getByRole("button", { name: /masuk/i }));

      await waitFor(() => {
        expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/at least 6 characters/i)).not.toBeInTheDocument();
      });
    });
  });

  // ─── Submit: Login Berhasil ─────────────────────────────────────────────────

  describe("Login Berhasil", () => {
    it("memanggil loginAccount dengan data yang benar", async () => {
      const user = userEvent.setup();
      loginAccountMock.mockResolvedValueOnce({ token: "fake-token" });
      renderLogin();

      await user.type(screen.getByLabelText(/username/i), "johndoe");
      await user.type(screen.getByLabelText(/password/i), "password123");
      await user.click(screen.getByRole("button", { name: /masuk/i }));

      await waitFor(() => {
        expect(loginAccountMock).toHaveBeenCalledOnce();
        expect(loginAccountMock).toHaveBeenCalledWith({
          username: "johndoe",
          password: "password123",
        });
      });
    });

    it("menyimpan token ke localStorage setelah login berhasil", async () => {
      const user = userEvent.setup();
      loginAccountMock.mockResolvedValueOnce({ token: "my-jwt-token" });
      renderLogin();

      await user.type(screen.getByLabelText(/username/i), "johndoe");
      await user.type(screen.getByLabelText(/password/i), "password123");
      await user.click(screen.getByRole("button", { name: /masuk/i }));

      await waitFor(() => {
        expect(localStorage.getItem("token")).toBe("my-jwt-token");
      });
    });

    it("menampilkan toast success setelah login berhasil", async () => {
      const user = userEvent.setup();
      loginAccountMock.mockResolvedValueOnce({ token: "my-jwt-token" });
      renderLogin();

      await user.type(screen.getByLabelText(/username/i), "johndoe");
      await user.type(screen.getByLabelText(/password/i), "password123");
      await user.click(screen.getByRole("button", { name: /masuk/i }));

      await waitFor(() => {
        expect(toastSuccess).toHaveBeenCalledWith("Login berhasil");
      });
    });

    it("navigasi ke /dashboard/dashboard setelah login berhasil", async () => {
      const user = userEvent.setup();
      loginAccountMock.mockResolvedValueOnce({ token: "my-jwt-token" });
      renderLogin();

      await user.type(screen.getByLabelText(/username/i), "johndoe");
      await user.type(screen.getByLabelText(/password/i), "password123");
      await user.click(screen.getByRole("button", { name: /masuk/i }));

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard/dashboard");
      });
    });
  });

  // ─── Submit: Login Gagal ────────────────────────────────────────────────────

  describe("Login Gagal", () => {
    it("menampilkan toast error jika loginAccount gagal", async () => {
      const user = userEvent.setup();
      loginAccountMock.mockRejectedValueOnce(new Error("Unauthorized"));
      renderLogin();

      await user.type(screen.getByLabelText(/username/i), "johndoe");
      await user.type(screen.getByLabelText(/password/i), "wrongpassword");
      await user.click(screen.getByRole("button", { name: /masuk/i }));

      await waitFor(() => {
        expect(toastError).toHaveBeenCalledWith("Login gagal");
      });
    });

    it("tidak menyimpan token jika login gagal", async () => {
      const user = userEvent.setup();
      loginAccountMock.mockRejectedValueOnce(new Error("Unauthorized"));
      renderLogin();

      await user.type(screen.getByLabelText(/username/i), "johndoe");
      await user.type(screen.getByLabelText(/password/i), "wrongpassword");
      await user.click(screen.getByRole("button", { name: /masuk/i }));

      await waitFor(() => {
        expect(toastError).toHaveBeenCalled();
      });
      expect(localStorage.getItem("token")).toBeNull();
    });

    it("tidak navigasi ke dashboard jika login gagal", async () => {
      const user = userEvent.setup();
      loginAccountMock.mockRejectedValueOnce(new Error("Unauthorized"));
      renderLogin();

      await user.type(screen.getByLabelText(/username/i), "johndoe");
      await user.type(screen.getByLabelText(/password/i), "wrongpassword");
      await user.click(screen.getByRole("button", { name: /masuk/i }));

      await waitFor(() => {
        expect(toastError).toHaveBeenCalled();
      });
      expect(mockNavigate).not.toHaveBeenCalledWith("/dashboard/dashboard");
    });
  });

  // ─── Navigasi ───────────────────────────────────────────────────────────────

  describe("Navigasi", () => {
    it("navigasi ke / saat tombol Kembali ke Beranda diklik", async () => {
      const user = userEvent.setup();
      renderLogin();

      await user.click(
        screen.getByRole("button", { name: /kembali ke beranda/i })
      );

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
