const express = require('express')
const alphapolls = require('../lib')

const setContext = req => {
  if (!req.session) {
    throw new Error('a session has not been set')
  }

  if (!req.session.clearance || !req.session.user) {
    throw new Error('session is invalid')
  }

  return {
    clearance: req.session.clearance,
    user: req.session.user
  }
}

// create express app
const app = express()


// mock auth middleware
app.use('/some-optional-custom-endpoint', (req, res, next) => {
  req.session = {
    clearance: 'admin',
    user: 'some admin id'
  }

  next()
})

const server = alphapolls.applyMiddleware(app, setContext, '/some-optional-custom-endpoint')
server.listen(3040)
