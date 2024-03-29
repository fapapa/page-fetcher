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
    if (error || (response.statusCode !== 200)) {
      console.log('Fetch failed. Please try again.');
      rl.close();
      return;
    }
    fs.open(fileName, (err, fd) => {
      if (fd) {
        rl.question('File exists. Do you want to overwrite it? ', (ans) => {
          if (ans === 'y') {
            fs.close(fd, () => {});
            fs.writeFile(fileName, body, () => {});
            logResults(response.headers['content-length'], fileName);
          }
          rl.close();
        });
      }  else {
        rl.close();
        fs.writeFile(fileName, body, (wErr) => {
          if (wErr && wErr.code === 'ENOENT') {
            console.log('Invalid path.');
          } else {
            logResults(response.headers['content-length'], fileName);
          }
        });
      }
    });
  });

  return;
};

fetch(process.argv[2], process.argv[3]);
