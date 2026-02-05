import React from 'react';
import clsx from 'clsx';
import { DividerProps } from '@/shared/data/models/Divider.interface';
import styles from './styles.module.css';

const getColorVariable = (colorName?: string) => {
  if (!colorName) return 'var(--secondary-200)';
  return colorName.startsWith('--') ? `var(${colorName})` : `var(--${colorName})`;
};

export const Divider = ({
  variant = 'horizontal',
  dashed = false,
  size,
  colorVariant
}: DividerProps) => {
  
  const dynamicStyles = {
    '--divider-style': dashed ? 'dashed' : 'solid',
    '--divider-color': getColorVariable(colorVariant),
    '--divider-size': typeof size === 'number' ? `${size}px` : size,
  } as React.CSSProperties;

  return (
    <span
      className={clsx(
        styles.divider,
        variant === 'horizontal' ? styles.horizontal : styles.vertical
      )}
      style={dynamicStyles}
      role={'separator'}
      aria-orientation={variant}
    />
  );
};
