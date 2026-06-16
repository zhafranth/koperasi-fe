import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
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
  /**
   * Number of page buttons to show on each side of the current page.
   * Total visible numeric buttons ≈ 2*siblingCount + 5 (first, last, current,
   * 2 ellipsis anchors). Default 1 → max 7 number buttons.
   */
  siblingCount?: number;
}

type PageItem = number | "ellipsis-left" | "ellipsis-right";

function getPageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): PageItem[] {
  // Threshold below which we just show every page (no ellipsis needed).
  const totalVisible = siblingCount * 2 + 5;
  if (totalPages <= totalVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftCount = 3 + 2 * siblingCount;
    const left = Array.from({ length: leftCount }, (_, i) => i + 1);
    return [...left, "ellipsis-right", totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightCount = 3 + 2 * siblingCount;
    const right = Array.from(
      { length: rightCount },
      (_, i) => totalPages - rightCount + 1 + i,
    );
    return [1, "ellipsis-left", ...right];
  }

  // Both sides ellipsed
  const middle = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i,
  );
  return [1, "ellipsis-left", ...middle, "ellipsis-right", totalPages];
}

export function Pagination({
  pagination,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useIsMobile();

  const { page = 1, total_pages } = pagination;
  const current = Number(page);

  const handleLinkPage = (target: number) => {
    if (target < 1 || target > total_pages || target === current) return;
    if (onPageChange) {
      onPageChange(target);
      return;
    }
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(target));
    setSearchParams(newParams);
  };

  // On mobile, when ellipsis is clicked, jump by 5 pages in that direction.
  const jumpToEdge = (direction: "left" | "right") => {
    const target =
      direction === "left"
        ? Math.max(current - 5, 1)
        : Math.min(current + 5, total_pages);
    handleLinkPage(target);
  };

  const pageItems = getPageRange(
    current,
    total_pages,
    isMobile ? 0 : siblingCount,
  );

  return (
    <div className="mb-4">
      <PaginationUI className="justify-end mt-4">
        <PaginationContent className="flex-wrap">
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={current === 1}
              className={`hover:cursor-pointer rounded-xl ${
                current === 1
                  ? "pointer-events-none hover:cursor-not-allowed bg-[#f5f0e8] text-[#a8a29e]"
                  : "hover:bg-[#f5f0e8]"
              }`}
              onClick={() => handleLinkPage(current - 1)}
            />
          </PaginationItem>

          {!isMobile &&
            pageItems.map((item, idx) => {
              if (item === "ellipsis-left" || item === "ellipsis-right") {
                return (
                  <PaginationItem
                    key={`${item}-${idx}`}
                    className="cursor-pointer"
                    onClick={() =>
                      jumpToEdge(item === "ellipsis-left" ? "left" : "right")
                    }
                  >
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              const num = item;
              return (
                <PaginationItem
                  key={num}
                  className={`${
                    current === num
                      ? "bg-[#145a3f] rounded-xl text-white"
                      : "hover:bg-[#f5f0e8] rounded-xl"
                  } cursor-pointer transition-colors`}
                  onClick={() => handleLinkPage(num)}
                >
                  <PaginationLink>{num}</PaginationLink>
                </PaginationItem>
              );
            })}

          {isMobile && (
            <PaginationItem>
              <span className="px-3 text-sm text-[#78716c]">
                {current} / {total_pages}
              </span>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              aria-disabled={current === total_pages}
              className={`hover:cursor-pointer rounded-xl ${
                current === total_pages
                  ? "pointer-events-none hover:cursor-not-allowed bg-[#f5f0e8] text-[#a8a29e]"
                  : "hover:bg-[#f5f0e8]"
              }`}
              onClick={() => handleLinkPage(current + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationUI>
    </div>
  );
}
