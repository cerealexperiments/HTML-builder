const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "files");
const outputPath = path.join(__dirname, "files-copy");
fs.mkdir(outputPath, (err) => {
  if (err) {
    if(err.errno === -17) {
      console.log("folder already exists, skipping this step")
    } else {
      throw err;
    }
  } else {
    console.log("files-copy directory created");
  }
})

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

