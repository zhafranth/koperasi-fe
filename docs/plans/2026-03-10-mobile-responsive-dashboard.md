# Mobile-Friendly Dashboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the dashboard mobile-friendly with a floating dock navigation, card-based table replacement, and responsive layout adjustments — all at `< md` (768px) breakpoint.

**Architecture:** Replace sidebar with a floating dock on mobile, swap DataTable for card lists in ListLayout, and adjust spacing/pagination for small screens. Uses a `useIsMobile` hook to detect breakpoint and conditionally render components.

**Tech Stack:** React, TailwindCSS, Lucide icons, existing shadcn/ui components

---

### Task 1: Create `useIsMobile` Hook

**Files:**
- Create: `src/hooks/useIsMobile.ts`

**Step 1: Create the hook**

```ts
import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isMobile;
}
```

**Step 2: Verify build**

Run: `cd /Users/zhafrantharif/Documents/learn/koperasi-app/koperasi-fe && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/hooks/useIsMobile.ts
git commit -m "feat(mobile): add useIsMobile hook for responsive breakpoint detection"
```

---

### Task 2: Create FloatingDock Component

**Files:**
- Create: `src/components/FloatingDock.tsx`

**Step 1: Create the floating dock component**

```tsx
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  Users,
  Wallet,
  MoreHorizontal,
  Home,
  ArrowDownToLine,
  LogOut,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const dockItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Transaksi", icon: Receipt, path: "/transaksi" },
  { title: "Anggota", icon: Users, path: "/anggota" },
  { title: "Pinjaman", icon: Wallet, path: "/pinjaman?status=proses" },
];

const moreItems = [
  { title: "Keluarga", icon: Home, path: "/keluarga" },
  { title: "Penarikan", icon: ArrowDownToLine, path: "/penarikan" },
];

interface FloatingDockProps {
  onLogout: () => void;
}

const FloatingDock = ({ onLogout }: FloatingDockProps) => {
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setShowMore(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) =>
    location.pathname.replace("/dashboard", "").includes(path);

  // Check if any "more" item is active
  const isMoreActive = moreItems.some((item) => isActive(item.path));

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
      {/* More popover */}
      {showMore && (
        <div
          ref={moreRef}
          className="absolute bottom-full mb-3 right-0 bg-[#0d3b2c]/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-2 min-w-[160px] kp-fade-up"
        >
          {moreItems.map((item) => (
            <Link
              key={item.path}
              to={`/dashboard${item.path}`}
              onClick={() => setShowMore(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                isActive(item.path)
                  ? "text-[#c9a84c] bg-[#c9a84c]/15"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
          <div className="h-px bg-white/10 my-1" />
          <button
            type="button"
            onClick={() => {
              setShowMore(false);
              onLogout();
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-white/10 transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}

      {/* Dock bar */}
      <div className="flex items-center gap-1 bg-black/70 backdrop-blur-xl rounded-full px-3 py-2 shadow-2xl border border-white/10">
        {dockItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={`/dashboard${item.path}`}
              className="flex flex-col items-center justify-center w-14 h-12 rounded-full transition-colors"
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  active ? "text-[#c9a84c]" : "text-white/50"
                )}
              />
              {active && (
                <div className="w-1 h-1 rounded-full bg-[#c9a84c] mt-1" />
              )}
            </Link>
          );
        })}

        {/* More button */}
        <button
          type="button"
          onClick={() => setShowMore(!showMore)}
          className="flex flex-col items-center justify-center w-14 h-12 rounded-full transition-colors"
        >
          <MoreHorizontal
            className={cn(
              "h-5 w-5 transition-colors",
              showMore || isMoreActive ? "text-[#c9a84c]" : "text-white/50"
            )}
          />
          {isMoreActive && !showMore && (
            <div className="w-1 h-1 rounded-full bg-[#c9a84c] mt-1" />
          )}
        </button>
      </div>
    </div>
  );
};

export default FloatingDock;
```

**Step 2: Verify build**

Run: `cd /Users/zhafrantharif/Documents/learn/koperasi-app/koperasi-fe && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/FloatingDock.tsx
git commit -m "feat(mobile): create FloatingDock component with glass effect and more popover"
```

---

### Task 3: Integrate FloatingDock into Dashboard Layout

**Files:**
- Modify: `src/pages/dashboard/Dashboard.tsx`

**Step 1: Update Dashboard.tsx**

Changes needed:
1. Import `FloatingDock` and `useIsMobile`
2. Hide sidebar, hamburger, and overlay on mobile — show FloatingDock instead
3. Add `pb-24` to main content on mobile for dock clearance
4. Reduce main padding from `p-6` to `p-4` on mobile

