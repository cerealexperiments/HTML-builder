const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "styles");
const outputPath = path.join(__dirname, "project-dist");

fs.writeFile(path.join(outputPath, "bundle.css"), "", (err) => {
  if(err) throw err;
} )

fs.readdir(inputPath, (err, files) => {
  files.forEach(file => {
    let filePath = path.join(inputPath, file);
    if(path.extname(filePath) !== ".css") {
      console.log("this is not a css file")
    } else {
      let fileContents = "";
      fs.readFile(filePath, (err, data) => {
        if(err) throw err;
        fileContents = data.toString();
        fs.appendFile(path.join(outputPath, "bundle.css"), fileContents, (err) => {
          if(err) throw err;
          console.log(`${file} is appended to bundle.css`)
        })
      })
    }
  })
})
