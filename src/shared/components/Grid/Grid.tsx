import { GridProps } from '@/shared/data/models/Grid.interface';
import styles from './styles.module.css';
import clsx from 'clsx';

export const Grid = ({
  children,
  withSidebar = false,
  isSubGrid = false,
  className
}: GridProps) => {
  return (
    <div
      className={clsx(
        styles.grid,
        withSidebar && styles.withSidebar,
        isSubGrid && styles.subGrid,
        className
      )}
    >
      {children}
    </div>
  );
};
