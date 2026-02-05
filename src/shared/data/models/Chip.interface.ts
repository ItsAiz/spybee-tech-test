import { TextColor } from "./Typography.interface";

export type ChipBgColor =
  | 'primary-100' | 'primary-200' | 'primary-400' | 'primary-500'
  | 'secondary-100' | 'secondary-200' | 'secondary-500'
  | 'success' | 'color-error' | 'warning' | 'orange'
  | 'neutral-100' | 'neutral-200'
  | 'accent-400' | 'accent-500'
  | string;

export interface ChipProps {
  label: string | number;
  textColor?: TextColor;
  isBoldText?: boolean;
  bgColor?: ChipBgColor;
  isSquare?: boolean;
  minWidth?: string;
}
