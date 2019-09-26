const request = require('request');
const fs = require('fs');

const fetch = (url, fileName) => {
  let htmlData;

  request(url, (error, response, body) => {
    htmlData = body;
    fs.writeFile(fileName, htmlData, () => {});
    console.log(`Downloaded and saved ${response.headers['content-length']} bytes to ${fileName}`);
  });
  return;
};

fetch(process.argv[2], process.argv[3]);
