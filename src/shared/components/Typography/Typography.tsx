import clsx from 'clsx';
import { TypographyProps } from '@/shared/data/models/Typography.interface';
import styles from './styles.module.css';

export const Typography = ({
  children,
  variant = 'md',
  weight = 'regular',
  align = 'left',
  color = 'default',
  as: Component = 'p',
  className,
}: TypographyProps) => {
  return (
    <Component
      className={clsx(
        styles.text,
        styles[`variant-${variant}`],
        styles[`weight-${weight}`],
        styles[`align-${align}`],
        styles[`color-${color}`],
        className
      )}
    >
      {children}
    </Component>
  );
};
