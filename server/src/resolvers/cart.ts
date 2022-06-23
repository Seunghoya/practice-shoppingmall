import { DBField, writeDB } from '../dbController'
import { Cart, Resolver } from './types'

const mockProducts = (() =>
  Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1 + '',
    imageUrl: `https://picsum.photos/id/${i + 10}/200/150`,
    price: 50000,
    title: `임시상품${i + 1}`,
    description: `임시상세내용${i + 1}`,
    createdAt: new Date(1645735501883 + i * 1000 * 60 * 60 * 10).toString(),
  })))()

let cartData = [
  { id: '1', amount: 1 },
  { id: '2', amount: 2 },
]

const setJSON = (data: Cart) => writeDB(DBField.CART, data)

const cartResolver: Resolver = {
  Query: {
    cart: (parent, args, { db }) => {
      return db.cart
    },
  },
  Mutation: {
    addCart: (parent, { id }, { db }) => {
      if (!id) throw Error('상품id가 없다!')
      const targetProduct = db.products.find(item => item.id === id)
      if (!targetProduct) {
        throw new Error('상품이 없습니다')
      }

      const existCartIndex = db.cart.findIndex(item => item.id === id)
      if (existCartIndex > -1) {
        const newCartItem = {
          id,
          amount: db.cart[existCartIndex].amount + 1,
        }
        db.cart.splice(existCartIndex, 1, newCartItem)
        setJSON(db.cart)
        return newCartItem
      }
      const newItem = {
        id,
        amount: 1,
      }
      db.cart.push(newItem)
      setJSON(db.cart)
      return newItem
    },
    updateCart: (parent, { id, amount }, { db }) => {
      const existCartIndex = db.cart.findIndex(item => item.id === id)

      if (existCartIndex < 0) {
        throw new Error('없는 데이터입니다')
      }
      const newCartItem = {
        id,
        amount,
      }
      db.cart.splice(existCartIndex, 1, newCartItem)
      setJSON(db.cart)
      return newCartItem
    },
    deleteCart: (parent, { id }, { db }) => {
      const existCartIndex = db.cart.findIndex(item => item.id === id)
      
      if (existCartIndex < 0) {
        throw new Error('없는 데이터입니다')
      }
      db.cart.splice(existCartIndex, 1)
      setJSON(db.cart)
      return id
    },
    executePay: (parent, { ids }, { db }) => {
      const newCartData = db.cart.filter(cartItem => !ids.includes(cartItem.id))
      db.cart = newCartData
      setJSON(db.cart)
      return ids
    },
  },
  CartItem: {
    product: (cartItem, args, { db }) =>
      db.products.find((product: any) => product.id === cartItem.id),
  },
}

export default cartResolver