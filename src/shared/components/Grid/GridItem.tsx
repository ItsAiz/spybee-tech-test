import { GridItemProps } from '@/shared/data/models/Grid.interface';
import styles from './styles.module.css';

export const GridItem = ({
  children,
  span = 12,
  portrait,
  landscape,
  desktop
}: GridItemProps) => {
  return (
    <div
      className={styles.item}
      style={
        {
          '--col-span': portrait ?? span,
          '--col-landscape': landscape ?? portrait ?? span,
          '--col-desktop': desktop ?? landscape ?? portrait ?? span
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
