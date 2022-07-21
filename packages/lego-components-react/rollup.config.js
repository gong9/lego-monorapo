import babel from 'rollup-plugin-babel'
import scss from 'rollup-plugin-scss'
import json from '@rollup/plugin-json'

export default {
  input: './index.js',
  output: {
    file: './lib/index.js',
    format: 'esm'
  },
  plugins: [
    babel(),
    scss(),
    json()
  ],
  external: ['react']
}
