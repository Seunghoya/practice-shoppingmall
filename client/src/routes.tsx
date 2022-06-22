import GlobalLayout from './pages/_layout'
import Index from './pages/index';
import CartIndex from './pages/cart/index';
import Gnb from './pages/gnb';
import ProductsIndex from './pages/products/index';
import ProductsId from './pages/products/[id]';
import PaymentPage from './pages/payment/index';
import AdminIndex from './pages/admin/index';

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <Index />, index: true},
      { path: '/cart', element: <CartIndex />, index: true},
      { path: '/products', element: <ProductsIndex />, index: true},
      { path: '/products/:id', element: <ProductsId />, },
      { path: '/payment', element: <PaymentPage />, index: true },
      { path: '/admin', element: <AdminIndex />, index: true },
    ]
  }
]

export const pages = [
  { route: '/' },
  { route: '/cart' },
  { route: '/products' },
  { route: '/products/:id' },
  { route: '/payment' },
]
