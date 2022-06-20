import { Product } from '../../graphql/products'
import { ProductItem } from './Item'

export const ProductList = ({ list }: { list: { products: Product[] }[] }) => {
  
  return (  
    <ul className="products">
      {list.map(page => 
        page.products.map(product => 
        <ProductItem {...product} key={product.id} />
        )
      )}
    </ul>
  )
}
