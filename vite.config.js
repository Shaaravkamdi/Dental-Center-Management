// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import svgr from 'vite-plugin-svgr';


// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss(), svgr()],
// })



import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 2000,
  },
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: './',
});
