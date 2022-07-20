import babel from 'rollup-plugin-babel'
import alias from '@rollup/plugin-alias'
import scss from 'rollup-plugin-scss'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import json from '@rollup/plugin-json'

import {
  terser
} from 'rollup-plugin-terser'

export default {
  input: './index.js',
  output: {
    file: './lib/index.js',
    format: 'esm'
  },
  external: ['lodash', 'vuedraggable'],
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
    alias({
      resolve: ['.js', '.jsx', '.ts', '.tsx']
    })
  ]
}
