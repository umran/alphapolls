const express = require('express')
const alphapolls = require('../lib')

const mongoose = require('mongoose')
const mongoUrl = 'mongodb://api:apipassword0@ds131814.mlab.com:31814/heroku_qmvkrfcg'

const initDb = function() {
  mongoose.set('useCreateIndex', true)
  mongoose.set('useFindAndModify', false)
  mongoose.set('useNewUrlParser', true)

  mongoose.connection.on('connecting', function() {
    console.log('mongodb connecting')
  })
  mongoose.connection.on('connected', function(){
    console.log('mongodb connected')
  })
  mongoose.connection.on('disconnected', function(){
    console.log('mongodb disconnected')
  })
  mongoose.connection.on('reconnected', function () {
    console.log('mongodb reconnected')
  })
  mongoose.connection.on('error', function(err){
    console.log('mongodb error')

    setTimeout(() => {
      process.exit(1)
    }, 5000)
  })

  mongoose.connect(mongoUrl)
}

const setContext = req => {
  return {
    clearance: 'admin',
    user: '5c101d2275866c42526fb639'
  }
}

// create express app
const app = express()

const server = alphapolls.applyMiddleware(app, setContext)

initDb()
server.listen(3040)
