const models = require('../models')

exports.response = async (args, user) => {
  let document = await models.Response.create(args)

  // populate associations
  await models.Answer.updateMany({ _id: { $in: args.answer } }, { $set: { response: document._id } })
  await models.SurveyInstance.updateOne({ _id: args.survey_instance }, { $addToSet: { response: document._id } })
  await models.SurveyInstance.updateOne({ _id: args.survey_instance }, { $addToSet: { user } })
  await models.User.updateOne({ _id: user }, { $addToSet: { survey_instance: args.survey_instance } })

  return document._id
}

exports.survey_instance = async args => {
  let document = await models.SurveyInstance.create(args)

  // populate associations
  await models.Survey.updateOne({ _id: args.survey }, { $addToSet: { survey_instance: document._id } })

  return document._id
}

exports.survey = async args => {
  let document = await models.Survey.create(args)

  // populate associations
  await models.Question.updateMany({ _id: { $in: args.question } }, { $addToSet: { survey: document._id }  })
  await models.Media.updateMany({ _id: { $in: args.media } }, { $addToSet: { survey: document._id }  })

  return document._id
}

exports.media = async args => {
  let document = await models.Media.create(args)

  // populate associations
  await models.Source.updateOne({ _id: args.source }, { $addToSet: { media: document._id } })

  return document._id
}

exports.source = async args => {
  let document = await models.Source.create(args)

  return document._id
}

exports.answer = async args => {
  let document = await models.Answer.create(args)

  // populate associations
  await models.Question.updateOne({ _id: args.question }, { $addToSet: { answer: document._id } })

  return document._id
}

exports.question = async args => {
  let document = await models.Question.create(args)

  return document._id
}
