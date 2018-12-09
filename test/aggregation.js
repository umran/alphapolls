TokenSummary: {
  input_type: 'String',
  data_type: 'String',
  value: 'String',
  count: 'Float',
  proportion: 'Float'
}

QuestionSummary: {
  question: 'String',
  sampleMean: 'Float',
  sampleSd: 'Float',
  token_summary: '[TokenSummary]'
}

question_summary = ([question], survey, survey_instance) => {
  //get all relevant questions
  {
    $lookup: {
      from: 'answer',
      localField: 'answer',
      foreignField: '_id',
      as: 'answer'
    },
    $lookup: {
      from: 'survey',
      localField: 'survey',
      foreignField: '_id',
      as: 'survey'
    },
    $lookup: {
      from: 'survey_instance',
      localField: 'survey.survey_instance',
      foreignField: '_id',
      as: 'survey_instance'
    },
    $unwind: '$answer',
    $unwind: '$survey',
    $unwind: '$survey_instance',
    $match: {
      _id: { $in: [question] },
      survey: survey,
      survey_instance: survey_instance
    },
    $group: {
      
    }
  }
}
