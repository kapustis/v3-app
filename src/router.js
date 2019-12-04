import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('./views/Home.vue')
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('./views/Auth/Login.vue')
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: () => import('./views/Auth/Dashboard.vue'),
			// children:[]
		},
		{
			path: '/new-product',
			name: 'newProduct',
			component: () => import('./views/Product/NewProduct'),
			// beforeEnter: AuthGuard
		},
		{
			path: '/list-product',

			name: 'listProduct',
			component: () => import('./views/Product/ListProduct.vue'),
			// beforeEnter: AuthGuard
		},
		{
			path: '/product-edit/:id',
			props: true,
			name: 'editProduct',
			component: () => import('./views/Product/EditProduct.vue'),
			// beforeEnter: AuthGuard
		},
		{
			path: '/config',
			name: 'config.store.js',
			component: () => import('./views/Service/Config.vue')
		},
		// {
		// 	path: '/registration',
		// 	name: 'registration',
		// 	component: () => import('./views/Auth/Registration.vue')
		// },
		{
			path: '/product/:id',
			props: true,
			name: 'product',
			component: () => import('./views/Product/Product.vue'),
		},
		{
			path: '/cart',
			props: true,
			name: 'cart',
			component: () => import('./components/shared/shoppingCart.vue'),
		},
		{
			path: '/new-orders',
			name: 'newOrders',
			component: () => import('./views/Order/NewOrders.vue'),
			// beforeEnter: AuthGuard
		},
		{
			path: '/orders',
			name: 'orders',
			component: () => import('./views/Order/Orders.vue'),
			beforeEnter: AuthGuard
		},
		{
			path: '/order/:id',
			props: true,
			name: 'order',
			component: () => import('./views/Order/Order.vue'),
			// beforeEnter: AuthGuard
		}
	]
})
