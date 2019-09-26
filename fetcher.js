const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const request = require('request');
const fs = require('fs');

const logResults = (bytes, fileName) => {
  console.log(`Downloaded and saved ${bytes} bytes to ${fileName}`);
};


const fetch = (url, fileName) => {
  request(url, (error, response, body) => {
    fs.open(fileName, (err, fd) => {
      if (fd) {
        rl.question('File exists. Do you want to overwrite it?', (ans) => {
          if (ans === 'y') {
            fs.write(fd, body, () => {});
            fs.close();
          }
          rl.close();
          logResults(response.headers['content-length'], fileName);
        });
      } else if (err.code === 'ENOENT') {
        console.log("Invalid path.");
        rl.close();
      } else {
        fs.writeFile(fileName, body, () => {});
        rl.close();
        logResults(response.headers['content-length'], fileName);
      }
    });
  });

  return;
};

fetch(process.argv[2], process.argv[3]);
