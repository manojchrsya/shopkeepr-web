const Profile = () => import('~/pages/profile').then(m => m.default || m)
const ListCustomer = () => import('~/pages/customers').then(m => m.default || m)
const CustomerDetail = () => import('~/pages/customers/detail').then(m => m.default || m)
const AddCustomer = () => import('~/pages/customers/new').then(m => m.default || m)

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
  }
]
