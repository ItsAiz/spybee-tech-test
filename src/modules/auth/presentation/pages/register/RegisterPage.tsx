'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, User } from 'lucide-react';
import { Spacing } from '@/shared/components/Spacing/Spacing';
import { Grid } from '@/shared/components/Grid/Grid';
import { GridItem } from '@/shared/components/Grid/GridItem';
import { Input } from '@/shared/components/Input/Input';
import { Button } from '@/shared/components/Button/Button';
import { Typography } from '@/shared/components/Typography/Typography';
import { Box } from '@/shared/components/Box/Box';
import { HomeIllustration } from '@/shared/components/HomeIlustration/HomeIlustration';
import spybeeLogo from '@/shared/assets/spybee_logo_black.webp';
import spybeeSite from '@/shared/assets/spybee-site.png';
import styles from '../styles.module.css';

const RegisterPage = () => {
  const router = useRouter();
  const navigate = router.push;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Grid withSidebar>
      <div className={styles['desktop-only-wrapper']}>
        <GridItem portrait={0} landscape={0} desktop={7}>
          <HomeIllustration imageSrc={spybeeSite} />
        </GridItem>
      </div>
      <GridItem portrait={12} landscape={12} desktop={5}>
        <Box
          width={'100%'}
          padding={'40px'}
          height={'724px'}
          backgroundColor={'--secondary-50'}
          borderColor={'--secondary-200'}
          borderType={'solid'}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
            <Image
              src={spybeeLogo}
              alt={'Spybee Logo'}
              width={100}
              height={50}
              priority
              style={{ marginBottom: '16px' }}
            />
            <Typography variant={'display'} weight={'bold'}>Crea tu cuenta</Typography>
            <Typography variant={'sm'} color={'muted'}>Únete a la colmena de Spybee hoy mismo</Typography>
          </div>
          <Grid isSubGrid>
            <GridItem span={6}>
              <Input
                labelText={'Nombre completo'}
                placeholder={'Ej. Juan Pérez'}
                endIcon={<User size={18} color={'var(--neutral-400)'} />}
                isFullWidth
              />
            </GridItem>
            <GridItem span={6}>
              <Input
                labelText={'Correo electrónico'}
                placeholder={'nombre@empresa.com'}
                endIcon={<Mail size={18} color={'var(--neutral-400)'} />}
                isFullWidth
              />
            </GridItem>
            <GridItem span={12}>
              <Spacing spy={16} />
              <Input
                labelText={'Contraseña'}
                type={showPassword ? 'text' : 'password'}
                placeholder={'Mínimo 8 caracteres'}
                endIcon={showPassword ?
                  <EyeOff size={18} color={'var(--secondary-500)'} /> :
                  <Eye size={18} color={'var(--neutral-400)'} />
                }
                onEndIconClick={() => setShowPassword(!showPassword)}
                isFullWidth
              />
            </GridItem>
            <GridItem span={12}>
              <Spacing spy={16} />
              <Input
                labelText={'Confirmar contraseña'}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={'Repite tu contraseña'}
                endIcon={showConfirmPassword ?
                  <EyeOff size={18} color={'var(--secondary-500)'} /> :
                  <Eye size={18} color={'var(--neutral-400)'} />
                }
                onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                isFullWidth
              />
            </GridItem>
            <GridItem span={12}>
              <Spacing spy={24} />
              <Button
                text={'Crear cuenta'}
                onClick={() => navigate('/projects')}
                isFullWidth
              />
            </GridItem>
            <GridItem span={12}>
              <div className={styles['auth-footer']}>
                <Typography variant={'sm'} color={'muted'}>
                  ¿Ya tienes una cuenta?
                </Typography>
                <Button
                  variant={'btn-text'}
                  text={'Inicia sesión'}
                  onClick={() => navigate('/')}
                />
              </div>
            </GridItem>
          </Grid>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default RegisterPage;
