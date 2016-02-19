'use strict';
var fs = require('fs');
var BPromise = require('bluebird');
var request = require('request');
request = BPromise.promisifyAll(request);
var commandLineArgs = require('command-line-args');
var base64 = require('base64-js');
var options = commandLineArgs([
  { name: 'image', alias: 'i', type: String, defaultValue: './vivaldi.jpg' },
  { name: 'type', alias: 't', type: String, defaultValue: 'LABEL_DETECTION' },
  { name: 'limit', alias: 'l', type: Number, defaultValue: 1 }
]).parse();

console.log(options);

var image = fs.readFileSync(options.image);
var payload = {
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

var url = 'https://vision.googleapis.com/v1/images:annotate?key=' + process.env.GOOGLE_API_KEY;

request.postAsync({
    headers: {'content-type': 'application/json'},
    url: url,
    json: payload
  })
  .then(result => {
    console.log(JSON.stringify(result.body.responses));
  });
