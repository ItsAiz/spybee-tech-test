import React from 'react';
import styles from './styles.module.css';
import { ButtonProps } from '@/shared/data/models/Button.interface';
import clsx from 'clsx';

export const Button = ({
  text,
  leftIcon,
  rightIcon,
  disabled = false,
  isFullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        styles.button,
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
