'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail } from 'lucide-react';
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
import { useLogin } from '@/modules/auth/domain/hooks/useLogin';
import { useLogout } from '@/modules/auth/domain/hooks/useLogout';

const LoginPage = () => {
  const router = useRouter();
  const navigate = router.push;
  const { login, loading, error } = useLogin();
  const { logout } = useLogout();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const isFormValid = useMemo(() => {
    const { email, password } = form;
    return email.includes('@') && password.length > 0;
  }, [form]);

  const handleLogin = () => {
    if (isFormValid) {
      login(form.email, form.password);
    }
  };
  
  useEffect(() => {
    logout();
    // eslint-disable-next-line
  }, []);

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
          height={'724px'}
          padding={'40px'}
          backgroundColor={'--secondary-50'}
          borderColor={'--secondary-200'}
          borderType={'solid'}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
            <Image
              src={spybeeLogo}
              alt={'Spybee Logo'}
              width={120}
              height={60}
              priority
              style={{ marginBottom: '16px' }}
            />
            <Typography variant={'display'} weight={'bold'}>Bienvenido</Typography>
            {error ? (
              <Typography variant={'sm'} color={'error'}>{error}</Typography>
            ) : (
              <Typography variant={'sm'} color={'muted'}>Gestiona tus proyectos con Spybee</Typography>
            )}
          </div>
          <Grid isSubGrid>
            <GridItem span={12}>
              <Input
                labelText={'Correo electrónico'}
                placeholder={'nombre@empresa.com'}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                endIcon={<Mail size={18} color={'var(--neutral-400)'} />}
                isFullWidth
              />
            </GridItem>
            <GridItem span={12}>
              <div style={{ marginTop: '16px' }}>
                <Input
                  labelText={'Contraseña'}
                  type={showPassword ? 'text' : 'password'}
                  placeholder={'••••••••'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  endIcon={showPassword ?
                    <EyeOff size={18} color={'var(--secondary-500)'} /> :
                    <Eye size={18} color={'var(--neutral-400)'} />
                  }
                  onEndIconClick={() => setShowPassword(!showPassword)}
                  isFullWidth
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px', cursor: 'pointer' }}>
                <Typography variant={'xs'} color={'muted'}>
                  ¿Olvidaste tu contraseña?
                </Typography>
              </div>
            </GridItem>
            <GridItem span={12}>
              <Spacing spy={16} />
              <Button
                text={'Iniciar sesión'}
                onClick={() => handleLogin()}
                disabled={loading || !isFormValid}
                isFullWidth
              />
            </GridItem>
            <GridItem span={12}>
              <div className={styles['auth-footer']}>
                <Typography variant={'sm'} color={'muted'}>
                  ¿No tienes cuenta?
                </Typography>
                <Button
                  variant={'btn-text'}
                  text={'Regístrate'}
                  onClick={() => navigate('/register')}
                />
              </div>
            </GridItem>
          </Grid>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default LoginPage;
