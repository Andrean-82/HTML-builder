const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const pathFile = path.resolve(__dirname, 'project-dist');
const pathFile1 = path.resolve(pathFile, 'index.html');
const pathComponents = path.resolve(__dirname, 'components');
const pahtTemplate = path.resolve(__dirname, 'template.html');
//const pathassetc = path.resolve(__dirname, 'assets');
const pathcss = path.resolve(__dirname, 'styles'); // создание style.css
const pathcsscopy = path.resolve(__dirname,'project-dist','style.css');   // создание style.css
const writeFile = fs.createWriteStream(pathcsscopy, {encoding: 'utf-8'}); // создание style.css

fsPromises.mkdir(pathFile, {recursive: true}); // создание парки project-dist


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
            const fileHtml = fs.createWriteStream(pathFile1, {encoding: 'utf-8'}); // запуск стримма на запись дирикторию project-dist и создание index.html
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
 

// fs.readFile(path.join(pathComponents, element.name), {encoding: 'utf-8', withFileTypes: true}, (err, elementfile) => {
//   if(err) throw err;
//   const primass = '{{'+ path.parse(element.name).name +'}}';
//   filechunk = filechunk.replace(primass, elementfile);
//   console.log(filechunk.length);
//   fileHtml.write(filechunk);
// }); 

// fs.stat(pathassetc, (err) => {
//   if (!err) {
//     fs.rm(pathassetc, {recursive: true}, (err) => {
//       create();
//     });
//   } else {
//     create();   
//   }    
// });
// function create(){
//   fs.readdir(pathFile1, {encoding:'utf-8', withFileTypes: true}, (err, array) => {
//     if(err) throw err;
//     fsPromises.mkdir(pathassetc, {recursive: true});
//     array.forEach(element => {
//       if(element.isFile()){
//         fs.copyFile(path.join(pathFile1, element.name), path.join(pathassetc, element.name), (err) => {
//           if(err) throw err;
//         });
//       }
//     });
//   });
// }