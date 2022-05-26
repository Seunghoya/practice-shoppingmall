import { Product } from "../../types"
import { Link } from "react-router-dom"
export const ProductItem = ({ 
  id,
  title,
  price,
  description,
  category,
  image,
  rating 
}: Product) => {

  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
      <h2 className="product-item__title">{title}</h2>
      <p className="product-item__category">{category}</p>
      <p className="product-item__price">${price}</p>
      <img className="product-item__image" src={image} alt={title}/>
      {/* <p className="product-item__description">{description}</p> */}
      <p className="product-item__rating">{rating.rate}</p>
      </Link>
    </li>
  )
}







