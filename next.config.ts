import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Use standalone output for efficient Docker deployments
  output: 'standalone',
};

export default nextConfig;