```tsx
// Add imports at top:
import FloatingDock from "@/components/FloatingDock";
import { useIsMobile } from "@/hooks/useIsMobile";

// Inside component, add:
const isMobile = useIsMobile();

// Replace the hamburger button with:
{!isMobile && (
  <Button
    variant="ghost"
    size="icon"
    className="absolute top-4 left-4 md:hidden z-50 text-white hover:bg-white/10"
    onClick={() => setIsOpen(!isOpen)}
  >
    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
  </Button>
)}

// Replace the sidebar <aside> opening tag className — add "hidden md:flex" when isMobile:
// The sidebar should be completely hidden on < md. Since the sidebar already has
// "fixed md:static" and "-translate-x-full md:translate-x-0", we change it to:
// Add "md:flex" and make it always hidden below md by removing the mobile slide logic.
// Simplest approach: wrap sidebar + overlay in {!isMobile && (...)}

// Replace overlay with:
{!isMobile && isOpen && (
  <div ... />
)}

// Update main className:
<main className={cn("flex-1 overflow-y-auto", isMobile ? "p-4 pb-24" : "p-6")}>

// Add FloatingDock before closing </div> of root:
{isMobile && <FloatingDock onLogout={logout} />}
```

Full replacement of the return block:

```tsx
return (
  <div className="flex h-screen bg-[#f7f5f0]">
    {/* Mobile Menu Button — only for tablet (md breakpoint sidebar) */}
    {!isMobile && (
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 md:hidden z-50 text-white hover:bg-white/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
    )}

    {/* Sidebar — hidden on mobile, shown on md+ */}
    {!isMobile && (
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 w-64 bg-gradient-to-b from-[#0d3b2c] via-[#145a3f] to-[#0d3b2c] transform transition-transform duration-300 ease-in-out z-40 flex flex-col shadow-xl",
          {
            "-translate-x-full md:translate-x-0": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
      >
        {/* ... existing sidebar content unchanged ... */}
      </aside>
    )}

    {/* Overlay for tablet slide-in sidebar */}
    {!isMobile && isOpen && (
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-30"
        onClick={() => setIsOpen(false)}
      />
    )}

    {/* Main Content */}
    <main className={cn("flex-1 overflow-y-auto", isMobile ? "p-4 pb-24" : "p-6")}>
      <div className="h-full">
        <Outlet />
      </div>
    </main>

    {/* Floating Dock — mobile only */}
    {isMobile && <FloatingDock onLogout={logout} />}
  </div>
);
```

**Step 2: Verify build**

Run: `cd /Users/zhafrantharif/Documents/learn/koperasi-app/koperasi-fe && npx tsc --noEmit`
Expected: No errors

**Step 3: Manual test**

Open browser, resize to < 768px width. Verify:
- Sidebar is gone
- Floating dock appears at bottom center
- Tapping dock items navigates correctly
- "More" opens popover with Keluarga, Penarikan, Logout
- Tapping outside popover closes it
- Active item shows gold icon + dot

**Step 4: Commit**

```bash
git add src/pages/dashboard/Dashboard.tsx
git commit -m "feat(mobile): integrate FloatingDock, hide sidebar on mobile"
```

---

### Task 4: Create MobileCard Component

**Files:**
- Create: `src/components/MobileCard.tsx`

**Step 1: Create a generic mobile card component**

This component takes a `renderCard` function prop so each page can define its own card layout.

```tsx
import { SkeletonCard } from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import { Inbox } from "lucide-react";

interface MobileCardListProps<TData> {
  data: TData[];
  renderCard: (item: TData, index: number) => React.ReactNode;
  isLoading?: boolean;
}

export function MobileCardList<TData>({
  data,
  renderCard,
  isLoading,
}: MobileCardListProps<TData>) {
  if (isLoading) {
    return (
      <div className="space-y-3 kp-fade-up kp-d2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-[#e7e5e0] p-4 space-y-3"
          >
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-[#e7e5e0] rounded kp-shimmer" />
              <div className="h-5 w-16 bg-[#e7e5e0] rounded-full kp-shimmer" />
            </div>
            <div className="flex justify-between">
              <div className="h-5 w-28 bg-[#e7e5e0] rounded kp-shimmer" />
              <div className="h-4 w-20 bg-[#e7e5e0] rounded kp-shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!data.length) {
    return (
      <EmptyState
        icon={Inbox}
        title="Tidak ada data"
        description="Belum ada data yang tersedia untuk ditampilkan."
      />
    );
  }

  return (
    <div className="space-y-3 kp-fade-up kp-d2">
      {data.map((item, index) => renderCard(item, index))}
    </div>
  );
}
```

