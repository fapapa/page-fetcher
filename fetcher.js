const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const request = require('request');
const fs = require('fs');

const fetch = (url, fileName) => {
  request(url, (error, response, body) => {
    fs.open(fileName, (err, fd) => {
      if (fd) {
        rl.question('File exists. Do you want to overwrite it?', (ans) => {
          if (ans === 'y') {
            fs.write(fd, body, () => {});
          }
          rl.close();
        });
      } else {
        fs.writeFile(fileName, body, () => {});
        rl.close();
      }
    });
    console.log(`Downloaded and saved ${response.headers['content-length']} bytes to ${fileName}`);
  });

  return;
};

fetch(process.argv[2], process.argv[3]);
