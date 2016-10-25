/* global describe, it */

var expect = require('expect');
var dbify = require('..');
var path = require('path');
var fs = require('fs');
var runTransform = require('browserify-transform-tools').runTransform;

describe('dbify tests', function () {
  it('should inline results of a simple query', function (done) {
    var jsfile = path.resolve(__dirname, 'example-project/example.js');

    var content = fs.readFileSync(jsfile);
    var expectedContent = fs.readFileSync(path.resolve(__dirname, 'example-project/results.js'), 'utf-8');
    runTransform(dbify, jsfile, {content: content}, function (err, result) {
      expect(err).toBe(null);
      expect(result).toEqual(expectedContent);
      done();
    });
  });
});
