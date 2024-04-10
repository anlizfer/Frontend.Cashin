import { API_SERVER, API_SERVER_PRODUCT_PREFIX } from '@/constants/route.constant'
import ApiServiceFetch from './ApiServiceFetch';

export async function apiGetCategories<T, U extends Record<string, unknown>>(
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
        `${API_SERVER}${API_SERVER_PRODUCT_PREFIX}/categories-by-filter`,
        {
            idCompany:idCompany,
            pageIndex:data.pageIndex,
            pageSize:data.pageSize,            
            name:query,            
        },
        'POST'
    );
}

export async function apiCreateCategory<T, U extends Record<string, unknown>>(data: U) {    
    const idCompany:any=data.idCompany;
    const name:any=data.name;           
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PRODUCT_PREFIX}/create-category`,
        {
            idCompany:idCompany,
            name:name
        },
        'POST'
    );
}


export async function apiDeleteCategory<T, U extends Record<string, unknown>>(data: U) {    
    const idCompany:any=data.idCompany;
    const formData = new FormData();    
    formData.append('idCompany', idCompany);    
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PRODUCT_PREFIX}/delete-category/${data.id}`,
        formData,
        'DELETE'
    );
}

export async function apiGetCategory<T, U extends Record<string, unknown>>(params: U) {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PRODUCT_PREFIX}/categories-by-filter`,
        {
            idCompay:1,
            id:params.id,   
            pageIndex:1,
            pageSize:1,  
        },
        'POST'
    );
}


export async function apiPutCategory<T, U extends Record<string, unknown>>(data: U) {    
    const idCompany:any=data.idCompany;
    const name:any=data.name;    


    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PRODUCT_PREFIX}/update-category/${data.id}`,
        {
            idCompany:idCompany,
            name:name
        },
        'PUT'
    );
}
