const create = require('../database').create
const read = require('../database').read
const constants = require('../constants')
const mongoose = require('mongoose')

const limitAccess = (method, response) => {
  if (constants.adminMethods.indexOf(method)) {
    throw new Error('insufficient privileges to perform action')
  }

  return response
}

Object.keys(create).forEach(method => {
  exports[method] = async (args, context) => {

    // if it is a response, check if the user has already participated in the survey_instance
    if (method === 'response') {
      let survey_instance = await read.survey_instance({ _id: args.survey_instance })

      if (!survey_instance) {
        throw new Error('the survey_instance does not exist')
      }

      if (survey_instance.user) {
        if (survey_instance.user.indexOf(context.user)) {
          throw new Error('the user has already submitted a response to this survey instance')
        }
      }
    }

    if (method === 'question' && args.input_type === 'Number') {
      if (args.choice) {
        args.choice = args.choice.map(choice => Number(choice))
      }
    }

    if (method === 'answer') {
      let question = await read.question({ primary: { _id: args.question } })

      if (!question) {
        throw new Error('the question does not exist')
      }

      if (question.input_type === 'Number') {
        args.value = Number(args.value)
      }
    }

    if (context.clearance !== 'admin') {
      return limitAccess(method, await create[method](args, context.user))
    }

    return await create[method](args, context.user)

  }
})
