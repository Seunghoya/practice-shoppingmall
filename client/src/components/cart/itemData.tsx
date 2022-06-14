import { CartType } from '../../graphql/cart'

const ItemData = ({ imageUrl, price, title }: Pick<CartType, 'imageUrl' | 'price' | 'title'>) => (
  <>
    <h3 className="cart-item__title">{title}</h3>
    <img className="cart-item__image" src={imageUrl} />
    <p className="cart-item__price">가격: {price}</p>
  </>
)

export default ItemData