import pkg from '../package.json';

const program = require("commander");
program.version(pkg.version, '-v, --version');

program
  .option("-d, --debug", "output extra debugging")
  .option("-s, --small", "small pizza size")
  .option("-c, --cheese <type>", "add the specified type of cheese", "blue")
  .option("-p, --pizza-type <type>", "flavour of pizza");

program.parse(process.argv);

if (program.debug) console.log(program.opts());
console.log("pizza details:");
if (program.small) console.log("- small pizza size");
if (program.pizzaType) console.log(`- ${program.pizzaType}`);
console.log(`cheese: ${program.cheese}`);
