import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { fetcher, QueryKeys } from "../../queryClient"
import { Product } from "../../types"
import { ProductDetail } from "../../components/products/detail"

export const ProductDetailPage = () => {
  const { id } = useParams()
  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], 
    () => fetcher({
      method: "GET",
      path: `/products/${id}`
    })
  )
  
  if (!data) return null;

  return (
    <ProductDetail item={data}/>
  )
}

export default ProductDetailPage