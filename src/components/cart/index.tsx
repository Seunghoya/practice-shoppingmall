import { CartType } from "../../graphql/cart";
import { CartItem } from "./item";

export const CartList = ({ items }: { items: CartType[] }) => {
  return (
    <ul>
      {items.map(item => <CartItem {...item} key={item.id} />)}
    </ul>
  )
}
