import { useInfiniteQuery, useQuery } from 'react-query'
import { GET_PRODUCTS, Products } from '../../graphql/products'
import { ProductList } from '../../components/products/list'
import { ProductItem } from '../../components/products/Item'
import { graphqlFetcher, QueryKeys } from '../../queryClient'

export const ProductListPage = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<Products>(
    QueryKeys.PRODUCTS, ({ pageParam = '' }) => 
    graphqlFetcher(GET_PRODUCTS, { cursor: pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        console.log(lastPage, allPages)
        return lastPage.products.at(-1)?.id
      },
    },
  )
  
  console.log(data)
  return (
    <>
      <h2>상품목록</h2>
      <ProductList list={data?.pages || []} />
    </>
  )
}

export default ProductListPage
