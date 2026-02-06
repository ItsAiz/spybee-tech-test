import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Inbox } from 'lucide-react';
import clsx from 'clsx';
import { Typography } from '@/shared/components/Typography/Typography';
import { TableProps } from '@/shared/data/models/Table.interface';
import styles from './styles.module.css';
export const Table = ({ columns, data, pagination, onRowClick }: TableProps) => {
  const hasPagination = !!pagination;
  const totalPages = hasPagination 
    ? Math.ceil(pagination.totalCount / pagination.rowsPerPage) 
    : 0;
  
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
            {data?.length > 0 ? data.map((row, rowIndex) => (
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
            )) : (
              <tr>
                <td colSpan={columns.length} className={styles['empty-row']}>
                  <div className={styles['empty-container']}>
                    <Inbox size={48} color={'var(--neutral-400)'} strokeWidth={1} />
                    <Typography variant={'sm'} color={'muted'}>
                      No se encontraron proyectos para mostrar
                    </Typography>
                  </div>
                </td>
              </tr>
            )}
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
              onClick={() => pagination.onPageChange(0)}
              disabled={pagination.page === 0}
              aria-label={'Primera página'}
            >
              <ChevronsLeft size={16} color={'var(--secondary-500)'} />
            </button>
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
            <button
              className={'square-button'}
              onClick={() => pagination.onPageChange(totalPages - 1)}
              disabled={to >= pagination.totalCount}
              aria-label={'Última página'}
            >
              <ChevronsRight size={16} color={'var(--secondary-500)'} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
