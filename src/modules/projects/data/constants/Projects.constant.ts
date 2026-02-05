import { TableColumn } from '@/shared/data/models/Table.interface';
import { TextColor } from '@/shared/data/models/Typography.interface';
import { ProjectPlanData } from '../models/Projects.interface';

export const ROWS_PER_PAGE = 10;

export const PROJECT_LIST_COLUMNS: TableColumn[] = [
  { header: 'Proyecto', accessor: 'projectInfo' },
  { header: 'Plan', accessor: 'plan' },
  { header: 'Estado', accessor: 'state' },
  { header: 'Equipo', accessor: 'partners' },
  { header: 'Items por vencer', accessor: 'itemsToBeat', align: 'center' },
];

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  active: 'Activo',
  suspended: 'Suspendido',
  pending_payment: 'Pago Pendiente',
  inactive: 'Inactivo',
};

export const PROJECT_STATUS_COLORS: Record<string, { bg: string; text: TextColor }> = {
  active: {
    bg: 'accent-400',
    text: 'success',
  },
  suspended: {
    bg: 'neutral-200',
    text: 'default',
  },
  pending_payment: {
    bg: 'primary-500',
    text: 'muted',
  },
  inactive: {
    bg: 'error-400',
    text: 'muted',
  },
};

export const PROJECT_PLAN_LABELS: Record<ProjectPlanData['plan'], string> = {
  small: 'Pequeño',
  big: 'Avanzado',
  premium: 'Premium',
};

export const PROJECT_PLAN_COLORS: Record<ProjectPlanData['plan'], { bg: string; text: TextColor }> = {
  small: {
    bg: 'orange',
    text: 'white',
  },
  big: {
    bg: 'neutral-500',
    text: 'white',
  },
  premium: {
    bg: 'primary-500',
    text: 'default',
  }
};
