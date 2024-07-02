import { API_SERVER, API_SERVER_PRODUCT_PREFIX } from '@/constants/route.constant'
import ApiServiceFetch from './ApiServiceFetch';

export async function apiGetInventories<T, U extends Record<string, unknown>>(
    data: U
) {    
    let dataFilter:any=data.filterData;
    let query:any="";
    let idCompany:any=data.idCompany;
    
    if(data.query!=""){
        query=data.query;
    }else{
        if(dataFilter.name!=""){
            query=dataFilter.name;
        }
    }
    
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PRODUCT_PREFIX}/inventories-by-filter`,
        {
            idCompany:idCompany,
            pageIndex:data.pageIndex,
            pageSize:data.pageSize,            
            name:query,            
        },
        'POST'
    );
}


export async function apiGetInventoriesHistories<T, U extends Record<string, unknown>>(
    data: U
) {    
    let dataFilter:any=data.filterData;
    let query:any="";
    let idCompany:any=data.idCompany;
    let idStore:any=data.idStore;
    let idProducto:any=data.idProduct;
    
    
    if(data.query!=""){
        query=data.query;
    }else{
        if(dataFilter.name!=""){
            query=dataFilter.name;
        }
    }
    
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PRODUCT_PREFIX}/inventories-histories-by-filter`,
        {
            idStore:idStore,
            idProducto:idProducto,
            idCompany:idCompany,
            pageIndex:data.pageIndex,
            pageSize:data.pageSize,            
            name:query,            
        },
        'POST'
    );
}



export async function apiCreateInventory<T, U extends Record<string, unknown>>(data: U) {    
    const idCompany:any=data.idCompany;
    const idBranch:any=data.idBranch;
    const idStore:any=data.idStore;
    const idProduct:any=data.idProduct;
    const transactionType:any=data.transactionType;
    const cant:any=data.cant;
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PRODUCT_PREFIX}/create-inventory`,
        {
            idCompany:idCompany,
            idBranch:idBranch,
            idStore:idStore,
            idProduct:idProduct,
            transactionType:transactionType,
            cant:cant
        },
        'POST'
    );
}


export async function apiDeleteInventory<T, U extends Record<string, unknown>>(data: U) {    
    const idCompany:any=data.idCompany;
    const formData = new FormData();    
    formData.append('idCompany', idCompany);    
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PRODUCT_PREFIX}/delete-inventory/${data.id}`,
        formData,
        'DELETE'
    );
}

export async function apiGetInventory<T, U extends Record<string, unknown>>(params: U) {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PRODUCT_PREFIX}/inventories-by-filter`,
        {
            idCompay:1,
            id:params.id,   
            pageIndex:1,
            pageSize:1,  
        },
        'POST'
    );
}


export async function apiPutInventory<T, U extends Record<string, unknown>>(data: U) {    
    const idCompany:any=data.idCompany;
    const name:any=data.name;    


    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PRODUCT_PREFIX}/update-inventory/${data.id}`,
        {
            idCompany:idCompany,
            name:name
        },
        'PUT'
    );
}
