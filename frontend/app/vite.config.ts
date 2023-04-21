import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.FRONT_PORT),
  }
})
}
