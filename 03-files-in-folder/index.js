const fs = require('fs');
const path = require('path');
const { stdout } = require('process');
const pathFile = path.resolve(__dirname, 'secret-folder');
const pathFile1 = path.resolve(__dirname, 'secret-folder');

fs.readdir(pathFile, {encoding:'utf-8', withFileTypes: true}, (err, pathFile) => {
  if(err) throw err;
  pathFile.forEach(element => {
    fs.stat(path.join(pathFile1, element.name), (err, stats) => {
      if (err) throw err;
      if(element.isFile()){  
        stdout.write(`${path.parse(element.name).name} - ${path.extname(element.name).slice(1)} - ${stats.size/1024}Kb \n`);
      }                
    });
  });
});
