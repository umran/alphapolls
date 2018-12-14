const models = require('../models')
const exists = require('../utilities').exists

const updateSettings = {upsert: false, overwrite: false, new: false}

const listDiff = (current, old) => {
  const toAdd = current.reduce((agg, id) => {
    if (!exists(old, old_id => {
      return (old_id.toString() === id)
    })) {
      agg.push(id)
    }

    return agg
  }, [])

  const toDelete = old.reduce((agg, id) => {
    if (!exists(current, current_id => {
      return (current_id === id.toString())
    })) {
      agg.push(id)
    }

    return agg
  }, [])

  return {
    toAdd,
    toDelete
  }
}

exports.response = async (args, _id) => {
  let document = await models.Response.findOneAndUpdate({ _id }, args, updateSettings)

  if (!document) {
    throw new Error('the resource does not exist')
  }

  if (args.answer && document.answer) {
    const answerDiff = listDiff(args.answer, document.answer)

    if (answerDiff.toDelete.length > 0) {
      await models.Answer.updateMany({ _id: { $in: answerDiff.toDelete } }, { $unset: { response: '' } })
    }

    if (answerDiff.toAdd.length > 0) {
      await models.Answer.updateMany({ _id: { $in: answerDiff.toAdd } }, { $set: { response: _id } })
    }
  } else if (args.answer) {
    await models.Answer.updateMany({ _id: { $in: args.answer } }, { $set: { response: _id } })
  }

  if (args.survey_instance && document.survey_instance && args.survey_instance !== document.survey_instance.toString()) {
    await models.SurveyInstance.updateOne({ _id: document.survey_instance }, { $pull: { response: _id }  })
    await models.SurveyInstance.updateOne({ _id: args.survey_instance }, { $addToSet: { response: _id } })
  } else if (args.survey_instance) {
    await models.SurveyInstance.updateOne({ _id: args.survey_instance }, { $addToSet: { response: _id } })
  }

  return document._id
}

exports.survey_instance = async (args, _id) => {
  let document = await models.SurveyInstance.findOneAndUpdate({ _id }, args, updateSettings)

  if (!document) {
    throw new Error('the resource does not exist')
  }

  if (args.survey && document.survey && args.survey !== document.survey.toString()) {
    await models.Survey.updateOne({ _id: document.survey }, { $pull: { survey_instance: _id }  })
    await models.Survey.updateOne({ _id: args.survey }, { $addToSet: { survey_instance: _id } })
  } else if (args.survey) {
    await models.Survey.updateOne({ _id: args.survey }, { $addToSet: { survey_instance: _id } })
  }

  return document._id
}

exports.survey = async (args, _id) => {
  let document = await models.Survey.findOneAndUpdate({ _id }, args, updateSettings)

  if (!document) {
    throw new Error('the resource does not exist')
  }

  // populate associations
  // handle case where the list of questions has changed
  if (args.question && document.question) {
    const questionDiff = listDiff(args.question, document.question)

    if (questionDiff.toDelete.length > 0) {
      await models.Question.updateMany({ _id: { $in: questionDiff.toDelete } }, { $pull: { survey: _id }  })
    }

    if (questionDiff.toAdd.length > 0) {
      await models.Question.updateMany({ _id: { $in: questionDiff.toAdd } }, { $addToSet: { survey: _id }  })
    }
  } else if (args.question) {
    await models.Question.updateMany({ _id: { $in: args.question } }, { $addToSet: { survey: _id }  })
  }

  // handle the case where the list of media has changed
  if (args.media && document.media) {
    const mediaDiff = listDiff(args.media, document.media)

    if (mediaDiff.toDelete.length > 0) {
      await models.Media.updateMany({ _id: { $in: mediaDiff.toDelete } }, { $pull: { survey: _id }  })
    }

    if (mediaDiff.toAdd.length > 0) {
      await models.Media.updateMany({ _id: { $in: mediaDiff.toAdd } }, { $addToSet: { survey: _id }  })
    }
  } else if (args.media) {
    await models.Media.updateMany({ _id: { $in: args.media } }, { $addToSet: { survey: _id }  })
  }

  return document._id
}

exports.media = async (args, _id) => {
  let document = await models.Media.findOneAndUpdate({ _id }, args, updateSettings)

  if (!document) {
    throw new Error('the resource does not exist')
  }

  // populate associations
  // handle case where associated source has changed
  if (args.source && document.source && args.source !== document.source.toString()) {
    await models.Source.updateOne({ _id: document.source }, { $pull: { media: _id }  })
    await models.Source.updateOne({ _id: args.source }, { $addToSet: { media: _id } })
  } else if (args.source) {
    await models.Source.updateOne({ _id: args.source }, { $addToSet: { media: _id } })
  }

  return document._id
}

exports.source = async (args, _id) => {
  let document = await models.Source.findOneAndUpdate({ _id }, args, updateSettings)

  if (!document) {
    throw new Error('the resource does not exist')
  }

  return document._id
}

exports.answer = async (args, _id) => {
  let document = await models.Answer.findOneAndUpdate({ _id }, args, updateSettings)

  if (!document) {
    throw new Error('the resource does not exist')
  }

  // populate associations
  // handle case where associated question has changed
  if (args.question && document.question && args.question !== document.question.toString()) {
    await models.Question.updateOne({ _id: document.question }, { $pull: { answer: _id }  })
    await models.Question.updateOne({ _id: args.question }, { $addToSet: { answer: _id } })
  } else if (args.question) {
    await models.Question.updateOne({ _id: args.question }, { $addToSet: { answer: _id } })
  }

  return document._id
}

exports.question = async (args, _id) => {
  let document = await models.Question.findOneAndUpdate({ _id }, args, updateSettings)

  if (!document) {
    throw new Error('the resource does not exist')
  }

  return document._id
}
