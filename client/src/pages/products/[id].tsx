import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { graphqlFetcher, QueryKeys } from "../../queryClient"
import { ProductDetail } from "../../components/products/detail"
import { GET_PRODUCT, Product }  from "../../graphql/products"

export const ProductDetailPage = () => {
  const { id } = useParams()
  const { data } = useQuery<{ product: Product }>([QueryKeys.PRODUCTS, id], 
    () => graphqlFetcher(GET_PRODUCT, { id })
  )
  
  if (!data) return null;

  return (
    <ProductDetail item={data.product}/>
  )
}

export default ProductDetailPage