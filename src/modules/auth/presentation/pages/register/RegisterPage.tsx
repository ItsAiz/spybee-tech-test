'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
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
import { useRegister } from '@/modules/auth/domain/hooks/useRegister';
import { useLogout } from '@/modules/auth/domain/hooks/useLogout';

const RegisterPage = () => {
  const router = useRouter();
  const { register, loading } = useRegister();
  const { logout } = useLogout();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const isFormValid = useMemo(() => {
    const { name, email, password, confirmPassword } = form;
    return (
      name.trim() !== '' &&
      email.trim() !== '' &&
      password.length >= 8 &&
      password === confirmPassword
    );
  }, [form]);

  const onSubmit = () => {
    if (form.password !== form.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    register(form.name, form.email, form.password);
  };

  useEffect(() => {
    logout(true);
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
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                endIcon={<User size={18} color={'var(--neutral-400)'} />}
                isFullWidth
              />
            </GridItem>
            <GridItem span={6}>
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
              <Spacing spy={16} />
              <Input
                labelText={'Contraseña'}
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                endIcon={showPassword
                  ? <EyeOff size={18} color={'var(--secondary-500)'} />
                  : <Eye size={18} color={'var(--neutral-400)'} />
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
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                endIcon={showConfirmPassword
                  ? <EyeOff size={18} color={'var(--secondary-500)'} />
                  : <Eye size={18} color={'var(--neutral-400)'} />
                }
                onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                isFullWidth
              />
            </GridItem>
            <GridItem span={12}>
              <Spacing spy={24} />
              <Button
                text={loading ? 'Procesando...' : 'Crear cuenta'}
                onClick={onSubmit}
                disabled={loading || !isFormValid}
                isFullWidth
              />
            </GridItem>
            <GridItem span={12}>
              <div className={styles['auth-footer']}>
                <Typography variant={'sm'} color={'muted'}>¿Ya tienes una cuenta?</Typography>
                <Button variant={'btn-text'} text={'Inicia sesión'} onClick={() => router.push('/')} />
              </div>
            </GridItem>
          </Grid>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default RegisterPage;
