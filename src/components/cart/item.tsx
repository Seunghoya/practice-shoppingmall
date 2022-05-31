import { CartType } from "../../graphql/cart"

export const CartItem = ({ id, imageUrl, price, title, amount }: CartType) => {
  return (
    <ul>
      {id}{imageUrl}{price}{title}{amount}
    </ul>
  )
}
