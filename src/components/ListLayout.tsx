import type { ColumnDef } from "@tanstack/react-table";
import Header from "./Header";
import { DataTable } from "./Table";

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
}

function ListLayout<TData, TValue>({
  title,
  extendButtons,
  filters = [],
  columns,
  data,
}: Props<TData, TValue>) {
  return (
    <>
      <Header title={title} extendButtons={extendButtons} filters={filters} />
      <DataTable columns={columns} data={data} />
    </>
  );
}

export default ListLayout;
