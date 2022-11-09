const fs = require("fs");
const path = require("path");

const deleteFile = (filePath) => {
  return new Promise(resolve => {
    fs.unlink(filePath, (err) => {
      if(err) throw err;
      resolve();
    })
  })
}

const makeDirectory = (filePath) => {
  return new Promise(resolve => {
    fs.mkdir(filePath,  (err) => {
      if (err) {
        if(err.errno === -17 || err.errno === -4075) {
          console.log("folder already exists, deleting the old contents");
          fs.readdir(filePath,  (err, files) => {
            for (let file of files) {
              deleteFile(path.join(filePath, file)).then(() => console.log(`${file} deleted`));
            }
          })
          resolve();
        } else {
          throw err;
        }
      } else {
        console.log("files-copy directory created");
        resolve();
      }
    })
  })
}

const inputPath = path.join(__dirname, "files");
const outputPath = path.join(__dirname, "files-copy");


makeDirectory(outputPath).then(() => {
  fs.readdir(inputPath, (err, files) => {
    if (err) throw err;
    files.forEach(fileName => {
      let inputFilePath = path.join(inputPath, fileName);
      let outputFilePath = path.join(outputPath, fileName);
      fs.copyFile(inputFilePath, outputFilePath, (err) => {
        if (err) throw err;
        console.log(`${fileName} copied to ${outputFilePath}`)
      })
    })
  })
});


