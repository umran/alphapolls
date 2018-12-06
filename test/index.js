const express = require('express')
const alphapolls = require('../lib')

// explicitly create express app
const app = express()
const serverA = alphapolls.applyMiddleware(app, '/some-optional-custom-path')

// implicitly create express app
const serverB = alphapolls.createServer()

serverA.listen(3040)
serverB.listen(3050)
