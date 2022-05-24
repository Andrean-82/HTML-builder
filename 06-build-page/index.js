const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const pathFile = path.resolve(__dirname, 'project-dist');
const pathFile1 = path.resolve(pathFile, 'index.html');
const pathComponents = path.resolve(__dirname, 'components');
const pahtTemplate = path.resolve(__dirname, 'template.html');
const pathassetc = path.resolve(__dirname, 'assets');
const pathassetcNew = path.resolve(__dirname,'project-dist', 'assets');
const pathcss = path.resolve(__dirname, 'styles'); // created style.css
const pathcsscopy = path.resolve(__dirname,'project-dist','style.css');   // created style.css
const writeFile = fs.createWriteStream(pathcsscopy, {encoding: 'utf-8'}); // created style.css

fsPromises.mkdir(pathFile, {recursive: true}); // creat folder project-dist

const readHtml = fs.createReadStream(pahtTemplate, {encoding: 'utf-8'});

let filechunk = '';
readHtml.on('data', (chunk) => {
  filechunk = filechunk + chunk;
});
readHtml.on('end', () => {
  fs.readdir(pathComponents, {encoding: 'utf-8', withFileTypes: true}, (err, array) => {
    if(err) throw err;
    let count = 0;
    array.forEach(element => {
      if(element.isFile() && path.extname(element.name) === '.html'){
        const readHtmlnext = fs.createReadStream(path.join(pathComponents, element.name), {encoding: 'utf-8'});
        let elementfile = '';
        readHtmlnext.on('data', (chunk) => {
          elementfile = elementfile + chunk;           
        });
        readHtmlnext.on('end', () => {
          count = count + 1;
          const primass = '{{'+ path.parse(element.name).name +'}}';
          filechunk = filechunk.replace(primass, elementfile);
          if (count === array.length) {
            const fileHtml = fs.createWriteStream(pathFile1, {encoding: 'utf-8'}); // start stream on the write directory project-dist and created index.html
            fileHtml.write(filechunk);
          }          
        });       
      }  
    });
  });
});
fs.readdir(pathcss, {encoding:'utf-8', withFileTypes: true}, (err, array) =>{
  if(err) throw err;
  array.forEach(element => {
    if(element.isFile() && path.extname(element.name) === '.css' ){
      fs.readFile(path.join(pathcss, element.name), {encoding:'utf-8', withFileTypes: true}, (err, dataFile) =>{
        if(err) throw err;
        writeFile.write(dataFile);
      });
    }
  });
});
fs.stat(pathassetcNew, (err) => { // сheck the existence of the folder assets
  if(!err) {  
    fs.rm(pathassetcNew, {recursive: true}, () => {
      mkd();
    });
  }else{
    mkd();
  }  
});
function mkd(){
  fsPromises.mkdir(pathassetcNew, {recursive: true}); //created folder assets in project-dist
}
function create(folderpath, folderpathNew){   
  fs.readdir(folderpath, {encoding:'utf-8', withFileTypes: true}, (err, array) => {
    for (let elem of array){
      if(elem.isDirectory()){
        fsPromises.mkdir(path.join(folderpathNew, elem.name), {recursive: true});
        create(path.join(folderpath, elem.name), path.join(folderpathNew, elem.name));  // recursive function
      }else{
        fs.copyFile(path.join(folderpath, elem.name), path.join(folderpathNew, elem.name), (err) => {
          if(err) throw err;
        });
      }        
    }
  });
}
create(pathassetc, pathassetcNew);