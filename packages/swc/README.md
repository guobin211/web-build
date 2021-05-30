# `@web-build/swc`

> rust swc 编译器

## Config

```json

  {
  "test": ".*.tsx$",
  "module": {
    "type": "umd"
  },
  "jsc": {
    "target": "es2016",
    "transform": {
      "legacyDecorator": true,
      "decoratorMetadata": true,
      "react": {
        "runtime": "classic",
        "pragma": "React.createElement",
        "pragmaFrag": "React.Fragment",
        "useBuiltins": true,
        "throwIfNamespace": true,
        "development": false
      },
      "constModules": {
        "globals": {
          "@ember/env-flags": {
            "DEBUG": "true"
          },
          "@ember/features": {
            "FEATURE_A": "false",
            "FEATURE_B": "true"
          }
        }
      },
      "optimizer": {
        "globals": {
          "vars": {
            "__DEBUG__": "true"
          }
        }
      }
    },
    "parser": {
      "syntax": "typescript",
      "jsx": true,
      "dynamicImport": false,
      "privateMethod": false,
      "functionBind": false,
      "classPrivateProperty": false,
      "exportDefaultFrom": false,
      "exportNamespaceFrom": false,
      "decorators": true,
      "decoratorsBeforeExport": true,
      "importMeta": true
    }
  },
  "minify": false,
  "sourceMaps": true,
  "env": {
    "targets": {
      "chrome": "79",
      "ie": "11"
    },
    "mode": "entry",
    "coreJs": 3,
    "dynamicImport": false
  }
},
```
