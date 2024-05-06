import { API_SERVER, API_SERVER_STORES_PREFIX } from '@/constants/route.constant'
import ApiServiceFetch from './ApiServiceFetch';

export async function apiGetStores<T, U extends Record<string, unknown>>(
    data: U
) {    
    let dataFilter:any=data.filterData;
    let query:any="";
    let idBranch:any=data.idBranch;
    
    if(data.query!=""){
        query=data.query;
    }else{
        if(dataFilter.name!=""){
            query=dataFilter.name;
        }
    }
    
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_STORES_PREFIX}/stores-by-filter`,
        {
            idBranch:idBranch,
            pageIndex:data.pageIndex,
            pageSize:data.pageSize,            
            name:query,            
        },
        'POST'
    );
}

export async function apiCreateStore<T, U extends Record<string, unknown>>(data: U) {    
    const idBranch:any=data.idBranch;
    const name:any=data.name;    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_STORES_PREFIX}/create-store`,
        {
            idBranch:idBranch,
            name:name            
        },
        'POST'
    );
}


export async function apiDeleteStore<T, U extends Record<string, unknown>>(data: U) {    
    const idBranch:any=data.idBranch;
    const formData = new FormData();    
    formData.append('idBranch', idBranch);    
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_STORES_PREFIX}/delete-store/${data.id}`,
        formData,
        'DELETE'
    );
}

export async function apiGetStore<T, U extends Record<string, unknown>>(params: U) {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_STORES_PREFIX}/stores-by-filter`,
        {
            idBranch:params.idBranch,
            id:params.id,   
            pageIndex:1,
            pageSize:1,  
        },
        'POST'
    );
}


export async function apiPutStore<T, U extends Record<string, unknown>>(data: U) {    
    const idBranch:any=data.idBranch;
    const name:any=data.name;  
    const idCity:any=data.idCity;  


    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_STORES_PREFIX}/update-store/${data.id}`,
        {
            idBranch:idBranch,
            name:name,
            idCity:idCity
        },
        'PUT'
    );
}
