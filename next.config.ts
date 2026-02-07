import type { NextConfig } from 'next';
const env = process.env.NEXT_PUBLIC_REACT_ENV;

const nextConfig: NextConfig = {
  ...(env !== 'development' && {
    devIndicators: false,
  }),
  logging: {
    fetches: {
      fullUrl: false
    }
  }
};

export default nextConfig;