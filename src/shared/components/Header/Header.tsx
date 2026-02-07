'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HexagonInitials } from '../HexagonInitials/HexagonInitials';
import { Typography } from '@/shared/components/Typography/Typography';
import spybeeLogo from '@/shared/assets/spybee_logo_black.webp';
import styles from './styles.module.css';
import { ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/shared/data/store/useAuthStore';

export const Header = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className={styles['header-container']}>
      <div className={styles['logo-container']}>
        <Image
          src={spybeeLogo}
          alt={'Spybee Logo'}
          width={80}
          height={40}
          className={styles['logo-image']}
          onClick={() => router.push('/')}
          priority
        />
      </div>
      {isAuthenticated && (
        <div className={styles['user-profile']}>
          <HexagonInitials users={[{ name: user?.name || '', lastName: '' }]} />
          <div className={styles['user-info']}>
            <Typography weight={'bold'} color={'white'}>{user?.name}</Typography>
            <Typography variant={'xs'} color={'muted'}>{user?.rol}</Typography>
          </div>
          <ChevronDown size={16} color={'var(--neutral-50)'} />
        </div>
      )}
    </div>
  );
};
