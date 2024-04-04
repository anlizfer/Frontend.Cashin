import { API_SERVER, API_SERVER_AUTH_PREFIX,API_SERVER_PRODUCT_PREFIX } from '@/constants/route.constant'
import ApiService from './ApiService'
import ApiServiceFetch from './ApiServiceFetch';
import {    
    useAppSelector,
} from '../store'

export async function apiGetSalesDashboardData<
    T extends Record<string, unknown>
>() {
    return ApiService.fetchData<T>({
        url: '/sales/dashboard',
        method: 'post',
    })
}

// export async function apiGetSalesProducts<T, U extends Record<string, unknown>>(
//     data: U
// ) {
//     return ApiService.fetchData<T>({
//         url: '/sales/products',
//         method: 'post',
//         data,
//     })
// }

export async function apiGetSalesProducts<T, U extends Record<string, unknown>>(
    data: U
) {    
    let dataFilter:any=data.filterData;
    let query:any="";
    if(data.query!=""){
        query=data.query;
    }else{
        if(dataFilter.name!=""){
            query=dataFilter.name;
        }
    }

    
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PRODUCT_PREFIX}/ProductsByFilter`,
        {
            idCompany:1,                        
            pageIndex:data.pageIndex,
            pageSize:data.pageSize,            
            name:query,            
        },
        'POST'
    );
}

export async function apiGetCategories<T, U extends Record<string, unknown>>() {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PRODUCT_PREFIX}/Categories`,
        {
            idCompany:1,
            status:1,
        },
        'GET'
    );
}

export async function apiDeleteSalesProducts<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/products/delete',
        method: 'delete',
        data,
    })
}

/*export async function apiGetSalesProduct<T, U extends Record<string, unknown>>(params: U) {
    return ApiService.fetchData<T>({
        url: '/sales/product',
        method: 'get',  
        params,
    })
}*/

export async function apiGetSalesProduct<T, U extends Record<string, unknown>>(params: U) {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_AUTH_PREFIX}/product/ProductsByFilter`,
        params,
        'post'
    );
}



export async function apiPutSalesProduct<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/sales/products/update',
        method: 'put',
        data,
    })
}

export async function apiCreateSalesProduct<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/products/create',
        method: 'post',
        data,
    })
}

export async function apiGetSalesOrders<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/sales/orders',
        method: 'get',
        params,
    })
}

export async function apiDeleteSalesOrders<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesOrderDetails<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/sales/orders-details',
        method: 'get',
        params,
    })
}
