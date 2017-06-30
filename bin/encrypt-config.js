#! /usr/bin/env node

let program = require('commander');
let config = require('nconf');
let fs = require('fs');

program
  .usage('[options]')
  .option('-p, --password <required>', 'Password that is used to encrypt data')
  .option('-s, --source <required path>', 'Source file')
  .option('-o, --output <required path>', 'Output file')
  .parse(process.argv);

if (!program.password || !program.source || !program.output) {
  program.help();
}

config.file('dbTarget', {file: program.output, secure: program.password});
config.file('dbSource', program.source, {file: program.source});

let data = fs.readFileSync(program.source);
let props = JSON.parse(data.toString());
Object.assign(config.stores.dbTarget.store, props);

config.save();

console.log('Config saved to ' + program.output);

