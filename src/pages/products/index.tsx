import { useQuery } from 'react-query'
import { ProductItem } from '../../components/products/Item'
import { fetcher, QueryKeys } from '../../queryClient'
import { Product } from '../../types'

export const ProductList = () => {
  const { data } = useQuery<Product[]>(QueryKeys.PRODUCTS, () => 
    fetcher({
      method: 'GET',
      path: '/products'
    })
  )
  console.log(data)
  return (
    <ul className='products'>
      {data?.map(product => (
        <ProductItem {...product} key={product.id} />
      ))}
    </ul>
  )
}

export default ProductList
