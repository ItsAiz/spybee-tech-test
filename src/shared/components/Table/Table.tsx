import clsx from 'clsx';
import { Typography } from '@/shared/components/Typography/Typography';
import { TableProps } from '@/shared/data/models/Table.interface';
import styles from './styles.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Table = ({ columns, data, pagination, onRowClick }: TableProps) => {
  const hasPagination = !!pagination;
  const from = hasPagination ? pagination.page * pagination.rowsPerPage + 1 : 0;
  const to = hasPagination
    ? Math.min((pagination.page + 1) * pagination.rowsPerPage, pagination.totalCount)
    : 0;

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {columns.map((col) => {
                const alignmentClass =
                  col.align === 'center'
                    ? styles.alignCenter
                    : col.align === 'right'
                      ? styles.alignRight
                      : styles.alignLeft;

                return (
                  <th key={col.header} className={styles.headerCell}>
                    <div className={clsx(styles.headerContent, alignmentClass)}>
                      <Typography weight={'bold'} variant={'sm'} className={styles.textMuted}>
                        {col.header}
                      </Typography>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={clsx(
                  styles.row, 
                  row._highlightColor && styles.highlighted,
                  onRowClick && styles['clickable-row']
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td
                    key={`${rowIndex}-${col.accessor}`}
                    className={styles.cell}
                    style={{ textAlign: col.align || 'left' }}
                  >
                    {typeof row[col.accessor] === 'string' || typeof row[col.accessor] === 'number' ? (
                      <Typography variant={'sm'}>{row[col.accessor] as string}</Typography>
                    ) : (
                      row[col.accessor]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasPagination && (
        <div className={styles.paginationFooter}>
          <Typography variant={'sm'} className={styles.textMuted}>
            {`${from}-${to} de ${pagination.totalCount}`}
          </Typography>
          <div className={styles.paginationActions}>
            <button
              className={'square-button'}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page === 0}
              aria-label={'Página anterior'}
            >
              <ChevronLeft size={16} color={'var(--secondary-500)'} />
            </button>
            <div className={styles.currentPageIndicator}>
              <Typography weight={'bold'} variant={'sm'}>
                {pagination.page + 1}
              </Typography>
            </div>
            <button
              className={'square-button'}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={to >= pagination.totalCount}
              aria-label={'Página siguiente'}
            >
              <ChevronRight size={16} color={'var(--secondary-500)'} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
