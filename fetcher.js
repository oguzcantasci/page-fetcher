const fs = require("fs");
const request = require('request');

// Get the URL and local path from commandline
const args = process.argv.slice(2);
const URL = args[0];
const localPath = args[1];

// Access the URL with 'request'
request(URL, (error, response, body) => {
  if (error) {
    console.log("Error: ", error);
  }

  fs.writeFile(localPath, body, err => { // Write the body of the URL to the local file
    if (err) {
      console.error(err);
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
    // file written successfully
  });
});