**Step 2: Verify build**

Run: `cd /Users/zhafrantharif/Documents/learn/koperasi-app/koperasi-fe && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/MobileCard.tsx
git commit -m "feat(mobile): create MobileCardList component for mobile table replacement"
```

---

### Task 5: Update ListLayout to Support Mobile Cards

**Files:**
- Modify: `src/components/ListLayout.tsx`

**Step 1: Add `renderMobileCard` prop and conditional rendering**

```tsx
import type { ColumnDef } from "@tanstack/react-table";
import Header from "./Header";
import { DataTable } from "./Table";
import { Pagination } from "./Pagination";
import { MobileCardList } from "./MobileCard";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Props<TData, TValue> {
  title: string;
  filters?: {
    queryKey: string;
    label: string;
    options: { value: string; label: string }[];
  }[];
  extendButtons?: React.ReactNode;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  extraComponents?: React.ReactNode;
  isLoading?: boolean;
  pagination?: {
    page: number;
    total: number;
    total_pages: number;
  };
  renderMobileCard?: (item: TData, index: number) => React.ReactNode;
}

function ListLayout<TData, TValue>({
  title,
  extendButtons,
  filters = [],
  columns,
  data,
  extraComponents,
  isLoading,
  pagination,
  renderMobileCard,
}: Props<TData, TValue>) {
  const isMobile = useIsMobile();

  return (
    <>
      <Header title={title} extendButtons={extendButtons} filters={filters} />
      {extraComponents}
      {isMobile && renderMobileCard ? (
        <MobileCardList data={data} renderCard={renderMobileCard} isLoading={isLoading} />
      ) : (
        <DataTable columns={columns} data={data} isLoading={isLoading} />
      )}
      {pagination && <Pagination pagination={pagination} />}
    </>
  );
}

export default ListLayout;
```

**Step 2: Verify build**

Run: `cd /Users/zhafrantharif/Documents/learn/koperasi-app/koperasi-fe && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/ListLayout.tsx
git commit -m "feat(mobile): add renderMobileCard prop to ListLayout for conditional card rendering"
```

---

### Task 6: Add Mobile Cards to TransaksiList

**Files:**
- Modify: `src/pages/transaksi/list/TransaksiList.tsx`

**Step 1: Add renderMobileCard to TransaksiList**

Add this import and function, then pass to ListLayout:

```tsx
// Add imports:
import Chips from "@/components/Chips";
import { TRANSAKSI_OPTIONS } from "@/constant/transaksi";
import { formatCurrency } from "@/lib/utils";
import { formatDate } from "date-fns";

// Inside TransaksiList component, add renderMobileCard:
const renderMobileCard = (item: TransaksiProps, index: number) => {
  const amount = Number(item.jumlah);
  return (
    <div
      key={item.id}
      className="bg-white rounded-xl border border-[#e7e5e0] p-4 kp-fade-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-[#1c1917] truncate mr-2">
          {item.nama_anggota || "Koperasi"}
        </p>
        <Chips options={TRANSAKSI_OPTIONS} value={item.jenis} />
      </div>
      <div className="flex items-center justify-between">
        <p className={`text-sm font-bold ${amount < 0 ? "text-red-600" : "text-green-600"}`}>
          {formatCurrency(amount)}
        </p>
        <p className="text-xs text-[#a8a29e]">
          {formatDate(new Date(item.createdAt), "dd MMM yyyy")}
        </p>
      </div>
    </div>
  );
};

// Update ListLayout usage — add renderMobileCard prop:
<ListLayout
  columns={columns}
  data={items}
  isLoading={isLoading}
  title="Transaksi"
  filters={[...]}
  extraComponents={<InfoTotal />}
  pagination={pagination}
  extendButtons={<ButtonAddTransaksi />}
  renderMobileCard={renderMobileCard}
/>
```

**Step 2: Verify build**

Run: `cd /Users/zhafrantharif/Documents/learn/koperasi-app/koperasi-fe && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/pages/transaksi/list/TransaksiList.tsx
git commit -m "feat(mobile): add mobile card view for transaksi list"
```

---

### Task 7: Add Mobile Cards to PinjamanList

**Files:**
- Modify: `src/pages/pinjaman/list/PinjamanList.tsx`

**Step 1: Add renderMobileCard to PinjamanList**

