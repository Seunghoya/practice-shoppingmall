import express from "express";
import { ApolloServer, ExpressContext } from "apollo-server-express"
import { Config } from 'apollo-server-core';


const port = 8000;

(async () => {
  const server = new ApolloServer({} as Config<ExpressContext>)

  const app = express()
  await server.start()
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: ['http://localhost:3000'],
      credentials: true
    }
  })

  await app.listen({ port: port })

  console.log(`server started on port ${port}`)
})()
