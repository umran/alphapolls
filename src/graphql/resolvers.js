const read = require('./read')
const create = require('./create')
const update = require('./update')

module.exports = {
  Query: {
    user: async (root, args, context) => {
      return await read.response(args, context)
    },
    response: async (root, args, context) => {
      return await read.response(args, context)
    },
    survey_instance: async (root, args, context) => {
      return await read.survey_instance(args, context)
    },
    survey: async (root, args, context) => {
      return await read.survey(args, context)
    },
    media: async (root, args, context) => {
      return await read.media(args, context)
    },
    source: async (root, args, context) => {
      return await read.source(args, context)
    },
    answer: async (root, args, context) => {
      return await read.answer(args, context)
    },
    question: async (root, args, context) => {
      return await read.question(args, context)
    }
  },

  User: {
    survey_instance: async (original, args={}, context) => {
      return await read.survey_instance({ ...args, _id: { $in: original.survey_instance } }, context)
    }
  },

  Response: {
    survey_instance: async (original, args={}, context) => {
      return await read.survey_instance({ ...args, _id: original.survey_instance }, context)
    },
    answer: async (original, args={}, context) => {
      return await read.answer({ ...args, _id: { $in: original.answer } }, context)
    }
  },

  SurveyInstance: {
    survey: async (original, args={}, context) => {
      return await read.survey({ ...args, _id: original.survey }, context)
    },
    response: async (original, args={}, context) => {
      return await read.response({ ...args, _id: { $in: original.response } }, context)
    },
    user: async (original, args={}, context) => {
      return await read.user({ ...args, _id: { $in: original.user } }, context)
    }
  },

  Survey: {
    media: async (original, args={}, context) => {
      return await read.media({ ...args, _id: { $in: original.media } }, context)
    },
    question: async (original, args={}, context) => {
      return await read.question({ ...args, _id: { $in: original.question } }, context)
    },
    survey_instance: async (original, args={}, context) => {
      return await read.survey_instance({ ...args, _id: { $in: original.survey_instance } }, context)
    }
  },

  Media: {
    source: async (original, args={}, context) => {
      return await read.source({ ...args, _id: original.source }, context)
    },
    survey: async (original, args={}, context) => {
      return await read.survey({ ...args, _id: { $in: original.survey } }, context)
    }
  },

  Source: {
    media: async (original, args={}, context) => {
      return await read.media({ ...args, _id: { $in: original.media } }, context)
    }
  },

  Answer: {
    question: async (original, args={}, context) => {
      return await read.source({ ...args, _id: original.question }, context)
    },
    response: async (original, args={}, context) => {
      return await read.response({ ...args, _id: original.response }, context)
    }
  },

  Question: {
    answer: async (original, args={}, context) => {
      return await read.answer({ ...args, _id: { $in: original.answer } }, context)
    },
    survey: async (original, args={}, context) => {
      return await read.survey({ ...args, _id: { $in: original.survey } }, context)
    }
  },

  Mutation: {
    create_response: async (root, args, context) => {
      return await create.response(args, context)
    },
    create_survey_instance: async (root, args, context) => {
      return await create.survey_instance(args, context)
    },
    create_survey: async (root, args, context) => {
      return await create.survey(args, context)
    },
    create_media: async (root, args, context) => {
      return await create.media(args, context)
    },
    create_source: async (root, args, context) => {
      return await create.source(args, context)
    },
    create_answer: async (root, args, context) => {
      return await create.answer(args, context)
    },
    create_question: async (root, args, context) => {
      return await create.question(args, context)
    },
    update_response: async (root, args, context) => {
      return await update.response(args, context)
    },
    update_survey_instance: async (root, args, context) => {
      return await update.survey_instance(args, context)
    },
    update_survey: async (root, args, context) => {
      return await update.survey(args, context)
    },
    update_media: async (root, args, context) => {
      return await update.media(args, context)
    },
    update_source: async (root, args, context) => {
      return await update.source(args, context)
    },
    update_answer: async (root, args, context) => {
      return await update.answer(args, context)
    },
    update_question: async (root, args, context) => {
      return await update.question(args, context)
    }
  }
}
