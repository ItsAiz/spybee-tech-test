type Variant = 'default' | 'success' | 'error';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  helperText?: string;
  variant?: Variant;
  endIcon?: React.ReactNode;
  isFullWidth?: boolean;
}
