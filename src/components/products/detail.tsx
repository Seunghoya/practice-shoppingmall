import { Product } from "../graphql/products"

export const ProductDetail = ({ 
  item: { 
    title, 
    description, 
    price, 
    imageUrl, 
  }
}: { 
  item: Product
}) => {

  return (
    <div>
      <h2 className="product-detail__title">{title}</h2>
      {/* <p className="product-detail__category">{category}</p> */}
      <p className="product-detail__price">₩ {price}</p>
      <img className="product-detail__image" src={imageUrl} alt={title}/>
      <p className="product-detail__description">{description}</p>
      {/* <p className="product-detail__rating">{rate}</p> */}
    </div>
  )
}