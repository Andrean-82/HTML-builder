const fs = require('fs');
const readline = require('readline');
const path = require('path');

const pathFile = path.resolve(__dirname, 'text.txt');

const textFile = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let writeFile = fs.createWriteStream(pathFile, {encoding: 'utf-8'});

console.log('Hello bro! Input text:');

textFile.on('line', (input) => {
  if (input === 'exit'){ 
    writeFile.end();
  }
  else{writeFile.write(input + '\n');}
});
textFile.on('SIGINT', () => {
  console.log('Finish streem');
  process.exit();
});
writeFile.on('finish', () => {
  console.log('Finish streem');
  process.exit();
});
writeFile.on('error', (err) => {
  console.log(err);
});