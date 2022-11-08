const { stdin, stdout } = process;
const fs = require("fs");
const path = require("path");

fs.writeFile(path.join(__dirname, "text.txt"), "", (err) => {
  if (err) throw err;
})

stdout.write("Hey! Type something:\n");
stdin.on("data", (data) => {
  const input = data.toString().trimEnd();
  if(input === "exit") {
    process.exit();
  } else {
    fs.writeFile(path.join(__dirname, "text.txt"), input, (error) => {
      if (error) throw error;
      process.exit();
    });
  }
});
process.on("SIGINT", () => {
  process.exit();
})
process.on("exit", ()  => {
  console.log("Goodbye!");
})