import Image from 'next/image';
import styles from './styles.module.css';
import spybeeLogo from '@/shared/assets/spybee_logo_black.webp';

export const Header = () => {
  return (
    <div className={styles['header-container']}>
      <Image
        src={spybeeLogo}
        alt={'Spybee Logo'}
        width={80}
        height={40}
        priority
      />
      <h4>Auth actions here</h4>
    </div>
  );
};
