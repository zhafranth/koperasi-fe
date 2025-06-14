import type { ColumnDef } from "@tanstack/react-table";
import Header from "./Header";
import { DataTable } from "./Table";
import { Pagination } from "./Pagination";

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
  pagination?: {
    page: number;
    total: number;
    total_pages: number;
  };
}

function ListLayout<TData, TValue>({
  title,
  extendButtons,
  filters = [],
  columns,
  data,
  extraComponents,
  pagination,
}: Props<TData, TValue>) {
  return (
    <>
      <Header title={title} extendButtons={extendButtons} filters={filters} />
      {extraComponents}
      <DataTable columns={columns} data={data} />
      {pagination && <Pagination pagination={pagination} />}
    </>
  );
}

export default ListLayout;
