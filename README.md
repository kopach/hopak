# hopak

Checks each code file has it's corresponding *.spec.(js|ts) file 

## 🔨 Usage

```bash
npm install -g hopak
cd <project-directory>
hopak
```

## Current pattern list (Most suitable for Angular projects)

### Code file patterns

```JavaScript
[
    "src/**/!(*.spec).(ts|js)",
    "!**/karma*.(ts|js)",
    "!**/polyfills.(ts|js)",
    "!**/public_api.(ts|js)",
    "!src/test.(ts|js)",
    "!**/*.module.(ts|js)",
    "!**/*.interface.(ts|js)",
    "!**/environment*.(ts|js)",
    "!**/*.model.(ts|js)",
    "!**/*.enum.(ts|js)",
    "!**/*.routes.(ts|js)",
    "!**/index.(ts|js)"
]
```

### Spec file patterns

```JavaScript
[
    "src/**/(*.spec).(ts|js)",
    "!**/karma*.(ts|js)",
    "!**/polyfills..(ts|js)",
    "!**/public_api.(ts|js)",
    "!src/test.(ts|js)",
    "!**/*.module.(ts|js)",
    "!**/*.interface.(ts|js)",
    "!**/environment*.(ts|js)",
    "!**/*.model.(ts|js)",
    "!**/*.enum.(ts|js)",
    "!**/*.routes.(ts|js)",
    "!**/index.(ts|js)"
]
```

## TODO Roadmap

- [x] create working prototype
- [ ] setup better build environment (transpile, minimize, make es5, etc.)
- [ ] setup test environment
- [ ] add tests
- [ ] add/update documentation/readme
- [ ] add options to match files by pattern
