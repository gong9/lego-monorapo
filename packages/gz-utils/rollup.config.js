import babel from 'rollup-plugin-babel'
import scss from 'rollup-plugin-scss'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import json from '@rollup/plugin-json'

import {
  terser
} from 'rollup-plugin-terser'

export default {
  input: './src/index.js',
  output: {
    file: './lib/index.js',
    format: 'esm'
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
    })
  ]
}
