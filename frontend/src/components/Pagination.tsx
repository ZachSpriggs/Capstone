import type { Table } from '@tanstack/react-table';

type Props<T> = {
  table: Table<T>;
};

export default function Pagination<T>({ table }: Props<T>) {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-sm">
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </span>

      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
