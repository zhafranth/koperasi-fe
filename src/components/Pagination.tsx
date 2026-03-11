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
    <div className={isMobile ? "mb-20" : "mb-4"}>
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
