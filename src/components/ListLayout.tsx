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
