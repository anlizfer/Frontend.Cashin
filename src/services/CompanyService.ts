import { API_SERVER, API_SERVER_COMPANY_PREFIX, API_SERVER_GENERAL_PREFIX, API_SERVER_PRODUCT_PREFIX } from '@/constants/route.constant'
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
    const name:any=data.name;
    const idPersonType:any=data.idPersonType;
    const idLegalForm:any=data.idLegalForm;
    const idCity:any=data.idCity;
    const nameRepLegal:any=data.nameRepLegal;
    const nitCompany:any=data.nitCompany;
    const address:any=data.address;
    const email:any=data.email;
    const phone:any=data.phone;
    const neighborhood:any=data.neighborhood;
    debugger
      
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_COMPANY_PREFIX}/create-company`,
        {            
            name:name,
            idPersonType: idPersonType,
            idLegalForm: idLegalForm,
            idCity: idCity,
            nameRepLegal: nameRepLegal,
            nitCompany: nitCompany,
            address:address,
            email:email,
            phone:phone,
            neighborhood:neighborhood

        },
        'POST'
    );
}


export async function apiDeleteCompany<T, U extends Record<string, unknown>>(data: U) {    

    debugger
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_COMPANY_PREFIX}/delete-company/${data.id}`,
        {},
        'DELETE'
    );
}

export async function apiGetCompany<T, U extends Record<string, unknown>>(params: U) {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_COMPANY_PREFIX}/companies-by-filter`,
        {            
            id:params.id,   
            pageIndex:1,
            pageSize:1,  
        },
        'POST'
    );
}



export async function apiPutCompany<T, U extends Record<string, unknown>>(data: U) {    
    const name:any=data.name;
    const idPersonType:any=data.idPersonType;
    const idLegalForm:any=data.idLegalForm;
    const idCity:any=data.idCity;
    const nameRepLegal:any=data.nameRepLegal;
    const nitCompany:any=data.nitCompany;
    const address:any=data.address;
    const email:any=data.email;
    const phone:any=data.phone;
    const neighborhood:any=data.neighborhood;
    debugger


    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_COMPANY_PREFIX}/update-company/${data.id}`,
        {
            name:name,
            idPersonType: idPersonType,
            idLegalForm: idLegalForm,
            idCity: idCity,
            nameRepLegal: nameRepLegal,
            nitCompany: nitCompany,
            address:address,
            email:email,
            phone:phone,
            neighborhood:neighborhood
        },
        'PUT'
    );
}

export async function apiGetPersonType<T>() {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_GENERAL_PREFIX}/person-type`,
        {},
        'GET'
    );
}


export async function apiGetLegalForm<T>() {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_GENERAL_PREFIX}/legal-form`,
        {},
        'GET'
    );
}


export async function apiGetStateForm<T>(id:any) {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_GENERAL_PREFIX}/states/${id}`,
        {},
        'GET'
    );
}

export async function apiGetCitiesForm<T>(id:any) {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_GENERAL_PREFIX}/cities/${id}`,
        {},
        'GET'
    );
}