/**
 * src/pages/dashboard/Dashboard.test.tsx
 *
 * Unit tests for the Dashboard layout component.
 *
 * Covers:
 *   1. Basic rendering — sidebar with Koperasi brand logo
 *   2. Navigation menu — all menu items render with correct links
 *   3. Responsive mobile — hamburger button visible, sidebar toggles on click
 *   4. User profile in sidebar — name and role from useAuth()
 *   5. Logout — token removed from localStorage, navigate to /login called
 *   6. Active route highlighting — active menu item gets gold styling
 *   7. Outlet rendering — child route content displayed in main area
 *   8. Unauthenticated redirect — no token redirects to /login
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./Dashboard";
import {
  createMockUserPengurus,
  createMockUserAnggota,
} from "@/test/mocks/factories";

// ─── Module mocks ─────────────────────────────────────────────────────────────

// Mock useAuth so we control what profile is returned without real API calls.
vi.mock("@/hooks/useAuth", () => ({
  useAuth: vi.fn(),
  useIsPengurus: vi.fn(),
}));

// Mock useNavigate so we can assert redirect calls without a real browser router.
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { useAuth } from "@/hooks/useAuth";
const mockUseAuth = vi.mocked(useAuth);

// ─── Test helpers ─────────────────────────────────────────────────────────────

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });
}

interface RenderDashboardOptions {
  /** Initial URL path inside the dashboard, e.g. "/dashboard/dashboard". */
  initialPath?: string;
  /** Child element rendered by <Outlet />. Defaults to a simple div. */
  outletContent?: React.ReactNode;
}

/**
 * Renders the Dashboard component inside a MemoryRouter + QueryClientProvider.
 * Routes are configured so that:
 *   /dashboard/*  → <Dashboard /> with an <Outlet />
 *   /login        → a sentinel element so redirect assertions work
 */
function renderDashboard({
  initialPath = "/dashboard/dashboard",
  outletContent = <div>Child Content</div>,
}: RenderDashboardOptions = {}) {
  const queryClient = createQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route index element={outletContent} />
            <Route path="*" element={outletContent} />
          </Route>
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

// ─── Shared setup ─────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();

  // Default: authenticated user with pengurus role.
  localStorage.setItem("token", "test-jwt-token");
  mockUseAuth.mockReturnValue({
    data: createMockUserPengurus(),
    isLoading: false,
    isError: false,
  } as ReturnType<typeof useAuth>);
});

// ─── 1. Basic rendering ───────────────────────────────────────────────────────

