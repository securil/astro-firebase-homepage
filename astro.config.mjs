import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  base: isDev ? '/' : '/astro-firebase-homepage/', // ✅ 이 줄 추가
  integrations: [tailwind()],
});
