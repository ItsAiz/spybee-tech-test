'use client';

import { useRouter } from 'next/navigation';
import { Grid } from '@/shared/components/Grid/Grid';
import { GridItem } from '@/shared/components/Grid/GridItem';
import { Input } from '@/shared/components/Input/Input';
import { Button } from '@/shared/components/Button/Button';
import { Spacing } from '@/shared/components/Spacing/Spacing';

const RegisterPage = () => {
  const router = useRouter();
  const navigate = router.push;

  return (
    <div className={'container-children-centered'}>
      <Grid withSidebar>
        <GridItem span={6}>
          <Input
            labelText={'Nombre completo'}
            placeholder={'Ingresa tu nombre completo'}
            isFullWidth
          />
        </GridItem>
         <GridItem span={6}>
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
        </GridItem>
        <GridItem span={12}>
          <Input
            labelText={'Confirmar contraseña'}
            placeholder={'Confirma tu contraseña'}
            isFullWidth
          />
          <Spacing spy={24} />
        </GridItem>
        <GridItem span={12}>
          <Button text={'Registrarse'} onClick={() => navigate('/')} isFullWidth />
        </GridItem>
      </Grid>
    </div>
  );
};

export default RegisterPage;
