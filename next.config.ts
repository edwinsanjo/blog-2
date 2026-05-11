import type { NextConfig } from 'next';
import fs from 'fs';
import path from 'path';

// Watch the vault directory in development mode
if (process.env.NODE_ENV === 'development') {
  const vaultPath = path.join(process.cwd(), 'vault');
  console.log(`[Watcher] Starting to watch: ${vaultPath}`);
  
  try {
    fs.watch(vaultPath, { recursive: true }, (eventType, filename) => {
      console.log(`[Watcher] File ${filename} changed (${eventType})`);
      // Touch a file Next.js watches
      const triggerFile = path.join(process.cwd(), 'app', 'layout.tsx');
      if (fs.existsSync(triggerFile)) {
        const now = new Date();
        fs.utimesSync(triggerFile, now, now); // Update access and modification times
        console.log(`[Watcher] Touched ${triggerFile} to trigger rebuild.`);
      }
    });
  } catch (e) {
    console.error(`[Watcher] Failed to start watcher:`, e);
  }
}

const nextConfig: NextConfig = {
  // Use standalone output for efficient Docker deployments
  output: 'standalone',
};

export default nextConfig;
