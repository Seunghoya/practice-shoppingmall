import { useQuery } from "react-query"
import { GET_CART, CartType } from "../../graphql/cart"
import { graphqlFetcher, QueryKeys } from '../../queryClient'
import { CartList } from '../../components/cart/index'

export const Cart = () => {
  const { data } = useQuery(QueryKeys.CART, () => graphqlFetcher(GET_CART), {
    staleTime: 0,
    cacheTime: 1000
  })
  const cartItems = Object.values(data || {}) as CartType[]
  // console.log(data)
  if (!cartItems.length) return <div>장바구니가 비었어요</div>

  
  return (
    <>
      <CartList items={cartItems}/>
    </>
  )
}

export default Cart