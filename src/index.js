#!/usr/bin/env node

const _ = require("lodash");

const program = require("commander");
program.version(require("../package.json").version, "-v, --version");

program.option("-d, --debug", "output extra debugging");

program.parse(process.argv);

const globby = require("globby");
const path = require("path");

const excludeList = [
  "!src/main.(ts|js)",
  "!**/karma*.js",
  "!**/polyfills.ts",
  "!src/test.ts",
  "!**/*.module.(ts|js)",
  "!**/environment*.(ts|js)",
  "!**/*.model.ts",
  "!**/*.routes.ts"
];

(async () => {
  const specFiles = await globby([
    // Specify include patterns first
    "src/**/(*.spec).(ts|js)",
    // Specify "do not include" patterns (note `!` sign on the beggining of each statement)
    ...excludeList
  ]);

  const codeFiles = await globby([
    // Specify include patterns first
    "src/**/!(*.spec).(ts|js)",
    // Specify "do not include" patterns (note `!` sign on the beggining of each statement)
    ...excludeList
  ]);

  const codeBaseNames = codeFiles.map(fullPath => {
    const dirname = path.dirname(fullPath);
    const fileWithoutExtension = path.basename(
      fullPath,
      `${path.extname(fullPath)}`
    );

    return {
      fullPath,
      base: `${dirname}/${fileWithoutExtension}`
    };
  });

  const specBaseNames = specFiles.map(fullPath => {
    const dirname = path.dirname(fullPath);
    const fileWithoutExtensionAndSpec = path.basename(
      fullPath,
      `.spec${path.extname(fullPath)}`
    );

    return {
      fullPath,
      base: `${dirname}/${fileWithoutExtensionAndSpec}`
    };
  });

  const untestedFiles = _.differenceWith(
    codeBaseNames,
    specBaseNames,
    (a, b) => a.base === b.base
  );

  if (program.debug) {
    console.log("codeFiles", codeFiles);
    console.log("testFiles", specFiles);
    console.log("codeBaseNames", codeBaseNames);
    console.log("specBaseNames", specBaseNames);

    console.log("untestedFiles", untestedFiles);
  }

  if (untestedFiles.length > 0) {
    console.log(
      `ERROR: ${untestedFiles.length} files doesn't have corresponding *.spec* file:`
    );

    untestedFiles.forEach(file => {
      console.log(`  ${file.fullPath}`);
    });
    process.exit(1);
  }

  process.exit(0);
})();
