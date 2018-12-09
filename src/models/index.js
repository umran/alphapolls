var mongoose = require('mongoose')
var Schema = mongoose.Schema

exports.Question = mongoose.model('Question', Schema({
  value: { type: String, required: true },
  input_type: { type: String, enum: ['String', 'Number'], required: true },
  data_type: { type: String, enum: ['Continuous', 'Discrete', 'Categorical', 'Dummy'], required: true },
  input_minimum: { type: Number },
  input_maximum: { type: Number },
  choice: [{ type: Schema.Types.Mixed }],
  allow_arbitrary: { type: Boolean, default: false, required: true },
  date_created: { type: Date, required: true, default: new Date() },
  date_modified: { type: Date, required: true, default: new Date() },
  // associations
  answer: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  survey: [{ type: Schema.Types.ObjectId, ref: 'Survey' }]
}))

exports.Answer = mongoose.model('Answer', Schema({
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  value: { type: Schema.Types.Mixed, required: true },
  date_created: { type: Date, required: true, default: new Date() },
  date_modified: { type: Date, required: true, default: new Date() },
  // associations
  response: { type: Schema.Types.ObjectId, ref: 'Response' }
}))

exports.Source = mongoose.model('Source', Schema({
  name: { type: String, required: true },
  website: { type: String },
  date_created: { type: Date, required: true, default: new Date() },
  date_modified: { type: Date, required: true, default: new Date() },
  // associations
  media: [{ type: Schema.Types.ObjectId, ref: 'Media' }]
}))

exports.Media = mongoose.model('Media', Schema({
  uri: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  source: { type: Schema.Types.ObjectId, ref: 'Source', required: true },
  date_created: { type: Date, required: true, default: new Date() },
  date_modified: { type: Date, required: true, default: new Date() },
  // associations
  survey: [{ type: Schema.Types.ObjectId, ref: 'Survey' }]
}))

exports.Survey = mongoose.model('Survey', Schema({
  name: { type: String, required: true },
  topic: [{ type: String }],
  media: [{ type: Schema.Types.ObjectId, ref: 'Media' }],
  question: [{ type: Schema.Types.ObjectId, ref: 'Question', required: true }],
  date_created: { type: Date, required: true, default: new Date() },
  date_modified: { type: Date, required: true, default: new Date() },
  // associations
  survey_instance: [{ type: Schema.Types.ObjectId, ref: 'SurveyInstance' }]
}))

exports.SurveyInstance = mongoose.model('SurveyInstance', Schema({
  survey: { type: Schema.Types.ObjectId, ref: 'Survey', required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  date_created: { type: Date, required: true, default: new Date() },
  date_modified: { type: Date, required: true, default: new Date() },
  // associations
  response: [{ type: Schema.Types.ObjectId, ref: 'Response' }]
}))

exports.Response = mongoose.model('Response', Schema({
  survey_instance: { type: Schema.Types.ObjectId, ref: 'SurveyInstance', required: true },
  answer: [{ type: Schema.Types.ObjectId, ref: 'Answer', required: true }],
  date_created: { type: Date, required: true, default: new Date() },
  date_modified: { type: Date, required: true, default: new Date() }
}))
