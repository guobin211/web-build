const { config } = require('@swc/core/spack')

module.exports = config(  {
  entry: {
    'index.esm': __dirname + '/src/index.js',
  },
  output: {
    path: __dirname + '/build',
  }
})
