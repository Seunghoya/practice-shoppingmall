import { Link } from "react-router-dom"
import { Product } from "../../graphql/products"
import { useMutation } from "react-query"
import { graphqlFetcher } from "../../queryClient"
import { ADD_CART } from "../../graphql/cart"

export const  ProductItem = ({ id, imageUrl, price, title }: Product) => {
  const { mutate: addCart } = useMutation((id: string) => graphqlFetcher(ADD_CART, { id }))
  
  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
        <h2 className="product-item__title">{title}</h2>
        <p className="product-item__price">₩ {price}</p>
        <img className="product-item__image" src={imageUrl} alt={title}/>
      </Link>
      <button className="product-item__add-cart" onClick={() => addCart(id)}>담기</button>
    </li>
  )
}




