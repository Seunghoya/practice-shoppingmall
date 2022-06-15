import { SyntheticEvent, ForwardedRef, forwardRef } from "react"
import { CartType, DELETE_CART, UPDATE_CART } from "../../graphql/cart"
import { getClient, graphqlFetcher, QueryKeys } from "../../queryClient"
import { useMutation } from "react-query"
import ItemData from './itemData'

const CartItem = (
  { id, product: { imageUrl, price, title }, amount }: CartType, 
  ref: ForwardedRef<HTMLInputElement>
) => {
  const queryClient = getClient()
  const { mutate: updateCart } = useMutation(   
    ({ id, amount }: { id: string; amount: number }) => graphqlFetcher(UPDATE_CART, { id, amount }),
    {
      onMutate: async ({ id, amount }: { id: string; amount: number }) => {
        await queryClient.cancelQueries(QueryKeys.CART)
        const { cart: prevCart } = queryClient.getQueryData<{ cart: CartType[] }>(
          QueryKeys.CART,
        ) || { cart: [] }
        if (!prevCart) return null

        const targetIndex = prevCart.findIndex(cartItem => cartItem.id === id)
        if (targetIndex === undefined || targetIndex < 0) return prevCart

        const newCart = [...prevCart]
        newCart.splice(targetIndex, 1, { ...newCart[targetIndex], amount })
        queryClient.setQueryData(QueryKeys.CART, { cart: newCart })
        return prevCart
      },
      onSuccess: ({ updateCart }) => {
        const { cart: prevCart } = queryClient.getQueryData<{ cart: CartType[] }>(
          QueryKeys.CART,
        ) || { cart: [] }
        const targetIndex = prevCart?.findIndex(cartItem => cartItem.id === updateCart.id)
        if (!prevCart || targetIndex === undefined || targetIndex < 0) return

        const newCart = [...prevCart]
        newCart.splice(targetIndex, 1, updateCart)
        queryClient.setQueryData(QueryKeys.CART, { cart: newCart })
      }
    }
  )

  const { mutate: deleteCart } = useMutation(
    ({ id }: { id: string }) => graphqlFetcher(DELETE_CART, { id }),
    {  
      onSuccess: () => { queryClient.invalidateQueries(QueryKeys.CART) }
    }
  )
  
  const handlersDeleteItems = () => {
    deleteCart({ id })
  }
  const handlersUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value)
    if (amount < 1) return
    updateCart(
      { id, amount },
      // {
      //   // onSuccess: () => queryClient.invalidateQueries(QueryKeys.CART)
      //   // 해당 방법은 Req를 두 번씩 보내는 단점이 존재함. 자주 요청을 보내는 것이 좋은것인지 고민해볼때
      //   // 캐시에 저장해서 반영하는 방법으로 요청을 최소화 하는것이 최적화에 더 좋아보임.

      //   onSuccess: (newValue) => {
      //     const prevCart =  queryClient.getQueryData<{[key: string]: CartType}>(QueryKeys.CART)
      //     const newCart = {
      //       ...(prevCart || {}),
      //       ...newValue
      //     }
      //     queryClient.setQueryData(QueryKeys.CART, newCart)
      //   }
      // }
    )
  }

  return (
    <li className="cart-item">
      <input 
        className="cart-item__checkbox" 
        type="checkbox" 
        name={`select-item_${id}`} 
        ref={ref}
      />
      {/* <h3 className="cart-item__title">{title}</h3>
      <img className="cart-item__image" src={imageUrl} />
      <p className="cart-item__price">{price}</p> */}
      <ItemData imageUrl={imageUrl} price={price} title={title} />
      <input 
        type="number"
        className="cart-item__amount" 
        value={amount} 
        min={1}
        onChange={handlersUpdateAmount}
      />
      <button className="cart-item__button" type="button" onClick={handlersDeleteItems}>삭제</button>  
    </li>
  )
}

export default forwardRef(CartItem)