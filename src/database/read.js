const models = require('../models')

exports.user = async args => {
  return await models.User.find(args.primary).lean()
}

exports.response = async args => {
  return await models.Response.find(args.primary).lean()
}

exports.survey_instance = async args => {
  return await models.SurveyInstance.find(args.primary).lean()
}

exports.survey = async args => {
  return await models.Survey.find(args.primary).lean()
}

exports.media = async args => {
  return await models.Media.find(args.primary).lean()
}

exports.source = async args => {
  return await models.Source.find(args.primary).lean()
}

exports.answer = async args => {
  return await models.Answer.find(args.primary).lean()
}

exports.question = async args => {
  return await models.Question.find(args.primary).lean()
}
