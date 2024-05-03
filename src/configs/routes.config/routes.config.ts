import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { ADMIN, USER } from '@/constants/roles.constant'
import { APP_PREFIX_PATH } from '@/constants/route.constant'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: `${APP_PREFIX_PATH}/home`,
        component: lazy(() => import('@/views/sales/SalesDashboard')),
        authority: [ADMIN, USER],
    },
    {
        key: 'products.list',
        path: `${APP_PREFIX_PATH}/product-list`,
        component: lazy(() => import('@/views/sales/ProductList')),
        authority: [ADMIN, USER],
    },
    {
        key: 'products.create',
        path: `${APP_PREFIX_PATH}/product/`,
        component: lazy(() => import('@/views/sales/ProductNew')),
        authority: [ADMIN, USER],
    },
    {
        key: 'products.edit',
        path: `${APP_PREFIX_PATH}/product/:productId?`,
        component: lazy(() => import('@/views/sales/ProductEdit')),
        authority: [ADMIN, USER],
    },
    //CATEGORÍAS
    {
        key: 'category.list',
        path: `${APP_PREFIX_PATH}/categories-list`,
        component: lazy(() => import('@/views/sales/CategoryList')),
        authority: [ADMIN, USER],
    },
    {
        key: 'category.create',
        path: `${APP_PREFIX_PATH}/category/`,
        component: lazy(() => import('@/views/sales/CategoryNew')),
        authority: [ADMIN, USER],
    },
    {
        key: 'category.edit',
        path: `${APP_PREFIX_PATH}/category/:categoryId?`,
        component: lazy(() => import('@/views/sales/CategoryEdit')),
        authority: [ADMIN, USER],
    },


     //COMPAÑÍA
     {
        key: 'company.list',
        path: `${APP_PREFIX_PATH}/companies-list`,
        component: lazy(() => import('@/views/sales/companyList')),
        authority: [ADMIN, USER],
    },
    {
        key: 'company.create',
        path: `${APP_PREFIX_PATH}/company/`,
        component: lazy(() => import('@/views/sales/companyNew')),
        authority: [ADMIN, USER],
    },
    {
        key: 'company.edit',
        path: `${APP_PREFIX_PATH}/company/:companyId?`,
        component: lazy(() => import('@/views/sales/CompanyEdit')),
        authority: [ADMIN, USER],
    },

    //COMPAÑÍA
    {
        key: 'customers.list',
        path: `${APP_PREFIX_PATH}/people-list`,
        component: lazy(() => import('@/views/sales/PeopleList')),
        authority: [ADMIN, USER],
    },
    {
        key: 'customers.create',
        path: `${APP_PREFIX_PATH}/people/`,
        component: lazy(() => import('@/views/sales/PeopleNew')),
        authority: [ADMIN, USER],
    },
    {
        key: 'customers.edit',
        path: `${APP_PREFIX_PATH}/people/:peopleId?/:pType?`,
        component: lazy(() => import('@/views/sales/PeopleEdit')),
        authority: [ADMIN, USER],
    },


    //COMPAÑÍA
    {
        key: 'order.list',
        path: `${APP_PREFIX_PATH}/order-list`,
        component: lazy(() => import('@/views/sales/OrderList')),
        authority: [ADMIN, USER],
    },
    {
        key: 'order.create',
        path: `${APP_PREFIX_PATH}/order/`,
        component: lazy(() => import('@/views/sales/OrderNew')),
        authority: [ADMIN, USER],
    },
    {
        key: 'order.edit',
        path: `${APP_PREFIX_PATH}/order/:orderId?/`,
        component: lazy(() => import('@/views/sales/PeopleEdit')),
        authority: [ADMIN, USER],
    },


    {
        key: 'products.inventory',
        path: `${APP_PREFIX_PATH}/inventory`,
        component: lazy(() => import('@/views/sales/SalesDashboard')),
        authority: [ADMIN, USER],
    }
    ,
    {
        key: 'appsAccount.settings',
        path: `${APP_PREFIX_PATH}/user/:tab`,
        component: lazy(() => import('@/views/account/Settings')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Cuenta Cashin',
            headerContainer: true,
        },
    },
    
    /** Example purpose only, please remove */
    
]