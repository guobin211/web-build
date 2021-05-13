const { config } = require('@swc/core/spack')

module.exports = config({
  entry: {
    'index.es': __dirname + '/src/index.js',
  },
  output: {
    path: __dirname + '/build',
  },
})
