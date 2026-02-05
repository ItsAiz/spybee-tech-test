
export interface TableColumn {
  header: string;
  accessor: string;
  align?: 'left' | 'right' | 'center' | 'start' | 'end';
}

export type TableCellValue = string | number | React.ReactNode;

export interface TablePaginationProps {
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
}

export interface TableProps {
  columns: TableColumn[];
  data: Array<Record<string, TableCellValue> & { _highlightColor?: boolean }>;
  pagination?: TablePaginationProps;
  onRowClick?: (row: Record<string, TableCellValue>) => void;
}
