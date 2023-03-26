import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint';
import { comlink } from "vite-plugin-comlink";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), eslintPlugin()],
  worker: {
    plugins: [comlink()]
  }
})
