'use strict'

const tapTest = require('tap').test
const wait = require('../index.js')

function test(name, cb) {
  return tapTest(name, { autoend: true }, cb)
}

const CONFIG = {
  user: 'B_USER',
  pass: 'B_PASS',
  name: 'B_NAME',
  port: 'B_PORT',
  host: 'B_HOST'
}

test('_getConfig', t => {
  t.throws(() => {
    delete process.env.B_USER
    wait._getConfig(CONFIG)
  }, /process\.env\.B_USER must be set/)

  t.throws(() => {
    process.env.B_USER = '1'
    delete process.env.B_PASS
    wait._getConfig(CONFIG)
  }, /process\.env\.B_PASS must be set/)

  t.throws(() => {
    process.env.B_USER = '1'
    process.env.B_PASS = '1'
    delete process.env.B_NAME
    wait._getConfig(CONFIG)
  }, /process\.env\.B_NAME must be set/)

  t.throws(() => {
    process.env.B_USER = '1'
    process.env.B_PASS = '1'
    process.env.B_NAME = '1'
    delete process.env.B_PORT
    wait._getConfig(CONFIG)
  }, /process\.env\.B_PORT must be set/)

  t.throws(() => {
    process.env.B_USER = '1'
    process.env.B_PASS = '1'
    process.env.B_NAME = '1'
    process.env.B_PORT = '1344'
    wait._getConfig(CONFIG)
  }, /process\.env\.B_HOST must be set/)

  process.env.B_USER = 'root'
  process.env.B_PASS = 'biscuits'
  process.env.B_NAME = 'help'
  process.env.B_PORT = '1344'
  process.env.B_HOST = 'localhost'
  t.deepEqual(wait._getConfig(CONFIG), {
    user: process.env.B_USER,
    password: process.env.B_PASS,
    database: process.env.B_NAME,
    host: process.env.B_HOST,
    port: Number(process.env.B_PORT)
  })
})

test('runWait', t => {
  t.test('fail', tt => {
    process.env.B_USER = 'root'
    process.env.B_PASS = 'biscuits'
    process.env.B_NAME = 'help'
    process.env.B_PORT = '1344'
    process.env.B_HOST = 'localhost'
    const opts = Object.assign({}, CONFIG, {
      retries: 2,
      delay: 100
    })

    wait.runWait(opts, err => {
      tt.type(err, Error)
      tt.end()
    })
  })

  t.test('pass', tt => {
    const host = process.env.CI === true ? 'postgres' : 'localhost'
    const db = process.env.POSTGRES_DB || 'poc'
    const user = process.env.POSTGRES_USER || 'postgres'
    const password = process.env.POSTGRES_PASSWORD || ''
    const port = process.env.POSTGRES_PORT || 5432
    process.env.B_USER = user
    process.env.B_PASS = password
    process.env.B_NAME = db
    process.env.B_PORT = Number(port)
    process.env.B_HOST = host

    const opts = Object.assign({}, CONFIG, {
      retries: 2,
      delay: 100
    })

    wait.runWait(opts, err => {
      tt.error(err)
      tt.end()
    })
  })
})
