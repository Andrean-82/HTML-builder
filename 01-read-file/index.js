const fs = require('fs');
const path = require('path');
const pathFile = path.resolve(__dirname, 'text.txt');
const rederFile = new fs.createReadStream(pathFile, {encoding: 'utf-8'});

let dataFile ='';

rederFile.on('data', (chunk) => {
  dataFile = dataFile += chunk;
});
rederFile.on('end', () => {
  console.log(dataFile);
});



