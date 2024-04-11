import { API_SERVER, API_SERVER_GENERAL_PREFIX, API_SERVER_PRODUCT_PREFIX,API_SERVER_PEOPLE_PREFIX } from '@/constants/route.constant'
import ApiServiceFetch from './ApiServiceFetch';

export async function apiGetPeoples<T, U extends Record<string, unknown>>(
    data: U
) {    
    let dataFilter:any=data.filterData;
    let query:any="";
    let idPeople:any=data.idPeople;
    
    if(data.query!=""){
        query=data.query;
    }else{
        if(dataFilter.name!=""){
            query=dataFilter.name;
        }
    }
    
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PEOPLE_PREFIX}/peoples-by-filter`,
        {            
            pageIndex:data.pageIndex,
            pageSize:data.pageSize,            
            name:query,            
        },
        'POST'
    );
}

export async function apiCreatePeople<T, U extends Record<string, unknown>>(data: U) {        
    const name:any=data.name;
    const lastName:any=data.lastName;
    const idPersonType:any=data.idPersonType;
    const idLegalForm:any=data.idLegalForm;
    const idDocumentType:any=data.idDocumentType;
    const idDocument:any=data.idDocument;
    const idCompany:any=data.idCompany;
    const idCity:any=data.idCity;
    const address:any=data.address;
    const email:any=data.email;
    const phone:any=data.phone;
    const neighborhood:any=data.neighborhood;
    debugger
      
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PEOPLE_PREFIX}/create-people`,
        {            
            name:name,
            lastName: lastName,
            idPersonType: idPersonType,
            idTypePeople:2,
            idLegalForm: idLegalForm,
            idDocumentType: idDocumentType,
            idDocument: idDocument,
            idCompany:idCompany,

            idCity: idCity,
            address:address,
            email:email,
            phone:phone,
            neighborhood:neighborhood

        },
        'POST'
    );
}


export async function apiDeletePeople<T, U extends Record<string, unknown>>(data: U) {    

    debugger
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PEOPLE_PREFIX}/delete-people/${data.id}`,
        {},
        'DELETE'
    );
}

export async function apiGetPeople<T, U extends Record<string, unknown>>(params: U) {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PEOPLE_PREFIX}/peoples-by-filter`,
        {            
            id:params.id,   
            pageIndex:1,
            pageSize:1,  
        },
        'POST'
    );
}



export async function apiPutPeople<T, U extends Record<string, unknown>>(data: U) {    
    const name:any=data.name;
    const lastName:any=data.lastName;
    const idPersonType:any=data.idPersonType;
    const idLegalForm:any=data.idLegalForm;
    const idDocumentType:any=data.idDocumentType;
    const idDocument:any=data.idDocument;
    const idCompany:any=data.idCompany;
    const idCity:any=data.idCity;
    const address:any=data.address;
    const email:any=data.email;
    const phone:any=data.phone;
    const neighborhood:any=data.neighborhood;
    debugger


    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PEOPLE_PREFIX}/update-people/${data.id}`,
        {
            name:name,
            lastName: lastName,
            idPersonType: idPersonType,
            idTypePeople:2,
            idLegalForm: idLegalForm,
            idDocumentType: idDocumentType,
            idDocument: idDocument,
            idCompany:idCompany,                        
            idCity: idCity,
            address:address,
            email:email,
            phone:phone,
            neighborhood:neighborhood
        },
        'PUT'
    );
}

