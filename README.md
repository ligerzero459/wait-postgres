# wait-postgres [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Small script to halt script execution until a Postgres DB is online

## Installation

```sh
$ npm install --save wait-postgres
```

## Usage

```js
const waitPostgres = require('wait-postgres');

waitPostgres('Rainbow');
```
## License

MIT © [Ryan Mottley]()


[npm-image]: https://badge.fury.io/js/wait-postgres.svg
[npm-url]: https://npmjs.org/package/wait-postgres
[travis-image]: https://travis-ci.com/ligerzero459/wait-postgres.svg?branch=master
[travis-url]: https://travis-ci.com/ligerzero459/wait-postgres
[daviddm-image]: https://david-dm.org/ligerzero459/wait-postgres.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ligerzero459/wait-postgres
