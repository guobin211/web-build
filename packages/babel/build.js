import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const babel = path.resolve(__dirname, '../node_modules/.bin/babel')
const src = path.resolve(__dirname, '../src')

const files = fs.readdirSync(src)

files.forEach((fileName) => {
  const file = path.join(src, fileName)
  const out = `build/${fileName.replace('ts', 'js')}`
  execSync(`node ${babel} ${file} --out-file ${out}`)
})
