export type ColorVariants =
  | 'secondary-200'
  | 'neutral-300'
  | 'primary-400'
  | 'success'
  | 'error'
  | string;

export interface DividerProps {
  variant?: 'horizontal' | 'vertical';
  dashed?: boolean;
  size?: number | string;
  colorVariant?: ColorVariants;
}
