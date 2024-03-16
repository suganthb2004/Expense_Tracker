import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {


  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target:"http://127.0.0.1:5000/",
          changeOrigin: true,
          secure: false,
        }
      },
    },
  };
});