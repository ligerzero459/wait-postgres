'use strict'

const assert = require('assert')
const pg = require('pg')

exports._getConfig = opts => {
  const user = process.env[opts.user]
  const password = process.env[opts.pass]
  const database = process.env[opts.name]
  const port = process.env[opts.port]
  const host = process.env[opts.host]

  assert(user, badEnv(opts.user))
  assert(typeof password === 'string', badEnv(opts.pass))
  assert(database, badEnv(opts.name))
  assert(port, badEnv(opts.port))
  assert(host, badEnv(opts.host))

  return {
    host,
    port,
    database,
    user,
    password
  }
}

function badEnv(str) {
  return `process.env.${str} must be set`
}

function performWait(opts, cb) {
  const db = new pg.Client(opts)
  db.connect(err => {
    if (err) return cb(err)
    db.end()
    cb()
  })
}

exports.runWait = (opts, cb) => {
  const config = exports._getConfig(opts)
  const a = new Array(opts.retries).fill(1)
  const run = () => {
    if (!a.length) return cb(new Error('Unable to get database connection.'))
    console.log('attempt', `#${opts.retries - a.length}`)
    a.shift()
    performWait(config, err => {
      if (!err) return cb()

      setTimeout(run, opts.delay)
    })
  }

  run()
}
