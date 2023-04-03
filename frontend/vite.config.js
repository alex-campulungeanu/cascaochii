import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react(), tsconfigPaths()],
    server: {
      port: 3000,
      // watch: {
      //   usePolling: true
      // }
    },
    preview:{
      port: 3000
    }
  };
});