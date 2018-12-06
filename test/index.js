const express = require('express')
const alphapolls = require('../lib')

var app = express()
app = alphapolls.applyMiddleware(app, '/api')

app.listen(3030)
