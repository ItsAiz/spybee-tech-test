import { PinOff, Funnel, History, CalendarDays } from 'lucide-react';
import { Typography } from '@shared/components/Typography/Typography';
import { Button } from '@/shared/components/Button/Button';
import { Spacing } from '@/shared/components/Spacing/Spacing';
import { Divider } from '@/shared/components/Divider/Divider';
import { Box } from '@shared/components/Box/Box';

export const ResumeView = () => {
  return (
    <>
      <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
        <PinOff color={'var(--secondary-500)'} size={18} />
        <Typography variant={'lg'} weight={'semibold'} color={'muted'}>
          Resumen
        </Typography>
      </div>
      <Spacing spy={12} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
          <Typography variant={'sm'} weight={'semibold'} color={'muted'}>
            General
          </Typography>
        </div>
        <Button text={'Mis actualizaciones'} variant={'btn-text'} isFullWidth />
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
          <Funnel color={'var(--secondary-500)'} size={12} />
          <Typography variant={'sm'} weight={'semibold'} color={'muted'}>
            Filtros
          </Typography>
        </div>
      </div>
      <Divider />
      <Spacing spy={4} />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
          <History color={'var(--secondary-500)'} size={18} />
          <Typography variant={'md'} weight={'semibold'} color={'muted'}>
            Próximos a vencer
          </Typography>
        </div>
        <Typography variant={'sm'} weight={'semibold'} color={'info'}>
          Ver todos
        </Typography>
      </div>
      <Spacing spy={8} />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box height={150} width={130} padding={'var(--space-4)'} backgroundColor={'--neutral-300'}>
        </Box>
        <Box height={150} width={130} padding={'var(--space-4)'} backgroundColor={'--neutral-300'}>
        </Box>
        <Box height={150} width={130} padding={'var(--space-4)'} backgroundColor={'--neutral-300'}>
        </Box>
      </div>
      <Spacing spy={8} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        <Box height={30} padding={'var(--space-4)'} backgroundColor={'--neutral-300'}>
        </Box>
        <Box height={20} padding={'var(--space-4)'} backgroundColor={'--neutral-300'}>
        </Box>
        <Box height={20} padding={'var(--space-4)'} backgroundColor={'--neutral-300'}>
        </Box>
        <Box height={20} padding={'var(--space-4)'} backgroundColor={'--neutral-300'}>
        </Box>
      </div>
      <Spacing spy={8} />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
          <CalendarDays color={'var(--secondary-500)'} size={18} />
          <Typography variant={'md'} weight={'semibold'} color={'muted'}>
            Próximos eventos
          </Typography>
        </div>
        <Typography variant={'sm'} weight={'semibold'} color={'info'}>
          Ver todos
        </Typography>
      </div>
      <Spacing spy={8} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        <Box height={40} padding={'var(--space-4)'} backgroundColor={'--neutral-300'}>
        </Box>
        <Box height={40} padding={'var(--space-4)'} backgroundColor={'--neutral-300'}>
        </Box>
        <Box height={40} padding={'var(--space-4)'} backgroundColor={'--neutral-300'}>
        </Box>
      </div>
    </>
  );
};
