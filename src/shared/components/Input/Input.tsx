import React from 'react';
import styles from './styles.module.css';
import { InputProps } from '@/shared/data/models/Input.interface';
import { Typography } from '../Typography/Typography';

export const Input = ({
  labelText,
  helperText,
  variant = 'default',
  disabled,
  endIcon,
  isFullWidth = false,
  ...props
}: InputProps) => {
  const fieldClass = [
    styles['input-field'],
    variant === 'success' && styles['input-success'],
    variant === 'error' && styles['input-error'],
    disabled && styles['input-disabled']
  ]
    .filter(Boolean)
    .join(' ');

  const helperClass =
    variant === 'error'
      ? styles['helper-error']
      : variant === 'success'
      ? styles['helper-success']
      : styles['helper-default'];

  return (
    <div
      className={[
        styles['input-wrapper'],
        isFullWidth && styles['fullwidth']
      ].filter(Boolean).join(' ')}
    >
      {labelText && <Typography variant={'sm'}>{labelText}</Typography>}
      <div className={fieldClass}>
        <input className={styles['input-element']} disabled={disabled} {...props} />
        {endIcon && <div className={styles['input-icon']}>{endIcon}</div>}
      </div>
      {helperText && (
        <div className={`${styles['input-helper']} ${helperClass}`}>
          {helperText}
        </div>
      )}
    </div>
  );
};
