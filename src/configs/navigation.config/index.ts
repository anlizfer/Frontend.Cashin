
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
        translateKey: 'nav.menu',
        icon: 'menu',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: 'home',
                path:`${APP_PREFIX_PATH}/home`,
                title: 'Inicio',
                translateKey: 'nav.submenu.home',
                icon: 'home',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
                
            },
            {
                key: 'products',
                path: '',
                title: 'Productos',
                translateKey: 'nav.submenu.products',
                icon: 'products',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                subMenu: [
                    {
                        key: 'products.list',
                        path: `${APP_PREFIX_PATH}/product-list`,
                        title: 'Listado Productos',
                        translateKey: 'nav.submenu.listproducts',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    },{
                        key: 'products.create',
                        path: `${APP_PREFIX_PATH}/product`,
                        title: 'Crear Producto',
                        translateKey: 'nav.submenu.newproduct',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],                
                    }
                ],
            }
        ]

        
    }
    
]

export default navigationConfig
