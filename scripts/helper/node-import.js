/**
 * type="commonjs" 中代替 import
 * @param pkg {string}
 * todo import commonjs module
 */
async function nodeImport(pkg) {
  if (typeof require === 'function') {
    const path = require('path')
    const libPath = path.resolve(process.cwd(), `node_modules/${pkg}`)
    const json = require(path.resolve(libPath, 'package.json'))
    const { main, module, exports } = json
    if (process.env.NODE_ENV !== 'production') {
      console.log(`main: ${main}, module : ${module}, exports: ${exports}`)
    }
    let file = module
    if (exports) {
      exports.module ? (file = exports.module) : (file = exports)
    }
    const index = path.resolve(libPath, file)
    const libModule = await import(index)
    if (typeof libModule.default === 'function') {
      return libModule.default
    } else {
      return libModule
    }
  } else {
    throw new Error('node global function require not defined')
  }
}

function moduleFactory() {
  nodeImport.nodeImport = nodeImport
  return nodeImport
}

function initCommonjsModule() {
  if (typeof exports === 'object' && typeof module !== undefined) {
    module.exports = moduleFactory()
  } else {
    throw new Error('not commonjs runtime')
  }
}

initCommonjsModule()
