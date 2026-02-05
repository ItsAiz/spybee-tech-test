import React from 'react';
import clsx from 'clsx';
import { Typography } from '@/shared/components/Typography/Typography';
import { TableProps } from '@/shared/data/models/Table.interface';
import styles from './styles.module.css';

export const Table = ({ columns, data }: TableProps) => {
  return (
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
                    <Typography 
                      weight={'bold'} 
                      variant={'xs'} 
                      className={styles.textMuted}
                    >
                      {col.header.toUpperCase()}
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
              className={clsx(styles.row, row._highlightColor && styles.highlighted)}
              style={{ '--highlight-color': row._highlightColor } as React.CSSProperties}
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
  );
};
