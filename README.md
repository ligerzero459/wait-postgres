# wait-postgres [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
> Small script to halt script execution until a Postgres DB is online

## Installation

```sh
$ npm install --save wait-postgres
```

## Usage

```sh
usage: wait [options]

default env variables:
  DB_HOST                       database host (example: localhost)
  DB_PORT                       database port
  DB_USER                       database username
  DB_PASSWORD                   database password
  DB_NAME                       database name

options:
  -h, --help                    show help and usage
  -v, --version                 show version
  -r, --retries                 number of times to retry (default: 60)
  -d, --delay                   retry delay milliseconds (default: 1000)
  -u, --user                    db username env var (default DB_USER)
  -p, --pass                    db password env var (default DB_PASSWORD)
  -n, --name                    db name env var (default DB_NAME)
  -P, --port                    db port env var (default DB_PORT)
  -H, --host                    db host env var (default DB_HOST)
```
## License

MIT © [Ryan Mottley]()


[npm-image]: https://badge.fury.io/js/wait-postgres.svg
[npm-url]: https://npmjs.org/package/wait-postgres
[travis-image]: https://travis-ci.com/ligerzero459/wait-postgres.svg?branch=master
[travis-url]: https://travis-ci.com/ligerzero459/wait-postgres
