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
            labelText={'Full Name'}
            placeholder={'Enter your full name'}
            isFullWidth
          />
        </GridItem>
         <GridItem span={6}>
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
        </GridItem>
        <GridItem span={12}>
          <Input
            labelText={'Confirm Password'}
            placeholder={'Confirm your password'}
            isFullWidth
          />
          <Spacing spy={24} />
        </GridItem>
        <GridItem span={12}>
          <Button text={'Register'} onClick={() => navigate('/')} isFullWidth />
        </GridItem>
      </Grid>
    </div>
  );
};

export default RegisterPage;
