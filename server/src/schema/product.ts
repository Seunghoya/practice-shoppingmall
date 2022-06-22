import { gql } from 'apollo-server-express'

const productSchema = gql`
  type Product {
    id: ID!
    imageUrl: String!
    price: Int!
    title: String!
    description: String
    createdAt: Float    # 그래프QL에선 Int가 13자리까지라 createdAt에는 Float 타입을 적용
  }
  extend type Query {
    products(cursor: ID, showDeleted: Boolean): [Product!]
    product(id: ID!): Product!
  }
  extend type Mutation {
    addProduct(imageUrl: String!, price: Int!, title: String!, description: String!): Product!
    updateProduct(
      id: ID!
      imageUrl: String
      price: Int
      title: String
      description: String
    ): Product!
    deleteProduct(id: ID!): ID!
  }
`

export default productSchema