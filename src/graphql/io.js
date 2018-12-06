const database = require('../database')
const constants = require('../constants')
const mongoose = require('mongoose')

const prepare = response => {
  response.date_created = response.date_created.toISOString()
  response.date_modified = response.date_modified.toISOString()

  Object.keys(constants.objectIds).forEach(key => {
    if (response[key]) {
      if (Array.isArray(response[key])) {
        response[key] = response[key].map(item => {
          return item.toString()
        })
      } else {
        response[key] = response[key].toString()
      }
    }
  })

  return response
}

const formatArray = (value) => {
  let out
  if (Array.isArray(value)) {
    out = {
      $in: value
    }
  } else {
    out = value
  }

  return out
}

const formatArgs = args => {
  return Object.keys(args).reduce((agg, key) => {
    if (constants.secondaryArgs.indexOf(key) < 0) {
      agg.primary[key] = formatArray(args[key])
    } else {
      agg.secondary[key] = args[key]
    }

    return agg
  }, { primary: {}, secondary: {} })
}

Object.keys(database).forEach(key => {
  let prepared = async args => {
    const formattedArgs = formatArgs(args)
    console.log('this is the endpoint', key)
    console.log('these are the formatted args', formattedArgs)
    return prepare(await database[key](formattedArgs))
  }

  exports[key] = prepared
})
