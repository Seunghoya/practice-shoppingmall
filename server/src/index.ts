import express from "express";
import { ApolloServer } from "apollo-server-express"
import schema from "./schema";
import resolvers from "./resolvers";

const port = 8000;

(async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    // context: {}
  })

  const app = express()
  await server.start()
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: ['http://localhost:3000', 'https://studio.apollographql.com/'],
      credentials: true
    }
  })

  await app.listen({ port: port })
  console.log(`server started on port ${port}`)
})()
