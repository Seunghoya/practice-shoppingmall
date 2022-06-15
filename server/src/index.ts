import express from "express";
import { ApolloServer } from "apollo-server-express"
import schema from "./schema";
import resolvers from "./resolvers";
import { DBField, readDB } from './dbController';
import cors from "cors";

const port = 8000;

(async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
      db: {
        products: readDB(DBField.PRODUCTS),
        cart: readDB(DBField.CART),
      },
    },
  })

  const app = express()
  const corsOptions = {
    origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
    credentials: true, 
  };
  
  await server.start()
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: corsOptions
  })

  await app.listen({ port: port })
  console.log(`server started on port ${port}`)
})()
