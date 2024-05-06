import { API_SERVER, API_SERVER_BRANCH_PREFIX } from '@/constants/route.constant'
import ApiServiceFetch from './ApiServiceFetch';

export async function apiGetBranches<T, U extends Record<string, unknown>>(
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
        `${API_SERVER}${API_SERVER_BRANCH_PREFIX}/branches-by-filter`,
        {
            idCompany:idCompany,
            pageIndex:data.pageIndex,
            pageSize:data.pageSize,            
            name:query,            
        },
        'POST'
    );
}

export async function apiCreateBranch<T, U extends Record<string, unknown>>(data: U) {    
    const idCompany:any=data.idCompany;
    const name:any=data.name;
    const idCity:any=data.idCity;
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_BRANCH_PREFIX}/create-branch`,
        {
            idCompany:idCompany,
            name:name,
            idCity:idCity
        },
        'POST'
    );
}


export async function apiDeleteBranch<T, U extends Record<string, unknown>>(data: U) {    
    const idCompany:any=data.idCompany;
    const formData = new FormData();    
    formData.append('idCompany', idCompany);    
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_BRANCH_PREFIX}/delete-branch/${data.id}`,
        formData,
        'DELETE'
    );
}

export async function apiGetBranch<T, U extends Record<string, unknown>>(params: U) {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_BRANCH_PREFIX}/branches-by-filter`,
        {
            idCompay:1,
            id:params.id,   
            pageIndex:1,
            pageSize:1,  
        },
        'POST'
    );
}


export async function apiPutBranch<T, U extends Record<string, unknown>>(data: U) {    
    const idCompany:any=data.idCompany;
    const name:any=data.name;  
    const idCity:any=data.idCity;  


    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_BRANCH_PREFIX}/update-branch/${data.id}`,
        {
            idCompany:idCompany,
            name:name,
            idCity:idCity
        },
        'PUT'
    );
}
