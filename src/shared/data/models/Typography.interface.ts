import { JSX } from 'react';

export type TypographyVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'display';
export type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TypographyAlign = 'left' | 'center' | 'right';
export type TextColor =
  | 'default'
  | 'muted'
  | 'primary'
  | 'success'
  | 'error';

export interface TypographyProps {
  children: React.ReactNode
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  color?: TextColor;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}