```tsx
// Add imports:
import type { PinjamanProps } from "@/api/pinjaman/pinjaman.interface";
import Chips from "@/components/Chips";
import { STATUS_PINJAMAN_OPTIONS } from "@/constant/pinjaman";
import { formatCurrency } from "@/lib/utils";
import { formatDate } from "date-fns";

// Inside PinjamanList, add:
const renderMobileCard = (item: PinjamanProps, index: number) => (
  <div
    key={item.id_pinjaman}
    className="bg-white rounded-xl border border-[#e7e5e0] p-4 kp-fade-up"
    style={{ animationDelay: `${index * 0.05}s` }}
  >
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm font-semibold text-[#1c1917] truncate mr-2">
        {item.nama_anggota}
      </p>
      <Chips options={STATUS_PINJAMAN_OPTIONS} value={item.status} />
    </div>
    <div className="flex items-center justify-between">
      <p className="text-sm font-bold text-[#1c1917]">
        {formatCurrency(Number(item.jumlah))}
      </p>
      <p className="text-xs text-[#a8a29e]">
        {formatDate(new Date(item.createdAt), "dd MMM yyyy")}
      </p>
    </div>
  </div>
);

// Add to ListLayout:
<ListLayout
  columns={columns}
  data={data}
  isLoading={isLoading}
  title="Pinjaman"
  filters={[...]}
  extendButtons={<ButtonAddPinjaman />}
  renderMobileCard={renderMobileCard}
/>
```

**Step 2: Verify build**

Run: `cd /Users/zhafrantharif/Documents/learn/koperasi-app/koperasi-fe && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/pages/pinjaman/list/PinjamanList.tsx
git commit -m "feat(mobile): add mobile card view for pinjaman list"
```

---

### Task 8: Add Mobile Cards to PenarikanList

**Files:**
- Modify: `src/pages/penarikan/list/PenarikanList.tsx`

**Step 1: Add renderMobileCard to PenarikanList**

```tsx
// Add imports:
import type { PenarikanProps } from "@/api/penarikan/penarikan.interface";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { formatDate } from "date-fns";

const SUMBER_LABEL: Record<string, string> = {
  simpanan: "Simpanan",
  sukarela: "Sukarela",
  infaq: "Infaq",
  liburan: "Liburan",
};

const SUMBER_COLOR: Record<string, string> = {
  simpanan: "bg-emerald-100 text-emerald-700",
  sukarela: "bg-violet-100 text-violet-700",
  infaq: "bg-teal-100 text-teal-700",
  liburan: "bg-cyan-100 text-cyan-700",
};

// Inside PenarikanList, add:
const renderMobileCard = (item: PenarikanProps, index: number) => (
  <div
    key={item.id}
    className="bg-white rounded-xl border border-[#e7e5e0] p-4 kp-fade-up"
    style={{ animationDelay: `${index * 0.05}s` }}
  >
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm font-semibold text-[#1c1917] truncate mr-2">
        {item.nama || "Koperasi"}
      </p>
      <Badge className={`rounded-full ${SUMBER_COLOR[item.sumber] || "bg-gray-100 text-gray-700"}`}>
        {SUMBER_LABEL[item.sumber] || item.sumber}
      </Badge>
    </div>
    <div className="flex items-center justify-between">
      <p className="text-sm font-bold text-red-600">
        {formatCurrency(Number(item.jumlah))}
      </p>
      <p className="text-xs text-[#a8a29e]">
        {formatDate(new Date(item.tanggal), "dd MMM yyyy")}
      </p>
    </div>
  </div>
);

// Add to ListLayout:
<ListLayout
  columns={columns}
  data={data}
  isLoading={isLoading}
  title="Penarikan"
  filters={[...]}
  extendButtons={isPengurus ? (...) : undefined}
  renderMobileCard={renderMobileCard}
/>
```

**Step 2: Verify build**

Run: `cd /Users/zhafrantharif/Documents/learn/koperasi-app/koperasi-fe && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/pages/penarikan/list/PenarikanList.tsx
git commit -m "feat(mobile): add mobile card view for penarikan list"
```

---

### Task 9: Make Header Responsive

**Files:**
- Modify: `src/components/Header.tsx`

**Step 1: Update Header to stack vertically on mobile**

