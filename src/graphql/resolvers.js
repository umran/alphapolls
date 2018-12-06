const io = require('./io')

module.exports = {
  Query: {
    response: async (root, args) => {
      return await io.response(args)
    },
    survey_instance: async (root, args) => {
      return await io.survey_instance(args)
    },
    survey: async (root, args) => {
      return await io.survey(args)
    },
    media: async (root, args) => {
      return await io.media(args)
    },
    source: async (root, args) => {
      return await io.source(args)
    },
    answer: async (root, args) => {
      return await io.answer(args)
    },
    question: async (root, args) => {
      return await io.question(args)
    }
  },

  Response: {
    survey_instance: async (original, args={}) => {
      return await io.survey_instance({ ...args, _id: original.survey_instance })
    },
    answer: async (original, args={}) => {
      return await io.answer({ ...args, _id: { $in: original.answer } })
    }
  },

  SurveyInstance: {
    survey: async (original, args={}) => {
      return await io.survey({ ...args, _id: original.survey })
    },
    response: async (original, args={}) => {
      return await io.response({ ...args, _id: { $in: original.response } })
    }
  },

  Survey: {
    media: async (original, args={}) => {
      return await io.media({ ...args, _id: { $in: original.media } })
    },
    question: async (original, args={}) => {
      return await io.question({ ...args, _id: { $in: original.question } })
    },
    survey_instance: async (original, args={}) => {
      return await io.survey_instance({ ...args, _id: { $in: original.survey_instance } })
    }
  },

  Media: {
    source: async (original, args={}) => {
      return await io.source({ ...args, _id: original.source })
    },
    survey: async (original, args={}) => {
      return await io.survey({ ...args, _id: { $in: original.survey } })
    }
  },

  Source: {
    media: async (original, args={}) => {
      return await io.media({ ...args, _id: { $in: original.media } })
    }
  },

  Answer: {
    question: async (original, args={}) => {
      return await io.source({ ...args, _id: original.question })
    },
    response: async (original, args={}) => {
      return await io.response({ ...args, _id: original.response })
    }
  },

  Question: {
    answer: async (original, args={}) => {
      return await io.answer({ ...args, _id: { $in: original.answer } })
    },
    survey: async (original, args={}) => {
      return await io.survey({ ...args, _id: { $in: original.survey } })
    }
  }
}
