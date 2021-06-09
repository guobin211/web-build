import path from 'path'
import { fileURLToPath } from 'url'
import esbuild from 'esbuild'

const current = path.dirname(fileURLToPath(import.meta.url))

const config = {
  source: path.resolve(current, '../../src/mod.ts'),
  out: path.resolve(current, '../../build/esbuild'),
}

esbuild.buildSync({
  entryPoints: [config.source],
  outdir: config.out,
  bundle: true,
  format: 'esm',
})
