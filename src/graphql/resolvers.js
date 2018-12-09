const read = require('./read')
const create = require('./create')
const update = require('./update')

module.exports = {
  Query: {
    response: async (root, args) => {
      return await read.response(args)
    },
    survey_instance: async (root, args) => {
      return await read.survey_instance(args)
    },
    survey: async (root, args) => {
      return await read.survey(args)
    },
    media: async (root, args) => {
      return await read.media(args)
    },
    source: async (root, args) => {
      return await read.source(args)
    },
    answer: async (root, args) => {
      return await read.answer(args)
    },
    question: async (root, args) => {
      return await read.question(args)
    }
  },

  Response: {
    survey_instance: async (original, args={}) => {
      return await read.survey_instance({ ...args, _id: original.survey_instance })
    },
    answer: async (original, args={}) => {
      return await read.answer({ ...args, _id: { $in: original.answer } })
    }
  },

  SurveyInstance: {
    survey: async (original, args={}) => {
      return await read.survey({ ...args, _id: original.survey })
    },
    response: async (original, args={}) => {
      return await read.response({ ...args, _id: { $in: original.response } })
    }
  },

  Survey: {
    media: async (original, args={}) => {
      return await read.media({ ...args, _id: { $in: original.media } })
    },
    question: async (original, args={}) => {
      return await read.question({ ...args, _id: { $in: original.question } })
    },
    survey_instance: async (original, args={}) => {
      return await read.survey_instance({ ...args, _id: { $in: original.survey_instance } })
    }
  },

  Media: {
    source: async (original, args={}) => {
      return await read.source({ ...args, _id: original.source })
    },
    survey: async (original, args={}) => {
      return await read.survey({ ...args, _id: { $in: original.survey } })
    }
  },

  Source: {
    media: async (original, args={}) => {
      return await read.media({ ...args, _id: { $in: original.media } })
    }
  },

  Answer: {
    question: async (original, args={}) => {
      return await read.source({ ...args, _id: original.question })
    },
    response: async (original, args={}) => {
      return await read.response({ ...args, _id: original.response })
    }
  },

  Question: {
    answer: async (original, args={}) => {
      return await read.answer({ ...args, _id: { $in: original.answer } })
    },
    survey: async (original, args={}) => {
      return await read.survey({ ...args, _id: { $in: original.survey } })
    }
  },

  Mutation: {
    create_response: async (root, args) => {
      return await create.response(args)
    },
    create_survey_instance: async (root, args) => {
      return await create.survey_instance(args)
    },
    create_survey: async (root, args) => {
      return await create.survey(args)
    },
    create_media: async (root, args) => {
      return await create.media(args)
    },
    create_source: async (root, args) => {
      return await create.source(args)
    },
    create_answer: async (root, args) => {
      return await create.answer(args)
    },
    create_question: async (root, args) => {
      return await create.question(args)
    },
    update_response: async (root, args) => {
      return await update.response(args)
    },
    update_survey_instance: async (root, args) => {
      return await update.survey_instance(args)
    },
    update_survey: async (root, args) => {
      return await update.survey(args)
    },
    update_media: async (root, args) => {
      return await update.media(args)
    },
    update_source: async (root, args) => {
      return await update.source(args)
    },
    update_answer: async (root, args) => {
      return await update.answer(args)
    },
    update_question: async (root, args) => {
      return await update.question(args)
    }
  }
}
