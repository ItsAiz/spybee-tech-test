'use client';

import Image, { StaticImageData } from 'next/image';
import { Box } from '@/shared/components/Box/Box';

interface LoginIllustrationProps {
  imageSrc: StaticImageData | string;
  alt?: string;
  height?: string | number;
}

export const HomeIllustration = ({
  imageSrc,
  alt = 'Spybee Preview',
  height = '724px'
}: LoginIllustrationProps) => {
  return (
    <Box
      width={'100%'}
      height={height}
      padding={'0px'}
      backgroundColor={'--secondary-50'}
      borderColor={'--secondary-200'}
      borderType={'solid'}
    >
      <div 
        style={{ 
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden'
        }}
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill
          style={{
            objectFit: 'cover',
            opacity: 0.9,
            borderRadius: 'var(--radius-md)',
            boxSizing: 'border-box',
          }}
          priority
        />
      </div>
    </Box>
  );
};
