'use strict';
const fs = require('fs'),
  BPromise = require('bluebird'),
  commandLineArgs = require('command-line-args'),
  base64 = require('base64-js'),
  prettyjson = require('prettyjson');

const request = BPromise.promisifyAll(require('request'));

const options = commandLineArgs([
    { name: 'image', alias: 'i', type: String, defaultValue: './callas.jpg' },
    { name: 'type', alias: 't', type: String, defaultValue: 'LOGO_DETECTION' },
    { name: 'limit', alias: 'l', type: Number, defaultValue: 1 },
    { name: 'stdin', alias: 's', defaultOption: false}
  ]).parse();

console.log(options);

var image = getImageStream(options);
const payload = {
  requests: [
    {
      image: {
        content: base64.fromByteArray(image)
      },
      features:[{
        type: options.type,
        maxResults: options.limit
      }]
    }
  ]
};

function getImageStream(options) {
  if (options.stdin === true) {
    return fs.readFileSync('/dev/stdin');
  }
  return fs.readFileSync(options.image);
}

const url = 'https://vision.googleapis.com/v1/images:annotate?key=' + process.env.GOOGLE_API_KEY;

request.postAsync({
    headers: {'content-type': 'application/json'},
    url: url,
    json: payload
  })
  .then(result => {
    console.log(prettyjson.render(result.body.responses));
  });
