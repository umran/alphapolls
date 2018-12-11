# AlphaPolls
A GraphQL API for managing and analyzing online surveys using ApolloServer and a MongoDB backend

## Installation

```
npm install alphapolls
```

## Setup
The instance of ApolloServer exposed by alphapolls must be plugged-in to an existing express app under a custom endpoint through the applyMiddleware method.

### Setting the Context
In order to setup the API server a function must be provided that takes an express request object and returns a GraphQL context object. The request object should have a user property and clearance property already set by an authentication middleware.

The clearance property of the context object must be set to one of 'admin' or 'user'. The user property of the context object, if the clearance property is set to user, must be set to the \_id of the authenticated user as in the User model. If the clearance property is set to 'admin', the user property may be set to anything.

```javascript
const setContext = req => {
  if (!req.session) {
    throw new Error('a session must be set')
  }

  if (!req.session.clearance || !req.session.user) {
    throw new Error('a valid session object must be provided')
  }

  return {
    clearance: req.session.clearance,
    user: req.session.user
  }
}
```

### Applying the Middleware
Once a setContext function has been declared as above, we may proceed to apply the alphapolls server as a middleware to an express app.

```javascript
const express = require('express')
const alphapolls = require('alphapolls')

const app = express()
const server = alphapolls.applyMiddleware(app, setContext, '/some-optional-custom-endpoint')
server.listen(3040)
```

## Usage

### Using the API: Schemas, Queries and Mutations

All endpoints can be reached via a standard GraphQL request. The schema types are as follows:

```graphql
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
  survey_instance(_id: String, start_date: String, end_date: String, date_created: String, date_modified: String, response: [String], user: [String]): [SurveyInstance]
}

type SurveyInstance {
  _id: String!
  survey(_id: String, name: String, date_created: String, date_modified: String, topic: [String], media: [String], question: [String]): [Survey!]!
  start_date: String!
  end_date: String!
  date_created: String!
  date_modified: String!
  response(_id: String, date_created: String, date_modified: String, answer: [String]): [Response]
  user(_id: String, auth_provider: String, auth_token: String): [User]
}

type Response {
  _id: String!
  survey_instance(_id: String, survey: String, start_date: String, end_date: String, date_created: String, date_modified: String, user: [String]): [SurveyInstance!]!
  answer(_id: String, question: String, value: String, date_created: String, date_modified: String): [Answer!]!
  date_created: String!
  date_modified: String!
}

type User {
  _id: String!
  auth_provider: String!
  auth_token: String!
  date_created: String!
  date_modified: String!
  survey_instance(_id: String, survey: String, start_date: String, end_date: String, date_created: String, date_modified: String): [SurveyInstance]
}

type Query {
  user(_id: String, auth_provider: String, auth_token: String, survey_instance: [String]): [User]
  response(_id: String, survey_instance: String, date_created: String, date_modified: String, answer: [String]): [Response]
  survey_instance(_id: String, survey: String, start_date: String, end_date: String, date_created: String, date_modified: String, response: [String], user: [String]): [SurveyInstance]
  survey(_id: String, name: String, date_created: String, date_modified: String, topic: [String], media: [String], question: [String], survey_instance: [String]): [Survey]
  media(_id: String, uri: String, title: String, content: String, source: String, date_created: String, date_modified: String, survey: [String]): [Media]
  source(_id: String, name: String, website: String, date_created: String, date_modified: String, media: [String]): [Source]
  answer(_id: String, question: String, value: String, date_created: String, date_modified: String, response: String): [Answer]
  question(_id: String, value: String, input_type: String, data_type: String, input_minimum: Float, input_maximum: Float, allow_arbitrary: Boolean, date_created: String, date_modified: String, choice: [String], answer: [String], survey: [String]): [Question]
}

type Mutation {
  create_response(survey_instance: String!, answer: [String!]!): String!
  create_survey_instance(survey: String!, start_date: String!, end_date: String!): String!
  create_survey(name: String!, topic: [String], media: [String], question: [String!]!): String!
  create_media(uri: String!, title: String!, content: String!, source: String!): String!
  create_source(name: String!, website: String): String!
  create_answer(question: String!, value: String!): String!
  create_question(value: String!, input_type: String!, data_type: String!, input_minimum: Float, input_maximum: Float, allow_arbitrary: Boolean, choice: [String]): String!
  update_response(_id: String!, survey_instance: String, answer: [String]): String!
  update_survey_instance(_id: String!, survey: String, start_date: String, end_date: String): String!
  update_survey(_id: String!, name: String, topic: [String], media: [String], question: [String]): String!
  update_media(_id: String!, uri: String, title: String, content: String, source: String): String!
  update_source(_id: String!, name: String, website: String): String!
  update_answer(_id: String!, question: String, value: String): String!
  update_question(_id: String!, value: String, input_type: String, data_type: String, input_minimum: Float, input_maximum: Float, allow_arbitrary: Boolean, choice: [String]): String!
}
```
