import clsx from 'clsx';
import { ButtonProps } from '@/shared/data/models/Button.interface';
import styles from './styles.module.css';

export const Button = ({
  text,
  leftIcon,
  rightIcon,
  disabled = false,
  isFullWidth = false,
  className,
  variant = 'btn-primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        isFullWidth && styles.fullwidth,
        disabled && styles.disabled,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      <span className={styles.text}>{text}</span>
      {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
    </button>
  );
};
