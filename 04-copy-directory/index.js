const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "files");
const outputPath = path.join(__dirname, "files-copy");


fs.promises.mkdir(outputPath, {recursive: true}).then(async () => {
  const files = await fs.promises.readdir(outputPath);
  if(files) {
    for (const file of files) {
      let fileName = path.join(outputPath, file)
      await fs.promises.unlink(fileName);
    }
  }
  fs.promises.readdir(inputPath).then((files) => {
    files.forEach(fileName => {
      let inputFilePath = path.join(inputPath, fileName);
      let outputFilePath = path.join(outputPath, fileName);
      fs.promises.copyFile(inputFilePath, outputFilePath).then(() => {
          console.log(`${fileName} copied`);
        }
      )
    })
  })
})


