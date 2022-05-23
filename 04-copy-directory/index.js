const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const pathFile = path.resolve(__dirname, 'files-copy');
const pathFile1 = path.resolve(__dirname, 'files');

fs.stat(pathFile, (err) => {
  if (!err) {
    fs.rm(pathFile, {recursive: true}, (err) => {
      create();
    });
  } else {
    create();   
  }    
});
function create(){
  fs.readdir(pathFile1, {encoding:'utf-8', withFileTypes: true}, (err, array) => {
    if(err) throw err;
    fsPromises.mkdir(pathFile, {recursive: true});
    array.forEach(element => {
      if(element.isFile()){
        fs.copyFile(path.join(pathFile1, element.name), path.join(pathFile, element.name), (err) => {
          if(err) throw err;
        });
      }
    });
  });
}