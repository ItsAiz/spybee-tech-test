import React from 'react';
import { BoxProps } from '@/shared/data/models/Box.interface';
import styles from './styles.module.css';

const getSpacingValue = (val?: number | string) => {
  if (val === undefined) return undefined;
  if (typeof val === 'number') return `var(--space-${val})`;
  return val;
};

const getColorVariable = (colorName?: string) => {
  if (!colorName) return 'transparent';
  return colorName.startsWith('--') ? `var(${colorName})` : `var(--${colorName})`;
};

export const Box = ({
  padding,
  margin,
  children,
  borderType = 'none',
  flexDirection = 'column',
  backgroundColor = '--secondary-50',
  borderColor,
  width,
  height,
}: BoxProps) => {
  
  const dynamicStyles = {
    '--box-padding': getSpacingValue(padding),
    '--box-margin': getSpacingValue(margin),
    '--box-width': typeof width === 'number' ? `${width}px` : width,
    '--box-height': typeof height === 'number' ? `${height}px` : height,
    '--box-border-style': borderType,
    '--box-border-color': getColorVariable(borderColor),
    backgroundColor: getColorVariable(backgroundColor),
    flexDirection
  } as React.CSSProperties;

  return (
    <div className={styles.box} style={dynamicStyles}>
      {children}
    </div>
  );
};