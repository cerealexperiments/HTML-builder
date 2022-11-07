const fs = require("fs");
const path = require("path");
const { stdout } = process;

fs.readdir(path.join(__dirname, "secret-folder"), (error, files) => {
  if(error) throw error;
  files.forEach(file => {
    let filePath = path.join(__dirname, "secret-folder", file);
    fs.stat(filePath, (err, stats) => {
      if(stats.isFile()) {
        stdout.write(`${file} - ${path.extname(filePath)} - ${(stats.size / 1024).toFixed(3)}kb\n`)
      }
    })
  })
})

