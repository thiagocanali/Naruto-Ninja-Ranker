export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  base: "/Naruto-Ninja-Ranker/",
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
