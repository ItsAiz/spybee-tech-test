'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import spybeeLogo from '@/shared/assets/spybee_logo_black.webp';
import styles from './styles.module.css';

export const Header = () => {
  const router = useRouter();
  const navigate = router.push;

  return (
    <div className={styles['header-container']}>
      <Image
        src={spybeeLogo}
        alt={'Spybee Logo'}
        width={80}
        height={40}
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/')}
        priority
      />
      <h4>Auth actions here</h4>
    </div>
  );
};
