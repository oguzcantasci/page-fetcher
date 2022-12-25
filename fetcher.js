const fs = require("fs");
const request = require('request');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

// Get the URL and local path from commandline
const args = process.argv.slice(2);
const URL = args[0];
const localFile = args[1];
const localPath = path.dirname(localFile);

// Access the URL with 'request'
request(URL, (error, response, body) => {
  if (error) {
    console.log("Error: ", error);
    process.exit();
  }

  // Check if the local path is valid
  fs.access(localPath, fs.constants.F_OK, (error) => {
    if (error) {
      console.error(`${localPath} is an invalid file path:`, error);
      process.exit;
    } else {
      console.log(`${localPath} is a valid file path`);

      // Check if the file already exists
      fs.access(localFile, fs.constants.F_OK, (error) => {
        if (error) {
          // Write to local file
          fs.writeFile(localFile, body, err => {
            if (err) {
              console.log("Write to disk failed!", err);
              process.exit();
            }
          });
        } else {
          // Promt the user if the file already exists
          rl.question("File exists, overwrite (Y/N)? ", (answer) => {

            if (answer.toUpperCase() === "Y") {
    
              // Write to file and close prompt
              fs.writeFile(localFile, body, err => {
                if (err) {
                  console.log("Write to disk failed!", err);
                  process.exit();
                }
              });
              rl.close();
              console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
              process.exit();
            }
    
            process.exit();
          });
        }
      });
    }
  });
});

   
      

      
       