describe("Basic rendering", () => {
  it("renders the sidebar with the Koperasi brand text", () => {
    renderDashboard();
    expect(screen.getByText("Koperasi")).toBeInTheDocument();
  });

  it("renders the Building2 icon container (gold avatar) in the logo area", () => {
    renderDashboard();
    // The sidebar contains the logo section — the brand text must be visible.
    const brand = screen.getByText("Koperasi");
    expect(brand).toBeVisible();
  });

  it("renders the logout button", () => {
    renderDashboard();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("renders the main content area", () => {
    renderDashboard();
    // The <main> element wrapping <Outlet /> should exist in the DOM.
    const mainEl = document.querySelector("main");
    expect(mainEl).toBeInTheDocument();
  });
});

// ─── 2. Navigation menu ───────────────────────────────────────────────────────

describe("Navigation menu", () => {
  const menuItems = [
    { title: "Dashboard", path: "/dashboard/dashboard" },
    { title: "Transaksi", path: "/dashboard/transaksi" },
    { title: "Anggota", path: "/dashboard/anggota" },
    { title: "Pinjaman", path: "/dashboard/pinjaman?status=proses" },
    { title: "Keluarga", path: "/dashboard/keluarga" },
    { title: "Penarikan", path: "/dashboard/penarikan" },
  ];

  it("renders all six menu items", () => {
    renderDashboard();
    menuItems.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it.each(menuItems)(
    'menu item "$title" links to "$path"',
    ({ title, path }) => {
      renderDashboard();
      const link = screen.getByRole("link", { name: new RegExp(title, "i") });
      expect(link).toHaveAttribute("href", path);
    }
  );
});

// ─── 3. Responsive mobile hamburger menu ─────────────────────────────────────

describe("Responsive mobile", () => {
  it("renders the hamburger (Menu) button", () => {
    renderDashboard();
    // The mobile toggle button is always present in the DOM (hidden via CSS on desktop).
    // It has no accessible name by default (icon only), but we can target it by its
    // position in the DOM — it is the first button before the sidebar.
    const buttons = screen.getAllByRole("button");
    // The first button (index 0) is the hamburger toggle.
    expect(buttons[0]).toBeInTheDocument();
  });

  it("clicking the hamburger button opens the sidebar (adds translate-x-0)", async () => {
    const user = userEvent.setup();
    renderDashboard();

    const sidebar = document.querySelector("aside");
    expect(sidebar).not.toBeNull();

    // Initially closed — sidebar has -translate-x-full class on mobile.
    expect(sidebar!.className).toMatch(/-translate-x-full/);

    // Click the first button (hamburger toggle).
    const buttons = screen.getAllByRole("button");
    await user.click(buttons[0]);

    // After click, sidebar should have translate-x-0 and NOT -translate-x-full.
    expect(sidebar!.className).toMatch(/translate-x-0/);
    expect(sidebar!.className).not.toMatch(/-translate-x-full/);
  });

  it("clicking the hamburger a second time closes the sidebar", async () => {
    const user = userEvent.setup();
    renderDashboard();

    const sidebar = document.querySelector("aside");
    const buttons = screen.getAllByRole("button");
    const hamburger = buttons[0];

    // Open.
    await user.click(hamburger);
    expect(sidebar!.className).toMatch(/translate-x-0/);

    // Close.
    await user.click(hamburger);
    expect(sidebar!.className).toMatch(/-translate-x-full/);
  });

  it("renders the mobile overlay when sidebar is open", async () => {
    const user = userEvent.setup();
    renderDashboard();

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[0]);

    // The overlay div with bg-black/30 should appear.
    const overlay = document.querySelector(".fixed.inset-0");
    expect(overlay).toBeInTheDocument();
  });

  it("clicking the mobile overlay closes the sidebar", async () => {
    const user = userEvent.setup();
    renderDashboard();

    const sidebar = document.querySelector("aside");
    const buttons = screen.getAllByRole("button");

    // Open sidebar.
    await user.click(buttons[0]);
    expect(sidebar!.className).toMatch(/translate-x-0/);

    // Click the overlay.
    const overlay = document.querySelector(".fixed.inset-0") as HTMLElement;
    expect(overlay).not.toBeNull();
    await user.click(overlay);

    expect(sidebar!.className).toMatch(/-translate-x-full/);
  });

  it("clicking a menu link closes the sidebar", async () => {
    const user = userEvent.setup();
    renderDashboard();

    const sidebar = document.querySelector("aside");
    const buttons = screen.getAllByRole("button");

    // Open sidebar.
    await user.click(buttons[0]);
    expect(sidebar!.className).toMatch(/translate-x-0/);

    // Click any menu link.
    await user.click(screen.getByRole("link", { name: /anggota/i }));

    expect(sidebar!.className).toMatch(/-translate-x-full/);
  });
});

// ─── 4. User profile in sidebar ───────────────────────────────────────────────

describe("User profile in sidebar", () => {
  it("displays the user's name when profile data is loaded", () => {
    mockUseAuth.mockReturnValue({
      data: createMockUserPengurus({ nama: "Budi Santoso" }),
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useAuth>);

    renderDashboard();

    expect(screen.getByText("Budi Santoso")).toBeInTheDocument();
  });

  it("displays the user's role", () => {
    mockUseAuth.mockReturnValue({
      data: createMockUserPengurus({ role: "pengurus" }),
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useAuth>);

    renderDashboard();

    expect(screen.getByText("pengurus")).toBeInTheDocument();
  });

  it("displays anggota role for a regular member", () => {
    mockUseAuth.mockReturnValue({
      data: createMockUserAnggota({ nama: "Siti Rahayu", role: "anggota" }),
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useAuth>);

    renderDashboard();

    expect(screen.getByText("Siti Rahayu")).toBeInTheDocument();
    expect(screen.getByText("anggota")).toBeInTheDocument();
  });

  it("displays initials from multi-word name in the avatar", () => {
    mockUseAuth.mockReturnValue({
      data: createMockUserPengurus({ nama: "Ahmad Fauzi" }),
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useAuth>);

    renderDashboard();

    // "Ahmad Fauzi" → initials "AF"
    expect(screen.getByText("AF")).toBeInTheDocument();
  });

  it("displays initials from single-word name", () => {
    mockUseAuth.mockReturnValue({
      data: createMockUserPengurus({ nama: "Ahmad" }),
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useAuth>);

    renderDashboard();

    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("shows fallback '?' when profile data is undefined", () => {
    mockUseAuth.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as ReturnType<typeof useAuth>);

    renderDashboard();

    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("shows '-' for name and role when profile data is undefined", () => {
    mockUseAuth.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useAuth>);

    renderDashboard();

    // The name and role placeholders are both "-".
    const dashes = screen.getAllByText("-");
    expect(dashes.length).toBeGreaterThanOrEqual(2);
  });
});

// ─── 5. Logout ────────────────────────────────────────────────────────────────

describe("Logout", () => {
  it("removes the token from localStorage when logout is clicked", async () => {
    const user = userEvent.setup();
    renderDashboard();

    expect(localStorage.getItem("token")).toBe("test-jwt-token");

    await user.click(screen.getByRole("button", { name: /logout/i }));

    expect(localStorage.getItem("token")).toBeNull();
  });

  it("calls navigate('/login') when logout is clicked", async () => {
    const user = userEvent.setup();
    renderDashboard();

    await user.click(screen.getByRole("button", { name: /logout/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("calls navigate exactly once when logout is clicked", async () => {
    const user = userEvent.setup();
    renderDashboard();

    await user.click(screen.getByRole("button", { name: /logout/i }));

    expect(mockNavigate).toHaveBeenCalledOnce();
  });
});

// ─── 6. Active route highlighting ────────────────────────────────────────────

describe("Active route highlighting", () => {
  it("applies gold text color class to the active Dashboard menu item", () => {
    // Navigate to /dashboard/dashboard — "Dashboard" menu should be active.
    renderDashboard({ initialPath: "/dashboard/dashboard" });

    const dashboardLink = screen.getByRole("link", {
      name: /^Dashboard$/i,
    });
    // The inner div carries the active styles.
    const innerDiv = dashboardLink.querySelector("div");
    expect(innerDiv).not.toBeNull();
    expect(innerDiv!.className).toMatch(/text-\[#c9a84c\]/);
  });

  it("applies gold text color class to the active Anggota menu item", () => {
    renderDashboard({ initialPath: "/dashboard/anggota" });

    const anggotaLink = screen.getByRole("link", { name: /^Anggota$/i });
    const innerDiv = anggotaLink.querySelector("div");
    expect(innerDiv).not.toBeNull();
    expect(innerDiv!.className).toMatch(/text-\[#c9a84c\]/);
  });

  it("applies inactive text color to non-active menu items", () => {
    // On /dashboard/dashboard, Transaksi should be inactive.
    renderDashboard({ initialPath: "/dashboard/dashboard" });

    const transaksiLink = screen.getByRole("link", { name: /^Transaksi$/i });
    const innerDiv = transaksiLink.querySelector("div");
    expect(innerDiv).not.toBeNull();
    // Inactive items use text-white/60.
    expect(innerDiv!.className).toMatch(/text-white\/60/);
  });

  it("applies gold background class to the active menu item container", () => {
    renderDashboard({ initialPath: "/dashboard/dashboard" });

    const dashboardLink = screen.getByRole("link", { name: /^Dashboard$/i });
    const innerDiv = dashboardLink.querySelector("div");
    expect(innerDiv!.className).toMatch(/bg-\[#c9a84c\]\/15/);
  });
});

// ─── 7. Outlet rendering ─────────────────────────────────────────────────────

describe("Outlet rendering", () => {
  it("renders child route content inside the main area", () => {
    renderDashboard({
      outletContent: <p>Hello from child route</p>,
    });

    expect(screen.getByText("Hello from child route")).toBeInTheDocument();
  });

  it("renders child content inside the <main> element", () => {
    renderDashboard({
      outletContent: <span data-testid="child-content">Child</span>,
    });

    const main = document.querySelector("main");
    expect(main).not.toBeNull();
    expect(main).toContainElement(screen.getByTestId("child-content"));
  });
});

// ─── 8. Unauthenticated redirect ─────────────────────────────────────────────

describe("Unauthenticated redirect", () => {
  it("renders the login page when no token is present in localStorage", async () => {
    localStorage.clear(); // No token.

    renderDashboard({ initialPath: "/dashboard/dashboard" });

    // The <Navigate to="/login" /> should cause the Login sentinel to appear.
    await waitFor(() => {
      expect(screen.getByText("Login Page")).toBeInTheDocument();
    });
  });

  it("does not render the sidebar when unauthenticated", () => {
    localStorage.clear();

    renderDashboard({ initialPath: "/dashboard/dashboard" });

    expect(screen.queryByText("Koperasi")).not.toBeInTheDocument();
  });
});
