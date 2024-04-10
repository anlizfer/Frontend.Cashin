import { API_SERVER, API_SERVER_COMPANY_PREFIX, API_SERVER_PRODUCT_PREFIX } from '@/constants/route.constant'
import ApiServiceFetch from './ApiServiceFetch';

export async function apiGetCompanies<T, U extends Record<string, unknown>>(
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
        `${API_SERVER}${API_SERVER_COMPANY_PREFIX}/companies-by-filter`,
        {            
            pageIndex:data.pageIndex,
            pageSize:data.pageSize,            
            name:query,            
        },
        'POST'
    );
}

export async function apiCreateCompany<T, U extends Record<string, unknown>>(data: U) {    
    const idCompany:any=data.idCompany;
    const name:any=data.name;           
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_COMPANY_PREFIX}/create-company`,
        {
            idCompany:idCompany,
            name:name
        },
        'POST'
    );
}


export async function apiDeleteCompany<T, U extends Record<string, unknown>>(data: U) {    
    const idCompany:any=data.idCompany;
    const formData = new FormData();    
    formData.append('idCompany', idCompany);    
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_COMPANY_PREFIX}/delete-company/${data.id}`,
        formData,
        'DELETE'
    );
}

export async function apiGetCompany<T, U extends Record<string, unknown>>(params: U) {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_COMPANY_PREFIX}/companies-by-filter`,
        {
            idCompay:1,
            id:params.id,   
            pageIndex:1,
            pageSize:1,  
        },
        'POST'
    );
}


export async function apiPutCompany<T, U extends Record<string, unknown>>(data: U) {    
    const idCompany:any=data.idCompany;
    const name:any=data.name;    


    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PRODUCT_PREFIX}/update-company/${data.id}`,
        {
            idCompany:idCompany,
            name:name
        },
        'PUT'
    );
}
