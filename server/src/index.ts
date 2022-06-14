import express from "express";
import { ApolloServer, ExpressContext } from "apollo-server-express"
import { Config } from 'apollo-server-core';
import schema from "../schema";
import resolvers from "../resolvers";


const port = 8000;

(async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {}

  })

  const app = express()
  await server.start()
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: ['http://localhost:3000', 'https://studio.apollographql.com/sandbox'],
      credentials: true
    }
  })

  await app.listen({ port: port })

  console.log(`server started on port ${port}`)
})()
