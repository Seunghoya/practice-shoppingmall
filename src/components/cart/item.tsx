import { SyntheticEvent } from "react"
import { ChangeEventHandler } from "react"
import { CartType, UPDATE_CART } from "../../graphql/cart"
import { getClient, graphqlFetcher, QueryKeys } from "../../queryClient"
import { QueryClient, useMutation } from "react-query"

export const CartItem = ({ id, imageUrl, price, title, amount }: CartType) => {
  const queryClient = getClient()
  const { mutate: updateCart } = useMutation(   
    ({ id, amount }: { id: string; amount: number }) => graphqlFetcher(UPDATE_CART, { id, amount }),
  )
  
  const handlersUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value)
    if (amount < 1) return
    updateCart(
      { id, amount },
      {
        onSuccess: () => queryClient.invalidateQueries(QueryKeys.CART)
      }
      )
  }
  
  return (
    <ul>
      <h3>{title}</h3>
      <img src={imageUrl} />
      <p>{price}</p>
      <input 
        type="number" 
        value={amount} 
        min={1}
        onChange={handlersUpdateAmount}/>
    </ul>
  )
}
