import { gql } from 'apollo-server-express'
import productSchema from './product'
import cartSchema from './cart'

const linkSchema = gql`
  type Query {
    _: Boolean  # 아무것도 없으면 에러가 발생. 아무 의미 없는 값을 넣어줘서 에러처리 해줌.
  }
  type Mutation {
    _: Boolean
  }
`

export default [linkSchema, productSchema, cartSchema]