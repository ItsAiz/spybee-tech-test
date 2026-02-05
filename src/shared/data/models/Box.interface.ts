export type BoxBorderType = 'solid' | 'dashed' | 'none';

export type BoxColorMapping = 
  | 'primary-400'
  | 'secondary-200'
  | 'neutral-300'
  | 'success'
  | 'error'
  | 'warning'
  | 'base-white'
  | 'base-black'
  | string;

export interface BoxProps {
  borderType?: BoxBorderType;
  borderColor?: BoxColorMapping;
  backgroundColor?: BoxColorMapping;
  padding?: number | string;
  margin?: number | string;
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
  className?: string;
  flexDirection?: 'row' | 'column';
}