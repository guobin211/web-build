const { config } = require('@swc/core/spack')
const path = require('path')

module.exports = config({
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, '../../src/mod.ts'),
  },
  output: {
    path: path.resolve(__dirname, '../../build/swc'),
  },
  module: {},
  options: {},
})
