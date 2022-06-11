import GlobalLayout from './pages/_layout'
import Index from './pages/index';
import CartIndex from './pages/cart/index';
import Gnb from './pages/gnb';
import ProductsIndex from './pages/products/index';
import ProductsId from './pages/products/[id]';
import PaymentPage from './pages/payment/index';

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <Index />, index: true},
      { path: '/cart', element: <CartIndex />, index: true},
      { path: '/gnb', element: <Gnb />, },
      { path: '/products', element: <ProductsIndex />, index: true},
      { path: '/products/:id', element: <ProductsId />, },
      { path: '/payment', element: <PaymentPage />, index: true },
    ]
  }
]

export const pages = [
  { route: '/' },
  { route: '/cart' },
  { route: '/gnb' },
  { route: '/products' },
  { route: '/products/:id' },
  { route: '/payment' },
]
