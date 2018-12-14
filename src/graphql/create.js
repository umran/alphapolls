const create = require('../database').create
const read = require('../database').read
const constants = require('../constants')
const mongoose = require('mongoose')

const limitAccess = (clearance, method) => {
  if (clearance !== 'admin') {
    if (constants.adminMethods.indexOf(`create_${method}`) > -1) {
      throw new Error('insufficient privileges to perform action')
    }

    if (clearance === 'public') {
      throw new Error('insufficient privileges to perform action')
    }
  }
}

const prepare = response => {
  return response.toString()
}

Object.keys(create).forEach(method => {
  exports[method] = async (args, context) => {

    if (method === 'response') {
      //check if the user has already participated in the survey_instance
      let survey_instance = await read.survey_instance({ primary: { _id: args.survey_instance } })

      if (!survey_instance || survey_instance.length === 0) {
        throw new Error('the specified survey instance does not exist')
      }

      if (survey_instance[0].user) {
        if (survey_instance[0].user.indexOf(context.user)) {
          throw new Error('the user has already submitted a response to this survey instance')
        }
      }

      // make sure no answer is associated with another response
      let answers = await read.answer({ primary: { _id: $in: { args.answer } } })
      if (!answers || answers.length === 0) {
        throw new Error('none of the answers specified exist')
      }

      let addressedQuestions = []
      for (var i=0; i<answers.length; i++) {
        if (answers[i].response) {
          throw new Error('at least one of the answers specified is already associated with another response')
        }

        addressedQuestions.push(answers[i].question)
      }

      addressedQuestions.sort()

      // make sure answers address the right questions
      let survey = await read.survey({ primary: { _id: survey_instance.survey } })
      if (!survey || survey.length === 0) {
        throw new Error('the specified survey does not exist')
      }

      let surveyQuestions = survey[0].question.map(question => question.toString()).sort()

      if (addressedQuestions.length !== surveyQuestions.length) {
        throw new Error('the addressed questions are not equivalent to the survey questions')
      }

      for (var i=0; i<addressedQuestions.length; i++) {
        if (addressedQuestions[i] !== surveyQuestions[i]) {
          throw new Error('at least one of the addressedQuestions does not match its counterpart survey question')
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

      if (!question || question.length === 0) {
        throw new Error('the question does not exist')
      }

      if (question[0].input_type === 'Number') {
        args.value = Number(args.value)
      }
    }


    limitAccess(context.clearance, method)

    return prepare(await create[method](args, context.user))
  }
})
