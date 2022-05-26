import { Product } from "../../types"

export const ProductDetail = ({ 
  item: { 
    title, 
    description, 
    category, 
    price, 
    image, 
    rating: { 
      rate 
    } 
  }
}: { 
  item: Product 
}) => {


  return (
    <div>
      <h2 className="product-detail__title">{title}</h2>
      <p className="product-detail__category">{category}</p>
      <p className="product-detail__price">${price}</p>
      <img className="product-detail__image" src={image} alt={title}/>
      <p className="product-detail__description">{description}</p>
      <p className="product-detail__rating">{rate}</p>
    </div>
  )
}