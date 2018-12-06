# AlphaPolls
A GraphQL API for managing and analyzing online surveys using ApolloServer and a MongoDB backend

## Installation

```
npm install alphapolls

```

## Usage

### As express middleware

The instance of ApolloServer exposed by alphapolls can be plugged-in to an existing express app under a custom endpoint through the applyMiddleware method

```
const express = require('express')
const alphapolls = require('alphapolls')

const app = express()
const serverA = alphapolls.applyMiddleware(app, '/some-optional-custom-endpoint')
serverA.listen(3040)

```

### As a standalone service

It also works out of the box as a standalone server through the createServer method

```
const alphapolls = require('alphapolls')

const serverB = alphapolls.createServer()
serverB.listen(3040)

```
