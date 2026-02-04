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
          '--col-landscape': landscape,
          '--col-desktop': desktop
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
