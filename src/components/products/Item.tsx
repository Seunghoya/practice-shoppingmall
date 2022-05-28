
import { Link } from "react-router-dom"
import { Product } from "../graphql/products"
export const  ProductItem = ({ 
  id,
  imageUrl,
  price,
  title,
  description,
  createdAt,
}: Product) => {

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
      <button className="product-item__add-cart">담기</button>
    </li>
  )
}












