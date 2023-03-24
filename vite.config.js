import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: "localhost:8080", //"https://luftalian.trap.show/writersapp/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/'),
      }
    }
  }
});
