const read = require('../database').read
const constants = require('../constants')

const prepare = responses => {
  return responses.map(response => {
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

Object.keys(read).forEach(key => {
  exports[key] = async (args, context) => {
    const formattedArgs = formatArgs(args)

    if (context.clearance !== 'admin') {
      return redact(key, prepare(await read[key](formattedArgs)))
    }

    return prepare(await read[key](formattedArgs))
  }
})
