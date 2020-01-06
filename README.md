# spec-checker

## Current pattern list (Most suitable for Angular projects)

### Code file patterns

```JavaScript
[
    "src/**/!(*.spec).(ts|js)",
    "!**/karma*.js",
    "!**/polyfills.ts",
    "!src/polyfills.ts",
    "!src/test.ts",
    "!**/*.module.(ts|js)",
    "!**/environment*.(ts|js)",
    "!**/*.model.ts",
    "!**/*.routes.ts"
]
```

### Spec file patterns

```JavaScript
[
    "src/**/(*.spec).(ts|js)",
    "!src/main.(ts|js)",
    "!**/karma*.js",
    "!**/polyfills.ts",
    "!src/test.ts",
    "!**/*.module.(ts|js)",
    "!**/environment*.(ts|js)",
    "!**/*.model.ts",
    "!**/*.routes.ts"
]
```

## TODO Roadmap

- [x] create working prototype
- [ ] setup better build environment (transpile, minimize, make es5, etc.)
- [ ] setup test environment
- [ ] add tests
- [ ] add/update documentation/readme
- [ ] add options to match files by pattern
