/**
 * src/test/utils.tsx
 *
 * Shared test utilities for the koperasi-fe project.
 *
 * Provides:
 *   - renderWithProviders: renders a component wrapped in QueryClientProvider +
 *     MemoryRouter so hooks that use React Query and react-router-dom work.
 *   - createTestQueryClient: creates a QueryClient configured for tests
 *     (no retries, no garbage collection delay).
 *   - wrapperWithProviders: a React function component suitable for use as the
 *     `wrapper` option of renderHook().
 */

import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, type MemoryRouterProps } from "react-router-dom";

// ─── QueryClient factory ──────────────────────────────────────────────────────

/**
 * Creates a QueryClient optimised for unit tests:
 * - No automatic retries on failure.
 * - Mutations also never retry.
 * - gcTime 0 prevents cached data from leaking across tests.
 */
export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

// ─── Render options ───────────────────────────────────────────────────────────

interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
  /** Pre-created QueryClient instance. Creates a fresh one when not supplied. */
  queryClient?: QueryClient;
  /** Initial URL entries for MemoryRouter. Defaults to ["/"]. */
  initialEntries?: MemoryRouterProps["initialEntries"];
  /** Initial index for MemoryRouter. Defaults to 0. */
  initialIndex?: MemoryRouterProps["initialIndex"];
}

/**
 * Renders a React element wrapped in:
 *   QueryClientProvider -> MemoryRouter
 *
 * Returns everything @testing-library/react's render() returns, plus the
 * queryClient instance so tests can inspect cached query data.
 *
 * @example
 * const { getByText, queryClient } = renderWithProviders(<MyComponent />);
 */
export function renderWithProviders(
  ui: React.ReactElement,
  {
    queryClient,
    initialEntries = ["/"],
    initialIndex = 0,
    ...renderOptions
  }: RenderWithProvidersOptions = {},
) {
  const client = queryClient ?? createTestQueryClient();

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
          {children}
        </MemoryRouter>
      </QueryClientProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    queryClient: client,
  };
}

// ─── renderHook wrapper factory ───────────────────────────────────────────────

/**
 * Returns a wrapper component suitable for use as the `wrapper` option of
 * @testing-library/react's renderHook().
 *
 * @example
 * const wrapper = createHookWrapper({ initialEntries: ["/dashboard"] });
 * const { result } = renderHook(() => useMyHook(), { wrapper });
 */
export function createHookWrapper(
  {
    queryClient,
    initialEntries = ["/"],
    initialIndex = 0,
  }: Pick<
    RenderWithProvidersOptions,
    "queryClient" | "initialEntries" | "initialIndex"
  > = {},
) {
  const client = queryClient ?? createTestQueryClient();

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
          {children}
        </MemoryRouter>
      </QueryClientProvider>
    );
  }

  // Expose queryClient so callers can make assertions on cached data.
  Wrapper.queryClient = client;

  return Wrapper;
}

// ─── localStorage helpers ─────────────────────────────────────────────────────

/**
 * Sets a fake auth token in localStorage so that hooks which read
 * `localStorage.getItem("token")` (e.g. useAuth, axios interceptor) behave
 * as if the user is authenticated.
 */
export function setAuthToken(token = "test-jwt-token"): void {
  localStorage.setItem("token", token);
}

/**
 * Removes the auth token from localStorage.
 */
export function clearAuthToken(): void {
  localStorage.removeItem("token");
}
