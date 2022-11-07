const { stdin, stdout } = process;
const fs = require("fs");
const path = require("path");

stdout.write("Hey! Type something:\n");
stdin.on("data", (data) => {
  const input = data.toString();
  stdout.write(`Your input: ${input}`);
  fs.writeFile(path.join(__dirname, "text.txt"), input, (error) => {
    if (error) throw error;
    console.log("file has been created");
    process.exit();
  });
});