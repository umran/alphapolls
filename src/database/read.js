const models = require('../models')

exports.response = async args => {
  return await models.Response.find(args.primary)
}

exports.survey_instance = async args => {
  return await models.SurveyInstance.find(args.primary)
}

exports.survey = async args => {
  return await models.Survey.find(args.primary)
}

exports.media = async args => {
  return await models.Media.find(args.primary)
}

exports.source = async args => {
  return await models.Source.find(args.primary)
}

exports.answer = async args => {
  return await models.Answer.find(args.primary)
}

exports.question = async args => {
  return await models.Question.find(args.primary)
}
