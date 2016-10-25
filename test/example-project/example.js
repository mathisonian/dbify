var dbify = require('dbify');

var data = dbify('select * from "table"');

console.log(data);
