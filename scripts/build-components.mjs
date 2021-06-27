import swc from '@swc/core';
import path from 'path';
import { ROOT } from './config.mjs';
import * as fs from 'fs';

const input = path.join(ROOT, 'components/Input.tsx');

function buildComponents() {
  const source = fs.readFileSync(input).toString();
  swc.transform(source, {
    filename: 'input.js',
    sourceMaps: true,
    isModule: true,
    module: {
      type: 'umd'
    },
    jsc: {
      target: 'es2018',
      parser: {
        syntax: 'typescript'
      },
      transform: {
        react: {
          'pragma': 'React.createElement',
          'pragmaFrag': 'React.Fragment',
          'throwIfNamespace': true,
          'development': false,
          'useBuiltins': false
        }
      }
    }
  }).then(output => {
    console.log(output.code)
  })
}

buildComponents();
