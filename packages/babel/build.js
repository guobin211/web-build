import path from 'path'
import fs from 'fs'
import { parse } from '@babel/parser'
import generate from '@babel/generator'
import { transformSync } from '@babel/core'
import ts from '@babel/preset-typescript'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const src = path.resolve(__dirname, '../../src')
const build = path.resolve(__dirname, '../../build/babel')

const astMap = new Map()

const files = fs.readdirSync(src)

files.forEach((fileName) => {
  const file = path.join(src, fileName)
  const codeStr = fs.readFileSync(file).toString()
  const { code } = transformSync(codeStr, { filename: fileName, presets: [ts] })
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx'],
    sourceFilename: fileName,
  })
  astMap.set(fileName, ast)
})

const getAstBody = () => {
  const res = []
  for (const ast of astMap.values()) {
    res.push(ast)
  }
  return res
}

const ast = {
  type: 'Program',
  body: getAstBody(),
}

const { code } = generate.default(ast, {}, astMap)

fs.writeFileSync(path.resolve(build, 'mod.js'), code)
