import {
  defineConfig
} from 'vite'
import {
  createVuePlugin
} from 'vite-plugin-vue2'

export default defineConfig({
  optimizeDeps: {
    include: ['js-editor-vue']
  },
  plugins: [
    createVuePlugin({
      jsx: true,
      jsxOptions: {
        injectH: true
      }
    })
  ]
})
