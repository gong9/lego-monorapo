import babel from 'rollup-plugin-babel'
import scss from 'rollup-plugin-scss'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript'
import sourceMaps from 'rollup-plugin-sourcemaps'

import {
  terser
} from 'rollup-plugin-terser'

export default {
  input: './src/index.ts',
  output: {
    file: './lib/index.js',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    json(),
    babel(),
    scss(),
    commonjs(),
    terser(),
    postcss({
      extract: true,
      minimize: false
    }),
    typescript({
      exclude: 'node_modules/**',
      typescript: require('typescript')
    }),
    sourceMaps()
  ]
}
