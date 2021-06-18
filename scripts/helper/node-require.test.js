// !important use full filepath `./node-require.js` and package.type=`module`
import { nodeRequire } from './node-require.js'

const arg = nodeRequire('arg')

console.log(arg)
