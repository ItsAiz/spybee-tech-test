import { Grid } from '@/shared/components/Grid/Grid';
import { GridItem } from '@/shared/components/Grid/GridItem';
import { Input } from '@/shared/components/Input/Input';
import { Button } from '@/shared/components/Button/Button';
import styles from './styles.module.css';
import { Spacing } from '@/shared/components/Spacing/Spacing';

const LoginPage = () => {
  return (
    <div className={styles['login-container']}>
      <Grid withSidebar>
        <GridItem span={12}>
          <Input
            labelText={'Usuario'}
            placeholder={'Ingresa el usuario'}
            isFullWidth
          />
         </GridItem>
        <GridItem span={12}>
          <Input
            labelText={'Contraseña'}
            placeholder={'Ingresa la contraseña'}
            isFullWidth
          />
          <Spacing spy={24} />
        </GridItem>
        <GridItem span={12}>
          <Button text={'Iniciar sesión'} isFullWidth />
        </GridItem>
      </Grid>
    </div>
  );
};

export default LoginPage;
