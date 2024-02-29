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
        component: lazy(() => import('@/views/sales/ProductForm')),
        authority: [ADMIN, USER],
    },
    {
        key: 'products.edit',
        path: `${APP_PREFIX_PATH}/product/:productId?`,
        component: lazy(() => import('@/views/sales/ProductEdit')),
        authority: [ADMIN, USER],
    },
    
    {
        key: 'products.inventory',
        path: `${APP_PREFIX_PATH}/inventory`,
        component: lazy(() => import('@/views/sales/SalesDashboard')),
        authority: [ADMIN, USER],
    }
    /** Example purpose only, please remove */
    
]