# dbify

Browserify transform to inline the results of SQL queries

## Example

```js
var dbify = require('dbify');
var data = dbify('select * from "table"');
```

becomes

```js
var data = [{"id":1,"value":"first val"},{"id":2,"value":"second val"},{"id":3,"value":"third val"}];
```

## Installation


```sh
$ npm install dbify

# Then add one of the following depending on which DB you plan to use:
$ npm install pg
$ npm install sqlite3
$ npm install mysql
$ npm install mysql2
$ npm install mariasql
$ npm install strong-oracle
$ npm install oracle
$ npm install mssql
```

and use it with browserify like

```
$ browserify -t dbify input.js -o output.js
```

see https://github.com/substack/browserify-handbook#transforms for more info on browserify transforms.

## Configuration

Under the hood this project relies on [knex](http://knexjs.org/). To see full configuration documentation see http://knexjs.org/. In your `package.json` file add a `dbify` field:

sqlite example:

```json
{
  "..."
  "dbify": {
    "client": "sqlite",
    "connection": {
      "filename": "database.sqlite"
    }
  }
}
```

mysql example:


```json
{
  "..."
  "dbify": {
    "client": "mysql",
    "connection": {
      "host" : "127.0.0.1",
      "user" : "your_database_user",
      "password" : "your_database_password",
      "database" : "myapp_test"
    }
  }
}
```


## License

MIT
