var path = require('path');
var makeFunctionTransform = require('browserify-transform-tools').makeFunctionTransform;
var Knex = require('knex');

var options = {evaluateArguments: true, functionNames: ['dbify', 'require'], fromSourceFileDir: true};
var transform = makeFunctionTransform('dbify', options, function (functionParams, opts, cb) {
  if (opts.config && opts.config.connection && opts.config.connection.filename) {
    if (opts.config.connection.filename[0] !== '/') {
      opts.config.connection.filename = path.resolve(opts.configData.configDir, opts.config.connection.filename);
    }
  }

  var knex = Knex(Object.assign({}, {useNullAsDefault: true}, opts.config));
  if (functionParams.name === 'require' && functionParams.args[0].value === 'dbify') {
    return cb(null, 'null');
  } else if (functionParams.name === 'dbify') {
    var query = functionParams.args[0].value;
    knex.raw(query).then(function (response) {
      cb(null, JSON.stringify(response));
    });
  }
});

module.exports = transform;
