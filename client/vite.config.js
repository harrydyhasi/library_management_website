import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
    },
  },
  // Optional: If you want to treat .js files as .jsx
  // esbuild: {
  //   loader: {
  //     '.js': 'jsx', // Change this to a string
  //     // If you want to treat .ts files as .tsx as well, add:
  //     '.ts': 'tsx',
  //   },
  // },
});
