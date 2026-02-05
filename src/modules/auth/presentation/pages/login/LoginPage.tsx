'use client';

import { useRouter } from 'next/navigation';
import { Grid } from '@/shared/components/Grid/Grid';
import { GridItem } from '@/shared/components/Grid/GridItem';
import { Input } from '@/shared/components/Input/Input';
import { Button } from '@/shared/components/Button/Button';
import { Spacing } from '@/shared/components/Spacing/Spacing';

const LoginPage = () => {
  const router = useRouter();
  const navigate = router.push;

  return (
    <div className={'container-children-centered'}>
      <Grid withSidebar>
        <GridItem span={12}>
          <Input
            labelText={'Correo electrónico'}
            placeholder={'Ingresa tu correo'}
            isFullWidth
          />
         </GridItem>
        <GridItem span={12}>
          <Input
            labelText={'Contraseña'}
            placeholder={'Ingresa tu contraseña'}
            isFullWidth
          />
          <Spacing spy={24} />
        </GridItem>
        <GridItem span={12}>
          <Button text={'Iniciar sesión'} onClick={() => navigate('/projects')} isFullWidth />
        </GridItem>
        <GridItem span={12}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button
              variant={'btn-text'}
              text={'Crea tu propia cuenta'}
              onClick={() => navigate('/register')}
            />
          </div>
        </GridItem>
      </Grid>
    </div>
  );
};

export default LoginPage;
