import { Products, Resolver } from './types'
import { v4 as uuid } from 'uuid'
import { DBField, writeDB } from '../dbController'

const setJSON = (data: Products) => writeDB(DBField.PRODUCTS, data)
// https://www.apollographql.com/docs/apollo-server/data/resolvers
// const mockProducts = (() =>
//   Array.from({ length: 20 }).map((_, i) => ({
//     id: i + 1 + '',
//     imageUrl: `https://picsum.photos/id/${i + 10}/200/150`,
//     price: 50000,
//     title: `임시상품${i + 1}`,
//     description: `임시상세내용${i + 1}`,
//     createdAt: new Date(1645735501883 + i * 1000 * 60 * 60 * 10).toString(),
//   })))()

const productResolver: Resolver = {
  Query: {
    products: (parent, { cursor = '' }, { db }) => {
      const fromIndex = db.products.findIndex(product => product.id === cursor) + 1
      return db.products.slice(fromIndex, fromIndex + 15) || []
    },
    product: (parent, { id }, { db }) => {
      const found = db.products.find(item => item.id === id)
      if (found) return found
      return null
    },
  },
  
}
export default productResolver