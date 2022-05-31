
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"
import { cartItemSelector } from "../../recoil/cart"
import { Product } from "../../graphql/products"
export const  ProductItem = ({ 
  id,
  imageUrl,
  price,
  title,
  description,
  createdAt,
}: Product) => {

  const [cartAmount, setCartAmount] = useRecoilState(cartItemSelector(id))
  const addToCart = () => setCartAmount(prev => (prev || 0) + 1)

  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
      <h2 className="product-item__title">{title}</h2>
      {/* <p className="product-item__category">{category}</p> */}
      <p className="product-item__price">₩ {price}</p>
      <img className="product-item__image" src={imageUrl} alt={title}/>
      <p className="product-item__description">{description}</p>
      {/* <p className="product-item__rating">{rating.rate}</p> */}
      </Link>
      <button className="product-item__add-cart" onClick={addToCart}>담기</button>
      <span>{cartAmount || 0}</span>
    </li>
  )
}












