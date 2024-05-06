
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'
import { ADMIN, USER } from '@/constants/roles.constant'
import { APP_PREFIX_PATH } from '@/constants/route.constant'

const navigationConfig: NavigationTree[] = [
    {

        key: 'menu',
        path: '',
        title: 'Menú',
        translateKey: '',
        icon: 'menu',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: 'home',
                path:`${APP_PREFIX_PATH}/home`,
                title: 'Inicio',
                translateKey: '',
                icon: 'home',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
                
            },
            {
                key: 'products',
                path: '',
                title: 'Productos',
                translateKey: '',
                icon: 'products',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                subMenu: [
                    {
                        key: 'products.list',
                        path: `${APP_PREFIX_PATH}/product-list`,
                        title: 'Listado Productos',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    },{
                        key: 'products.create',
                        path: `${APP_PREFIX_PATH}/product`,
                        title: 'Crear Producto',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    },{
                        key: 'products.category',
                        path: `${APP_PREFIX_PATH}/categories-list`,
                        title: 'Lista de Categorias',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    },{
                        key: 'products.inventory',
                        path: `${APP_PREFIX_PATH}/inventory`,
                        title: 'Inventario',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    }
                ],
            },
            {
                key: 'customers',
                path: '',
                title: 'Clientes',
                translateKey: '',
                icon: 'customers',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                subMenu: [
                    {
                        key: 'customers.list',
                        path: `${APP_PREFIX_PATH}/people-list`,
                        title: 'Listado Clientes',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    },{
                        key: 'customers.create',
                        path: `${APP_PREFIX_PATH}/people`,
                        title: 'Crear Cliente',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    }
                ],
            },
            {
                key: 'orders',
                path: '',
                title: 'Ordenes',
                translateKey: '',
                icon: 'orders',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                subMenu: [
                    {
                        key: 'orders.list',
                        path: `${APP_PREFIX_PATH}/order-list`,
                        title: 'Listado Ordenes',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    },{
                        key: 'orders.create',
                        path: `${APP_PREFIX_PATH}/order`,
                        title: 'Crear Orden',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    }
                ],
            }
        ]

    },
    {

        key: 'admin',
        path: '',
        title: 'Administración',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: 'remission',
                path:`${APP_PREFIX_PATH}/remission`,
                title: 'Remisiones',
                translateKey: '',
                icon: 'remissions',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
                
            },
            {
                key: 'companies',
                path: '',
                title: 'Compañías',
                translateKey: '',
                icon: 'companies',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                subMenu: [
                    {
                        key: 'companies.list',
                        path: `${APP_PREFIX_PATH}/companies-list`,
                        title: 'Listado de Compañías',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    },{
                        key: 'companies.create',
                        path: `${APP_PREFIX_PATH}/company`,
                        title: 'Crear Compañía',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    },
                    {
                        key: 'branch.list',
                        path: `${APP_PREFIX_PATH}/branch-list`,
                        title: 'Listado de Sucursales',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    },{
                        key: 'branch.create',
                        path: `${APP_PREFIX_PATH}/branch`,
                        title: 'Crear Sucursal',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    }
                ],
            },
            {
                key: 'users',
                path: '',
                title: 'Usuarios',
                translateKey: '',
                icon: 'users',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                subMenu: [
                    {
                        key: 'users.list',
                        path: `${APP_PREFIX_PATH}/user-list`,
                        title: 'Listado Usuarios',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    },{
                        key: 'users.create',
                        path: `${APP_PREFIX_PATH}/user`,
                        title: 'Crear Usuario',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],
                    },{
                        key: 'users.bankaccount',
                        path: `${APP_PREFIX_PATH}/bank-accounts`,
                        title: 'Cuentas Bancarias',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    }
                ],
            },
            {
                key: 'confirmations',
                path: '',
                title: 'Confirmaciones',
                translateKey: '',
                icon: 'confirmations',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                subMenu: [
                    {
                        key: 'confirmations.list',
                        path: `${APP_PREFIX_PATH}/confirmation-list`,
                        title: 'Listado Confirmaciones',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],
                    },{
                        key: 'confirmations.create',
                        path: `${APP_PREFIX_PATH}/confirmation`,
                        title: 'Crear Confirmación',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    }
                ],
            },
            {
                key: 'withdrawls',
                path: '',
                title: 'Retiros',
                translateKey: '',
                icon: 'withdrawls',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                subMenu: [
                    {
                        key: 'withdrawls.list',
                        path: `${APP_PREFIX_PATH}/withdrawls-list`,
                        title: 'Listado Retiro',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],
                    },{
                        key: 'withdrawls.create',
                        path: `${APP_PREFIX_PATH}/withdrawls`,
                        title: 'Crear Retiro',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    }
                ],
            },{
                key: 'routes',
                path: '',
                title: 'Rutas',
                translateKey: '',
                icon: 'routes',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                subMenu: [
                    {
                        key: 'routes.list',
                        path: `${APP_PREFIX_PATH}/routes-list`,
                        title: 'Listado Rutas',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],
                    },{
                        key: 'routes.create',
                        path: `${APP_PREFIX_PATH}/routes`,
                        title: 'Crear Ruta',
                        translateKey: '',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    }
                ],
            },{
                key: 'picking-packing',
                path:`${APP_PREFIX_PATH}/picking-packing`,
                title: 'Picking & Packing',
                translateKey: '',
                icon: 'pickingpacking',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
                
            },{
                key: 'settings',
                path:`${APP_PREFIX_PATH}/configuration`,
                title: 'Configuración',
                translateKey: '',
                icon: 'configuration',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
                
            }
        ]

        
    }
    
]

export default navigationConfig
