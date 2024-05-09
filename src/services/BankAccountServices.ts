import { API_SERVER, API_SERVER_BANK_ACCOUNT_PREFIX, API_SERVER_GENERAL_PREFIX } from '@/constants/route.constant'
import ApiServiceFetch from './ApiServiceFetch';

export async function apiGetBankAccounts<T, U extends Record<string, unknown>>(
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
        `${API_SERVER}${API_SERVER_BANK_ACCOUNT_PREFIX}/bank-accounts-by-filter`,
        {
            idCompany:idCompany,
            pageIndex:data.pageIndex,
            pageSize:data.pageSize,            
            name:query,            
        },
        'POST'
    );
}

export async function apiCreateBankAccount<T, U extends Record<string, unknown>>(data: U) {    
    const idCompany:any=data.idCompany;
    const name:any=data.name;
    const numberAccount:any=data.numberAccount;
    const idTypeBankAccount:any=data.idTypeBankAccount;
    const idBank:any=data.idTypeBankAccount;
    debugger
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_BANK_ACCOUNT_PREFIX}/create-bank-account`,
        {
            idCompany:idCompany,
            name:name,
            numberAccount:numberAccount,
            idBank:idBank,
            idTypeBankAccount:idTypeBankAccount
        },
        'POST'
    );
}


export async function apiDeleteBankAccount<T, U extends Record<string, unknown>>(data: U) {    
    const idCompany:any=data.idCompany;
    const formData = new FormData();    
    formData.append('idCompany', idCompany);    
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_BANK_ACCOUNT_PREFIX}/delete-bank-account/${data.id}`,
        formData,
        'DELETE'
    );
}

export async function apiGetBankAccount<T, U extends Record<string, unknown>>(params: U) {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_BANK_ACCOUNT_PREFIX}/bank-accounts-by-filter`,
        {
            idCompay:1,
            id:params.id,   
            pageIndex:1,
            pageSize:1,  
        },
        'POST'
    );
}


export async function apiPutBankAccount<T, U extends Record<string, unknown>>(data: U) {    
    const idCompany:any=data.idCompany;
    const name:any=data.name;
    const numberAccount:any=data.numberAccount;
    const idTypeBankAccount:any=data.idTypeBankAccount;
    const idBank:any=data.idTypeBankAccount;


    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_BANK_ACCOUNT_PREFIX}/update-bank-account/${data.id}`,
        {
            idCompany:idCompany,
            name:name,
            numberAccount:numberAccount,
            idBank:idBank,
            idTypeBankAccount:idTypeBankAccount
        },
        'PUT'
    );
}

export async function apiGetBanks<T>() {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_GENERAL_PREFIX}/banks`,
        {},
        'GET'
    );
}
