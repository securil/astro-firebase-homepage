import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  base: isDev ? '/' : '/astro-firebase-homepage/', // ✅ 이 줄 추가
  integrations: [tailwind(), react()],
  alias: {
    '@/lib': './src/lib',
    '@/components': './src/components',
    '@/pages': './src/pages',
    '@/styles': './src/styles',
    '@/utils': './src/utils',
  }
});