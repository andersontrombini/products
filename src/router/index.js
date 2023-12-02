import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/Products/View.vue'
import ProductCreate from '../views/Products/Create.vue'
import ProductEdit from '../views/Products/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductView
    },
    {
      path: '/products/create',
      name: 'productCreate',
      component: ProductCreate
    },
    {
      path: '/products/:id/edit',
      name: 'productEdit',
      component: ProductEdit
    }
  ]
})

export default router
