import vue from 'rollup-plugin-vue2'
import babel from 'rollup-plugin-babel'
import alias from '@rollup/plugin-alias'
import scss from 'rollup-plugin-scss'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: './index.js',
  output: {
    file: './lib/index.js',
    format: 'esm'
  },
  external: ['lodash'],
  plugins: [
    vue(),
    babel(),
    scss(),
    commonjs(),
    alias({
      resolve: ['.js', '.jsx', '.ts', '.tsx']
    })
  ]
}
