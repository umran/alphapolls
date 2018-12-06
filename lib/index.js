const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const bodyParser = require('body-parser')
const typeDefs = require('../src/graphql/types')
const resolvers = require('../src/graphql/resolvers')

exports.applyMiddleware = (app, path) => {
  path = path || '/'

  app.use(path, cors())
  app.use(path, bodyParser.json())

  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  server.applyMiddleware({ app, path })

  return app
}
