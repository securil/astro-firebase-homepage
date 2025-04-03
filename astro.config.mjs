import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  base: '/astro-firebase-homepage/',
  integrations: [
    tailwind({
      // 부트스트랩 같은 다른 CSS 프레임워크와 충돌을 방지하기 위해
      // Tailwind CSS 클래스를 직접 사용하도록 설정
      applyBaseStyles: false,
    }),
  ],
});