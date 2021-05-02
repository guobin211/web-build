# `@web-build/swc`

> rust swc 编译器

## Config

```json5
{
  // env优先级比target高
  env: {
    targets: {
      chrome: '90',
    },
    mode: 'usage',
    coreJs: 3,
  },
  jsc: {
    parser: {
      syntax: 'ecmascript',
      jsx: true,
      dynamicImport: true,
      privateMethod: false,
      functionBind: false,
      exportDefaultFrom: false,
      exportNamespaceFrom: false,
      decorators: false,
      decoratorsBeforeExport: false,
      topLevelAwait: false,
      importMeta: false,
    },
    transform: {
      react: {
        pragma: 'React.createElement',
        pragmaFrag: 'React.Fragment',
        throwIfNamespace: true,
        development: false,
        useBuiltins: false,
      },
    },
    target: 'es5',
    loose: false,
    externalHelpers: false,
    keepClassNames: false,
  },
  minify: false,
  sourceMaps: true,
}
```
