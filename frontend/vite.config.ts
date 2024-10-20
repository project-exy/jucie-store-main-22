import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    proxy: {
      '/api/products': {
        target: "http://127.0.0.1:8090/"
      },
      '/api/prices': {
        target: "http://127.0.0.1:8090/"
      },
      '/api/orders': {
        target: "http://127.0.0.1:8090/"
      },
      '/images/': {
        target: "http://127.0.0.1:8090/"
      }
    }
  }
})