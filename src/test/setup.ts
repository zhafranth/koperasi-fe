import "@testing-library/jest-dom";
import { vi, beforeEach, afterEach } from "vitest";

// ─── Global localStorage mock ────────────────────────────────────────────────
// jsdom provides a real localStorage, but we spy on it so tests can assert
// and control it easily via vi.spyOn or localStorage.setItem/getItem.
// We reset it before every test to keep tests isolated.
beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

// ─── Mock axios (config/axios) ────────────────────────────────────────────────
// Individual test files use vi.mock("@/api/...") or vi.mock("../../../config/axios")
// to control API responses. The global axios instance is NOT auto-mocked here so
// that unit tests can choose their own mock strategy.

// ─── Mock react-router-dom globals ───────────────────────────────────────────
// react-router-dom v7 needs a BrowserRouter/MemoryRouter context in tests.
// The renderWithProviders utility (src/test/utils.tsx) wraps components with
// MemoryRouter, so no global module mock is needed here. However, hooks such
// as useNavigate are mocked inline within individual tests using vi.mock().

// ─── Mock sonner (toast) ─────────────────────────────────────────────────────
// Prevent toast notifications from throwing in test environment.
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
  Toaster: () => null,
}));

// ─── Mock ResizeObserver (required by Recharts) ──────────────────────────────
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// ─── Mock matchMedia (not implemented in jsdom) ───────────────────────────────
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
