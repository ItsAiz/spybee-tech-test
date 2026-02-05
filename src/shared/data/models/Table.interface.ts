
export interface TableColumn {
  header: string;
  accessor: string;
  align?: 'left' | 'right' | 'center' | 'start' | 'end';
}

export type TableCellValue = string | number | React.ReactNode;

export interface TableProps {
  columns: TableColumn[];
  data: Array<Record<string, TableCellValue> & { _highlightColor?: string }>;
}
