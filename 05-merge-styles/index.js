const fs = require('fs');
const path = require('path');
const pathFile = path.resolve(__dirname, 'styles');
const pathFile1 = path.resolve(__dirname,'project-dist', 'bundle.css');
const writeFile = fs.createWriteStream(pathFile1, {encoding: 'utf-8'});

fs.readdir(pathFile, {encoding:'utf-8', withFileTypes: true}, (err, array) =>{
  if(err) throw err;
  array.forEach(element => {
    if(element.isFile() && path.extname(element.name) === '.css' ){
      fs.readFile(path.join(pathFile, element.name), {encoding:'utf-8', withFileTypes: true}, (err, dataFile) =>{
        if(err) throw err;
        writeFile.write(dataFile);
      });
    }
  });
});


