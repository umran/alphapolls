const models = require('../models')
const defaultLimit = 20

const constructQuery = args => {
  let query = args.primary

  args.secondary = args.secondary || {}

  // deal with secondary args after primary args so that in the event of a conflict, secondary args take precedence
  if (args.secondary.filter) {
    args.secondary.filter.forEach(filter => {
      query[filter.field] = filter.expression.reduce((agg, expression) => {
        let value

        if (expression.type === 'Number') {
          value = Number(expression.value)
        }

        if (expression.type === 'Date') {
          value = new Date(expression.value)
        }

        agg[expression.operator] = value

        return agg
      }, {})
    })
  }

  if (args.secondary.cursor) {
    query['_id'] = { $lt: args.secondary.cursor }
  }

  return query
}

exports.user = async args => {
  return await models.User.find(constructQuery(args)).sort({_id: -1}).limit(args.secondary.limit || defaultLimit).lean()
}

exports.response = async args => {
  return await models.Response.find(constructQuery(args)).sort({_id: -1}).limit(args.secondary.limit || defaultLimit).lean()
}

exports.survey_instance = async args => {
  return await models.SurveyInstance.find(constructQuery(args)).sort({_id: -1}).limit(args.secondary.limit || defaultLimit).lean()
}

exports.survey = async args => {
  return await models.Survey.find(constructQuery(args)).sort({_id: -1}).limit(args.secondary.limit || defaultLimit).lean()
}

exports.media = async args => {
  return await models.Media.find(constructQuery(args)).sort({_id: -1}).limit(args.secondary.limit || defaultLimit).lean()
}

exports.source = async args => {
  return await models.Source.find(constructQuery(args)).sort({_id: -1}).limit(args.secondary.limit || defaultLimit).lean()
}

exports.answer = async args => {
  return await models.Answer.find(constructQuery(args)).sort({_id: -1}).limit(args.secondary.limit || defaultLimit).lean()
}

exports.question = async args => {
  return await models.Question.find(constructQuery(args)).sort({_id: -1}).limit(args.secondary.limit || defaultLimit).lean()
}
