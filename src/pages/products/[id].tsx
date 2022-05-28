import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { graphqlFetcher, QueryKeys } from "../../queryClient"
import { ProductDetail } from "../../components/products/detail"
import { GET_PRODUCT, Product }  from "../../components/graphql/products"

export const ProductDetailPage = () => {
  const { id } = useParams()
  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], 
    () => graphqlFetcher(GET_PRODUCT, { id })
  )
  
  if (!data) return null;

  return (
    <ProductDetail item={data}/>
  )
}

export default ProductDetailPage