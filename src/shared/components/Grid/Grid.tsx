import clsx from 'clsx';
import { GridProps } from '@/shared/data/models/Grid.interface';
import styles from './styles.module.css';

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
