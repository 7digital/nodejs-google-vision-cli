'use strict';
const fs = require('fs'),
  BPromise = require('bluebird'),
  commandLineArgs = require('command-line-args'),
  base64 = require('base64-js'),
  prettyjson = require('prettyjson');

const request = BPromise.promisifyAll(require('request'));

const options = commandLineArgs([
    { name: 'image', alias: 'i', type: String, defaultValue: './vivaldi.jpg' },
    { name: 'type', alias: 't', type: String, defaultValue: 'LABEL_DETECTION' },
    { name: 'limit', alias: 'l', type: Number, defaultValue: 1 }
  ]).parse();

console.log(options);

const image = fs.readFileSync(options.image);
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

const url = 'https://vision.googleapis.com/v1/images:annotate?key=' + process.env.GOOGLE_API_KEY;

request.postAsync({
    headers: {'content-type': 'application/json'},
    url: url,
    json: payload
  })
  .then(result => {
    console.log(prettyjson.render(result.body.responses));
  });
