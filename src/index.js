#!/usr/bin/env node

const _ = require("lodash");

const program = require("commander");
program.version(require("../package.json").version, "-v, --version");

program.parse(process.argv);

const globby = require("globby");
const path = require("path");

const excludeList = [
    "!src/main.(ts|js)",
    "!src/karma*.js",
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
    ...excludeList,
  ]);

  const codeFiles = await globby([
    // Specify include patterns first
    "src/**/!(*.spec).(ts|js)",
    // Specify "do not include" patterns (note `!` sign on the beggining of each statement)
    ...excludeList,
  ]);

  const codeBaseNames = codeFiles.map(fullPath => {
    const dirname = path.dirname(fullPath);
    const fileWithoutExtension = path.basename(
      fullPath,
      `${path.extname(fullPath)}`
    );

    return `${dirname}/${fileWithoutExtension}`;
  });

  const specBaseNames = specFiles.map(fullPath => {
    const dirname = path.dirname(fullPath);
    const fileWithoutExtensionAndSpec = path.basename(
      fullPath,
      `.spec${path.extname(fullPath)}`
    );

    return `${dirname}/${fileWithoutExtensionAndSpec}`;
  });

  const untestedFiles = _.difference(codeBaseNames, specBaseNames);
    if(untestedFiles.length > 0) {
        console.log('Those files are untested:')

        untestedFiles.forEach(file => {
            console.log(`  ${file}.ts`); // TODO: make this extension dynamic
        });
        process.exit(1);
    }

    // TODO: add debug CLI option to show this
    // console.log("codeFiles", codeFiles);
    // console.log("testFiles", specFiles);
    // console.log("codeBaseNames", codeBaseNames);
    // console.log("specBaseNames", specBaseNames);

    // console.log("untestedFiles", untestedFiles);
    process.exit(0)
})();
