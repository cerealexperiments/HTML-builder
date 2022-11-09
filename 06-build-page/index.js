const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "project-dist");

const stylesInputPath = path.join(__dirname, "styles");
const stylesOutputPath = path.join(__dirname, "project-dist");

const assetsInputPath = path.join(__dirname, "assets");
const assetsOutputPath = path.join(outputPath, "assets");

const htmlComponentsPath = path.join(__dirname, "components");
const htmlInputPath = path.join(__dirname, "template.html");
const htmlOutputPath = path.join(outputPath, "index.html");

// create project-dist directory
fs.mkdir(outputPath, (err) => {
  if (err) {
    if(err.errno === -17 || err.errno === -4075) {
      console.log("folder already exists, skipping this step")
    } else {
      throw err;
    }
  } else {
    console.log("project-dist directory created");
    // create assets directory
    fs.mkdir(assetsOutputPath, (err) => {
      if (err) {
        if(err.errno === -17 || err.errno === -4075) {
          console.log("assets folder already exists, skipping this step")
        } else {
          throw err;
        }
      } else {
        console.log("assets directory created");
      }
    })
  }
})

// bundle css styles
fs.writeFile(path.join(stylesOutputPath, "style.css"), "", (err) => {
  if(err) throw err;
});
fs.readdir(stylesInputPath, (err, files) => {
  files.forEach(file => {
    let filePath = path.join(stylesInputPath, file);
    if(path.extname(filePath) !== ".css") {
      console.log("this is not a css file")
    } else {
      let fileContents = "";
      fs.readFile(filePath, (err, data) => {
        if(err) throw err;
        fileContents = data.toString();
        fs.appendFile(path.join(stylesOutputPath, "style.css"), fileContents, (err) => {
          if(err) throw err;
          console.log(`${file} is appended to style.css`)
        })
      })
    }
  })
})

// copy assets
fs.readdir(assetsInputPath, (err, directories) => {
  directories.forEach(directory => {
    fs.mkdir(path.join(assetsOutputPath, directory), (err) => {
      if (err) {
        if(err.errno === -17 || err.errno === -4075) {
          console.log(`${path.join(assetsOutputPath, directory)} folder already exists, skipping this step`)
        } else {
          throw err;
        }
      } else {
        console.log("assets directory created");
      }
    })
    fs.readdir(path.join(assetsInputPath, directory), (err, files) => {
      files.forEach(file => {
        fs.copyFile(path.join(assetsInputPath, directory, file), path.join(assetsOutputPath, directory, file), (err) => {
          if (err) throw err;
        })
      })
    })
  })
})

//bundle html
fs.copyFile(htmlInputPath, htmlOutputPath, (err) => {
  if(err) throw err;
  fs.readFile(htmlOutputPath, async (err, data) => {
    if(err) throw err;
    let finalHtml = "";
    const lines = data.toString().split("\n");
    for (const line of lines) {
      if(line.match(/{{.*?}}/g)) {
        const templateName = line.trim().substring(2, line.trim().length - 2);
        const templateContents = await getFileContents(path.join(htmlComponentsPath, `${templateName}.html`))
        finalHtml += `${templateContents}\n`;
      } else {
        finalHtml += `${line}\n`;
      }
    }
    fs.writeFile(htmlOutputPath, finalHtml, (err) => {
      if(err) throw err;
      console.log("html bundled")
    })
  })
})


const getFileContents = async (filePath) => {
  return await readFile(filePath);
}


const readFile = (filePath) => {
  return new Promise(resolve => {
    fs.readFile(filePath, (err, data) => {
      resolve(data.toString());
    })
  })
}


