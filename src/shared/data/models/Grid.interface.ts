export interface GridProps {
  children: React.ReactNode;
  withSidebar?: boolean;
  isSubGrid?: boolean;
  className?: string;
}


export interface GridItemProps {
  children: React.ReactNode;
  span?: number;
  portrait?: number;
  landscape?: number;
  desktop?: number;
}
