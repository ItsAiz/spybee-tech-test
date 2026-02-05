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
            labelText={'Email'}
            placeholder={'Enter your email'}
            isFullWidth
          />
         </GridItem>
        <GridItem span={12}>
          <Input
            labelText={'Password'}
            placeholder={'Enter your password'}
            isFullWidth
          />
          <Spacing spy={24} />
        </GridItem>
        <GridItem span={12}>
          <Button text={'Login'} onClick={() => navigate('/projects')} isFullWidth />
        </GridItem>
        <GridItem span={12}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button
              variant={'btn-text'}
              text={'Create your account'}
              onClick={() => navigate('/register')}
            />
          </div>
        </GridItem>
      </Grid>
    </div>
  );
};

export default LoginPage;
