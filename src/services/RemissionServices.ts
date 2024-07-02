import { API_SERVER, API_SERVER_REMISSION_PREFIX, API_SERVER_GENERAL_PREFIX, API_SERVER_PRODUCT_PREFIX, API_SERVER_BRANCH_PREFIX, API_SERVER_STORES_PREFIX } from '@/constants/route.constant'
import ApiServiceFetch from './ApiServiceFetch';

export async function apiGetRemissions<T, U extends Record<string, unknown>>(
    data: U
) {    
    let dataFilter:any=data.filterData;
    let query:any="";
    let idRemission:any=data.idRemission;
    
    if(data.query!=""){
        query=data.query;
    }else{
        if(dataFilter.name!=""){
            query=dataFilter.name;
        }
    }
    
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_REMISSION_PREFIX}/remissions-by-filter`,
        {            
            pageIndex:data.pageIndex,
            pageSize:data.pageSize,            
            name:query,            
        },
        'POST'
    );
}

export async function apiCreateRemission<T, U extends Record<string, unknown>>(data: U) {        
    
    const idPeopleContact:any=data.idPeopleContact;
    const IdPeople:any=data.idPeople;
    const idCompany:any=data.idCompany;
    const date:any=data.dateDelivery;
    const idBranch:any=data.idBranch;
    const idStore:any=data.idStore;
    const idDeliveryCompany:any=data.idDeliveryCompany;
    const shippingWithCollection:any=(data.shippingWithCollection)?1:0;
    const observation:any=(data.observation!=undefined)?data.observation:'';
    const lineProducts:any=data.lineProducts;
    let totalRemission=0;
    debugger

    const formData = new FormData();    
    formData.append('idPeopleContact', idPeopleContact);
    formData.append('idPeople', IdPeople);
    formData.append('idCompany', idCompany);
    formData.append('idDeliveryCompany', idDeliveryCompany);
    
    formData.append('date', date);
    formData.append('idBranch', idBranch);
    formData.append('idStore', idStore);
    formData.append('shippingWithCollection', shippingWithCollection);
    formData.append('observation', observation);
    
    /*       
    
    lineProducts:lineRemissionLine,
    total:totalRemission
    */

    /*
    formData.append(`productCategory[0].idCategory`, category);
    */

    let lineRemissionLine:any[]=[];
    lineProducts.forEach((element:any,indx:any) => {
        lineRemissionLine.push({            
            idProduct:element.idProductLine,
            refProduct:element.productCodeLine,
            valueProduct:element.priceProductLine,
            totalLine:element.totalLine,
            discount:element.discountProductLine,
            taxes:element.taxPriceProductLine,
            quantity:element.cantLine,
            idTaxes:element.idTaxes,
        });

        formData.append(`productCategory[${indx}].idProduct`, element.idProductLine);
        formData.append(`productCategory[${indx}].refProduct`, element.productCodeLine);
        formData.append(`productCategory[${indx}].valueProduct`, element.priceProductLine);
        formData.append(`productCategory[${indx}].totalLine`, element.totalLine);
        formData.append(`productCategory[${indx}].discount`, element.discountProductLine);
        formData.append(`productCategory[${indx}].taxes`, element.taxPriceProductLine);
        formData.append(`productCategory[${indx}].quantity`, element.cantLine);
        formData.append(`productCategory[${indx}].idTaxes`, element.idTaxes);

        totalRemission+=parseFloat(element.totalLine);
    });

    formData.append('total', totalRemission.toString());

    /*
    nameProductLine
    brutoProductLine
    */
    
      
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_REMISSION_PREFIX}/create-remission`,
        //formData
        
        {   
            idPeopleContact:idPeopleContact,
            idPeople:IdPeople,
            date:date,
            idBranch:idBranch,
            idStore:idStore,
            idDeliveryCompany:idDeliveryCompany,
            shippingWithCollection:shippingWithCollection,
            observation:observation,
            idCompany:idCompany,
            lineProducts:lineRemissionLine,
            total:totalRemission
        }
        
        ,
        'POST'
    );
}


export async function apiDeleteRemission<T, U extends Record<string, unknown>>(data: U) {    
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_REMISSION_PREFIX}/delete-remission/${data.id}`,
        {},
        'DELETE'
    );
}

export async function apiChangeStatusRemission<T, U extends Record<string, unknown>>(data: U) {  
    
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_REMISSION_PREFIX}/change-remission-status/${data.id}`,
        {
            idStatusRemission:data.idStatusRemission
        },
        'POST'
    );
}



export async function apiGetRemission<T, U extends Record<string, unknown>>(params: U) {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_REMISSION_PREFIX}/remissions-by-filter`,
        {            
            id:params.id,   
            pageIndex:1,
            pageSize:1,  
        },
        'POST'
    );
}



export async function apiPutRemission<T, U extends Record<string, unknown>>(data: U) {    
    const name:any=data.name;
    const idPersonType:any=data.idPersonType;
    const idLegalForm:any=data.idLegalForm;
    const idCity:any=data.idCity;
    const nameRepLegal:any=data.nameRepLegal;
    const nitRemission:any=data.nitRemission;
    const address:any=data.address;
    const email:any=data.email;
    const phone:any=data.phone;
    const neighborhood:any=data.neighborhood;
    debugger


    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_REMISSION_PREFIX}/update-Remission/${data.id}`,
        {
            name:name,
            idPersonType: idPersonType,
            idLegalForm: idLegalForm,
            idCity: idCity,
            nameRepLegal: nameRepLegal,
            nitRemission: nitRemission,
            address:address,
            email:email,
            phone:phone,
            neighborhood:neighborhood
        },
        'PUT'
    );    
}

export async function apiGetStatusRemission<T>() {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_REMISSION_PREFIX}/status-remission`,
        {},
        'GET'
    );
}


export async function apiGetBranchRemission<T, U extends Record<string, unknown>>(params: U) {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_BRANCH_PREFIX}/branches-by-filter`,
        {
            idCompany:params.idCompany             
        },
        'POST'
    );
}

export async function apiGetStoreRemission<T, U extends Record<string, unknown>>(params: U) {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_STORES_PREFIX}/stores-by-filter`,
        {
            idBranch:params.idBranch
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


export async function apiGetDeliveryCompanies<T>() {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_GENERAL_PREFIX}/delivery-companies`,
        {},
        'GET'
    );
}
