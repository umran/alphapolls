const express = require('express')
const alphapolls = require('../lib')

// explicitly create express app
const app = express()
const serverA = alphapolls.applyMiddleware(app, '/some-optional-custom-endpoint')
serverA.listen(3040)

// implicitly create express app
const serverB = alphapolls.createServer()
serverB.listen(3050)
