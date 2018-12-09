`
type TokenSummary {
  input_type: String!
  data_type: String!
  value: String!
  count: Float
  proportion: Float
}

type QuestionSummary {
  question: String!
  sampleMean: Float
  sampleSd: Float
  token_summary: [TokenSummary]
}

type Query {
  question_summary(question: [String!], survey: String, survey_instance: String): [QuestionSummary]
}
`
