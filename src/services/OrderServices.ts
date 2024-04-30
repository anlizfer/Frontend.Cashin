import { API_SERVER, API_SERVER_ORDER_PREFIX, API_SERVER_GENERAL_PREFIX, API_SERVER_PRODUCT_PREFIX, API_SERVER_BRANCH_PREFIX, API_SERVER_STORES_PREFIX } from '@/constants/route.constant'
import ApiServiceFetch from './ApiServiceFetch';

export async function apiGetOrders<T, U extends Record<string, unknown>>(
    data: U
) {    
    let dataFilter:any=data.filterData;
    let query:any="";
    let idOrder:any=data.idOrder;
    
    if(data.query!=""){
        query=data.query;
    }else{
        if(dataFilter.name!=""){
            query=dataFilter.name;
        }
    }
    
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_ORDER_PREFIX}/Orders-by-filter`,
        {            
            pageIndex:data.pageIndex,
            pageSize:data.pageSize,            
            name:query,            
        },
        'POST'
    );
}

export async function apiCreateOrder<T, U extends Record<string, unknown>>(data: U) {        
    
    const idPersonContact:any=data.idPersonContact;
    const idPerson:any=data.idPerson;
    const date:any=data.date;
    const idBranch:any=data.idBranch;
    const idStore:any=data.idStore;
    const shippingWithCollection:any=data.shippingWithCollection;
    const observation:any=data.observation;
    
      
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_ORDER_PREFIX}/create-Order`,
        {   

        },
        'POST'
    );
}


export async function apiDeleteOrder<T, U extends Record<string, unknown>>(data: U) {    

    debugger
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_ORDER_PREFIX}/delete-order/${data.id}`,
        {},
        'DELETE'
    );
}

export async function apiGetOrder<T, U extends Record<string, unknown>>(params: U) {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_ORDER_PREFIX}/orders-by-filter`,
        {            
            id:params.id,   
            pageIndex:1,
            pageSize:1,  
        },
        'POST'
    );
}



export async function apiPutOrder<T, U extends Record<string, unknown>>(data: U) {    
    const name:any=data.name;
    const idPersonType:any=data.idPersonType;
    const idLegalForm:any=data.idLegalForm;
    const idCity:any=data.idCity;
    const nameRepLegal:any=data.nameRepLegal;
    const nitOrder:any=data.nitOrder;
    const address:any=data.address;
    const email:any=data.email;
    const phone:any=data.phone;
    const neighborhood:any=data.neighborhood;
    debugger


    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_ORDER_PREFIX}/update-Order/${data.id}`,
        {
            name:name,
            idPersonType: idPersonType,
            idLegalForm: idLegalForm,
            idCity: idCity,
            nameRepLegal: nameRepLegal,
            nitOrder: nitOrder,
            address:address,
            email:email,
            phone:phone,
            neighborhood:neighborhood
        },
        'PUT'
    );    
}

export async function apiGetStatusOrder<T>() {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_ORDER_PREFIX}/status-order`,
        {},
        'GET'
    );
}


export async function apiGetBranchOrder<T, U extends Record<string, unknown>>(params: U) {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_BRANCH_PREFIX}/branches-by-filter`,
        {
            idCompany:params.idCompany,
            pageIndex:1,
            pageSize:1, 
        },
        'POST'
    );
}

export async function apiGetStoreOrder<T, U extends Record<string, unknown>>(params: U) {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_STORES_PREFIX}/stores-by-filter`,
        {
            idBranch:params.idBranch,
            pageIndex:1,
            pageSize:1, 
        },
        'POST'
    );
}

export async function apiGetTaxes<T>() {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_GENERAL_PREFIX}/taxes`,
        {},
        'GET'
    );
}

