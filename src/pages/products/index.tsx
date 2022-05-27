import { useQuery } from 'react-query'
import GET_PRODUCTS, { Products } from '../../components/graphql/products'
import { ProductItem } from '../../components/products/Item'
import { graphqlFetcher, QueryKeys } from '../../queryClient'

export const ProductList = () => {
  const { data } = useQuery<Products>(QueryKeys.PRODUCTS, () => 
    graphqlFetcher(GET_PRODUCTS)
  )
  
  return (
    <ul className='products'>
      {data?.products?.map(product => (
        <ProductItem {...product} key={product.id} />
      ))}
    </ul>
  )
}

export default ProductList
