const read = require('../database').read
const constants = require('../constants')

const prepare = responses => {
  return responses.map(response => {
    response.date_created = response.date_created.toISOString()
    response.date_modified = response.date_modified.toISOString()
    response._id = response._id.toString()

    if (response.start_date) {
      response.start_date = response.start_date.toISOString()
    }

    if (response.end_date) {
      response.end_date = response.end_date.toISOString()
    }

    if (response.value) {
      response.value = response.value.toString()
    }

    return response
  })
}

const redact = (method, responses) => {
  if (method === 'survey_instance') {
    responses = responses.map(response => {
      if (response.user) {
        response.user = null
      }

      return response
    })
  }

  return responses
}

const formatArray = (value) => {
  let out
  if (Array.isArray(value)) {
    out = {
      $all: value
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

Object.keys(read).forEach(key => {
  exports[key] = async (args, context) => {
    const formattedArgs = formatArgs(args)

    if (context.clearance !== 'admin') {
      return redact(key, prepare(await read[key](formattedArgs)))
    }

    return prepare(await read[key](formattedArgs))
  }
})