```tsx
import Filter from "./Filter";

interface Props {
  title: string;
  filters?: {
    queryKey: string;
    label: string;
    options: { value: string; label: string }[];
  }[];
  extendButtons?: React.ReactNode;
}

const Header: React.FC<Props> = ({ title, filters = [], extendButtons }) => {
  return (
    <div className="kp-fade-up">
      <h2 className="text-2xl font-bold text-[#1c1917]">{title}</h2>
      <div className="my-4 h-[1px] w-full bg-[#e7e5e0]" />
      <div className="flex flex-col gap-3 mb-6 md:flex-row">
        <div className="flex gap-2 flex-wrap">
          {filters?.map(({ label, options, queryKey }, index) => (
            <Filter
              key={index}
              queryKey={queryKey}
              label={label}
              options={options}
            />
          ))}
        </div>
        <div className="md:ml-auto">{extendButtons}</div>
      </div>
    </div>
  );
};

export default Header;
```

**Step 2: Verify build**

Run: `cd /Users/zhafrantharif/Documents/learn/koperasi-app/koperasi-fe && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat(mobile): make Header stack vertically on mobile"
```

---

### Task 10: Simplify Pagination on Mobile

**Files:**
- Modify: `src/components/Pagination.tsx`

**Step 1: Update Pagination to show only prev/next on mobile**

```tsx
import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";

interface PaginationProps {
  pagination: {
    page: number;
    total: number;
    total_pages: number;
  };
  onPageChange?: (page: number) => void;
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useIsMobile();

  const { page = 1, total_pages } = pagination;

  const handleLinkPage = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
      return;
    }
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(page));
    setSearchParams(newParams);
  };

  return (
    <div className="mb-4">
      <PaginationUI className="justify-end mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={true}
              className={`hover:cursor-pointer rounded-xl ${
                page === 1
                  ? "pointer-events-none hover:cursor-not-allowed bg-[#f5f0e8] text-[#a8a29e]"
                  : "hover:bg-[#f5f0e8]"
              }`}
              onClick={() => handleLinkPage(Number(page) - 1)}
            />
          </PaginationItem>

          {/* Page numbers — hidden on mobile */}
          {!isMobile &&
            Array.from({ length: total_pages }, (_, i) => i + 1).map((num) => (
              <PaginationItem
                key={num}
                className={`${
                  Number(page) === num
                    ? "bg-[#145a3f] rounded-xl text-white"
                    : "hover:bg-[#f5f0e8] rounded-xl"
                } cursor-pointer transition-colors`}
                onClick={() => handleLinkPage(num)}
              >
                <PaginationLink>{num}</PaginationLink>
              </PaginationItem>
            ))}

          {/* Mobile page indicator */}
          {isMobile && (
            <PaginationItem>
              <span className="px-3 text-sm text-[#78716c]">
                {page} / {total_pages}
              </span>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              className={`hover:cursor-pointer rounded-xl ${
                Number(page) === total_pages
                  ? "pointer-events-none hover:cursor-not-allowed bg-[#f5f0e8] text-[#a8a29e]"
                  : "hover:bg-[#f5f0e8]"
              }`}
              onClick={() => handleLinkPage(Number(page) + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationUI>
    </div>
  );
}
```

**Step 2: Verify build**

Run: `cd /Users/zhafrantharif/Documents/learn/koperasi-app/koperasi-fe && npx tsc --noEmit`
Expected: No errors

**Step 3: Manual test**

Resize browser to < 768px. Verify pagination shows "1 / 5" style indicator instead of page number buttons.

**Step 4: Commit**

```bash
git add src/components/Pagination.tsx
git commit -m "feat(mobile): simplify pagination to prev/next with page indicator on mobile"
```

---

### Task 11: Final Integration Test

**Step 1: Run full build**

Run: `cd /Users/zhafrantharif/Documents/learn/koperasi-app/koperasi-fe && yarn build`
Expected: Build succeeds with no errors

**Step 2: Manual test checklist**

Open browser dev tools, test at 375px width (iPhone SE) and 768px width (iPad):

- [ ] **< 768px**: Sidebar hidden, floating dock visible at bottom
- [ ] **< 768px**: Dock has 4 icons + More button
- [ ] **< 768px**: More popover shows Keluarga, Penarikan, Logout
- [ ] **< 768px**: Active dock item has gold icon + dot
- [ ] **< 768px**: Transaksi page shows card list instead of table
- [ ] **< 768px**: Pinjaman page shows card list instead of table
- [ ] **< 768px**: Penarikan page shows card list instead of table
- [ ] **< 768px**: Cards show nama + badge on row 1, amount + date on row 2
- [ ] **< 768px**: Pagination shows "1 / N" instead of page numbers
- [ ] **< 768px**: Header filters stack vertically
- [ ] **< 768px**: Content has bottom padding for dock clearance
- [ ] **>= 768px**: Everything works as before (sidebar, tables, full pagination)

**Step 3: Final commit (if any fixes needed)**

```bash
git commit -m "fix(mobile): address integration test issues"
```
