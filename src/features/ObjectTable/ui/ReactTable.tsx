import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

export type DataTableProps<Data extends object> = {
  data: Data[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<Data, any>[];
};

export function ReactTable<Data extends object>({
  data,
  columns,
}: DataTableProps<Data>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Table rounded={"lg"}>
      <Thead bgColor="white">
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header, idx) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const meta: any = header.column.columnDef.meta;
              return (
                <Th
                  key={header.id}
                  isNumeric={meta?.isNumeric}
                  {...(idx == 0 && {
                    roundedLeft: "lg",
                  })}
                  {...(headerGroup.headers.length - 1 == idx && {
                    roundedRight: "lg",
                  })}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody bgColor="white">
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const meta: any = cell.column.columnDef.meta;
              return (
                <Td rounded={"lg"} key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
