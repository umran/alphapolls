const update = require('../database').update
const constants = require('../constants')
const mongoose = require('mongoose')

Object.keys(update).forEach(method => {
  exports[method] = async args => {
    if (method === 'question' && args.input_type && args.input_type === 'Number') {
      if (args.choice) {
        args.choice = args.choice.map(choice => Number(choice))
      }
    }

    if (method === 'answer' && args.value && args.question) {
      let question = await read.question({ primary: { _id: args.question } })

      if (question && question.input_type) {
        if (question.input_type === 'Number') {
          args.value = Number(args.value)
        }
      }
    }

    const formattedArgs = Object.keys(args).reduce((agg, key) => {
      if (key !== '_id') {
        agg[key] = args[key]
      }

      return agg
    }, {})

    return await update[method](formattedArgs, args._id)

  }
})
