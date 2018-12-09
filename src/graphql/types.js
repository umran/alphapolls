const { gql } = require('apollo-server-express')

module.exports = gql`
  type Question {
    _id: String!
    value: String!
    input_type: String!
    data_type: String!
    input_minimum: Float
    input_maximum: Float
    choice: [String]
    allow_arbitrary: Boolean!
    date_created: String!
    date_modified: String!
    answer(value: String, date_created: String, date_modified: String, response: String): [Answer]
    survey(name: String, date_created: String, date_modified: String, topic: [String], media: [String], survey_instance: [String]): [Survey]
  }

  type Answer {
    _id: String!
    question(_id: String, value: String, input_type: String, data_type: String, input_minimum: Float, input_maximum: Float, allow_arbitrary: Boolean, date_created: String, date_modified: String, choice: String, survey: [String]): [Question!]!
    value: String!
    date_created: String!
    date_modified: String!
    response(_id: String, survey_instance: String, date_created: String, date_modified: String): [Response]
  }

  type Source {
    _id: String!
    name: String!
    website: String
    date_created: String!
    date_modified: String!
    media(_id: String, uri: String, title: String, content: String, date_created: String, date_modified: String, survey: [String]): [Media]
  }

  type Media {
    _id: String!
    uri: String!
    title: String!
    content: String!
    source(_id: String, name: String, website: String, date_created: String, date_modified: String): [Source!]!
    date_created: String!
    date_modified: String!
    survey(_id: String, name: String, date_created: String, date_modified: String, topic: [String], question: [String], survey_instance: [String]): [Survey]
  }

  type Survey {
    _id: String!
    name: String!
    topic: [String]
    media(_id: String, uri: String, title: String, content: String, source: String, date_created: String, date_modified: String): [Media]
    question(_id: String, value: String, input_type: String, data_type: String, input_minimum: Float, input_maximum: Float, allow_arbitrary: Boolean, date_created: String, date_modified: String, choice: String, answer: [String]): [Question!]!
    date_created: String!
    date_modified: String!
    survey_instance(_id: String, start_date: String, end_date: String, date_created: String, date_modified: String, response: [String]): [SurveyInstance]
  }

  type SurveyInstance {
    _id: String!
    survey(_id: String, name: String, date_created: String, date_modified: String, topic: [String], media: [String], question: [String]): [Survey!]!
    start_date: String!
    end_date: String!
    date_created: String!
    date_modified: String!
    response(_id: String, date_created: String, date_modified: String, answer: [String]): [Response]
  }

  type Response {
    _id: String!
    survey_instance(_id: String, survey: String, start_date: String, end_date: String, date_created: String, date_modified: String): [SurveyInstance!]!
    answer(_id: String, question: String, value: String, date_created: String, date_modified: String): [Answer!]!
    date_created: String!
    date_modified: String!
  }

  type Query {
    response(_id: String, survey_instance: String, date_created: String, date_modified: String, answer: [String]): [Response]
    survey_instance(_id: String, survey: String, start_date: String, end_date: String, date_created: String, date_modified: String, response: [String]): [SurveyInstance]
    survey(_id: String, name: String, date_created: String, date_modified: String, topic: [String], media: [String], question: [String], survey_instance: [String]): [Survey]
    media(_id: String, uri: String, title: String, content: String, source: String, date_created: String, date_modified: String, survey: [String]): [Media]
    source(_id: String, name: String, website: String, date_created: String, date_modified: String, media: [String]): [Source]
    answer(_id: String, question: String, value: String, date_created: String, date_modified: String, response: String): [Answer]
    question(_id: String, value: String, input_type: String, data_type: String, input_minimum: Float, input_maximum: Float, allow_arbitrary: Boolean, date_created: String, date_modified: String, choice: [String], answer: [String], survey: [String]): [Question]
  }

  type Mutation {
    create_response(survey_instance: String, answer: [String]): String
    create_survey_instance(survey: String, start_date: String, end_date: String): String
    create_survey(name: String, topic: [String], media: [String], question: [String]): String
    create_media(uri: String, title: String, content: String, source: String): String
    create_source(name: String, website: String): String
    create_answer(question: String, value: String): String
    create_question(value: String, input_type: String, data_type: String, input_minimum: Float, input_maximum: Float, allow_arbitrary: Boolean, choice: [String]): String
    update_response(_id: String!, survey_instance: String, answer: [String]): String
    update_survey_instance(_id: String!, survey: String, start_date: String, end_date: String): String
    update_survey(_id: String!, name: String, topic: [String], media: [String], question: [String]): String
    update_media(_id: String!, uri: String, title: String, content: String, source: String): String
    update_source(_id: String!, name: String, website: String): String
    update_answer(_id: String!, question: String, value: String): String
    update_question(_id: String!, value: String, input_type: String, data_type: String, input_minimum: Float, input_maximum: Float, allow_arbitrary: Boolean, choice: [String]): String
  }
`
