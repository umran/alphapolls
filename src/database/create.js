const models = require('../models')

exports.response = async args => {
  let document = await models.Response.create(args)

  if (args.answer) {
    await models.Answer.updateMany({ _id: { $in: args.answer } }, { $set: { response: document._id } })
  }

  if (args.survey_instance) {
    await models.SurveyInstance.update({ _id: args.survey_instance }, { $addToSet: { response: document._id } })
  }

  return document._id
}

exports.survey_instance = async args => {
  let document = await models.SurveyInstance.create(args)

  if (args.survey) {
    await models.Survey.update({ _id: args.survey }, { $addToSet: { survey_instance: document._id } })
  }

  return document._id
}

exports.survey = async args => {
  let document = await models.Survey.create(args)

  // populate associations
  if (args.question) {
    await models.Question.updateMany({ _id: { $in: args.question } }, { $addToSet: { survey: document._id }  })
  }

  if (args.media) {
    await models.Media.updateMany({ _id: { $in: args.media } }, { $addToSet: { survey: document._id }  })
  }

  return document._id
}

exports.media = async args => {
  let document = await models.Media.create(args)

  // populate associations
  if (args.source) {
    await models.Source.update({ _id: args.source }, { $addToSet: { media: document._id } })
  }

  return document._id
}

exports.source = async args => {
  let document = await models.Source.create(args)

  return document._id
}

exports.answer = async args => {
  let document = await models.Answer.create(args)

  // populate associations
  if (args.question) {
    await models.Question.update({ _id: args.question }, { $addToSet: { answer: document._id } })
  }

  return document._id
}

exports.question = async args => {
  let document = await models.Question.create(args)

  return document._id
}
