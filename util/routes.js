const Profile = () => import('~/pages/profile').then(m => m.default || m)
const ListCustomer = () => import('~/pages/customers').then(m => m.default || m)
const CustomerDetail = () => import('~/pages/customers/detail').then(m => m.default || m)
const AddCustomer = () => import('~/pages/customers/add').then(m => m.default || m)
const Transactions = () => import('~/pages/transactions').then(m => m.default || m)
const TransactionDetail = () => import('~/pages/transactions/detail').then(m => m.default || m)
const Products = () => import('~/pages/products').then(m => m.default || m)
const Bucket = () => import('~/pages/products/bucket').then(m => m.default || m)
const Orders = () => import('~/pages/orders').then(m => m.default || m)
const OrderDetail = () => import('~/pages/orders/detail').then(m => m.default || m)

export default [
  {
    name: 'profile',
    path: '/profile',
    component: Profile
  },
  {
    name: 'customers/list',
    path: '/customers/list',
    component: ListCustomer
  },
  {
    name: 'customers/detail',
    path: '/customers/detail',
    component: CustomerDetail
  },
  {
    name: 'customers/add',
    path: '/customers/add',
    component: AddCustomer
  },
  {
    name: 'transactions',
    path: '/transactions',
    component: Transactions
  },
  {
    name: 'transactions/detail',
    path: '/transactions/detail',
    component: TransactionDetail
  },
  {
    name: 'products',
    path: '/products',
    component: Products
  },
  {
    name: 'bucket',
    path: '/bucket',
    component: Bucket
  },
  {
    name: 'orders',
    path: '/orders/list',
    component: Orders
  },
  {
    name: 'orders/detail',
    path: '/orders/detail',
    component: OrderDetail
  }
]
