import { useEffect, useRef } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import { GET_PRODUCTS, Products } from '../../graphql/products'
import { ProductList } from '../../components/products/list'
import { graphqlFetcher, QueryKeys } from '../../queryClient'
import { useIntersection } from '../../hooks/useIntersection'

export const ProductListPage = () => {
  const fetchMoreRef = useRef<HTMLDivElement>(null)
  const intersecting = useIntersection(fetchMoreRef)

  const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<Products>(
      [QueryKeys.PRODUCTS, 'products'],
      ({ pageParam = '' }) => graphqlFetcher(GET_PRODUCTS, { cursor: pageParam, showDeleted: true }),
      {
        getNextPageParam: lastPage => {
          return lastPage.products.at(-1)?.id
        },
      },
    )

  useEffect(() => {
    if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage) return
    fetchNextPage()
  }, [intersecting])

  // console.log(data)
  return (
    <>
      <h2>상품목록</h2>
      <ProductList list={data?.pages || []} />
      <div ref={fetchMoreRef} />
    </>
  )
}

export default ProductListPage
