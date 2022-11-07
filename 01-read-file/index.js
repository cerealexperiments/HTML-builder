const { stdout } = process;
const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "text.txt"), (error, data) => {
  if(error) throw error;
  stdout.write(data.toString());
});