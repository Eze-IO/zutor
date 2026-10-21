import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';

export default defineConfig({
  plugins: [
    vue(),
    // Auto-import PrimeVue components used in templates
    Components({
      dts: false,
      resolvers: [PrimeVueResolver()]
    })
  ],
  server: {
    port: 8080
  }
});
