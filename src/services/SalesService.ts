import { API_SERVER, API_SERVER_AUTH_PREFIX,API_SERVER_PRODUCT_PREFIX } from '@/constants/route.constant'
import ApiService from './ApiService'
import ApiServiceFetch from './ApiServiceFetch';
import {    
    useAppSelector,
} from '../store'

export async function apiGetSalesDashboardData<
    T extends Record<string, unknown>
>() {
    return ApiService.fetchData<T>({
        url: '/sales/dashboard',
        method: 'post',
    })
}

// export async function apiGetSalesProducts<T, U extends Record<string, unknown>>(
//     data: U
// ) {
//     return ApiService.fetchData<T>({
//         url: '/sales/products',
//         method: 'post',
//         data,
//     })
// }

export async function apiGetSalesProducts<T, U extends Record<string, unknown>>(
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
        `${API_SERVER}${API_SERVER_PRODUCT_PREFIX}/products-by-filter`,
        {
            idCompany:idCompany,
            pageIndex:data.pageIndex,
            pageSize:data.pageSize,            
            name:query,            
        },
        'POST'
    );
}

export async function apiCreateSalesProduct<
    T,
    U extends Record<string, unknown>
>(data: U) {

    
    const idCompany:any=data.idCompany;
    const name:any=data.name;
    const description:any=data.description;
    const productCode:any=data.productCode;
    const brand:any=data.brand;
    const price:any=data.price;
    const sizeH:any=data.sizeH;
    const sizeW:any=data.sizeW;
    const sizeL:any=data.sizeL;
    const weight:any=data.weight;
    const category:any=data.category;
    const imgList:any[]=data.imgList;

    
    const formData = new FormData();    
    formData.append('idCompany', idCompany);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('productCode', productCode);            
    formData.append('price', price);    
    formData.append('brand', brand);
    formData.append('sizeH', sizeH);
    formData.append('sizeW', sizeW);
    formData.append('sizeL', sizeL);    
    formData.append('weight', weight);

    formData.append(`productCategory[0].idCategory`, category);

    debugger    
    for (let index = 0; index < imgList.length; index++) {
        const image = imgList[index];
        const file:File=image.file;
        formData.append(`gallery`, file);
    }

    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PRODUCT_PREFIX}/create-product`,
        formData,
        'POST'
    );
}


/*
public int? Id { get; set; }
public string? Name { get; set; }
public int? IdCompany { get; set; }
public string? Description { get; set; }
public string? ProductCode { get; set; }
public string? Brand { get; set; }        
public double? Price { get; set; }
public double? SizeH { get; set; }
public double? SizeW { get; set; }
public double? SizeL { get; set; }
public double? Weight { get; set; }
public int? IdProductParent { get; set; }
public int? Status { get; set; }
public ProductCategoryAddDtoRequest[]? ProductCategory {  get; set; }
public IFormFile[]? Gallery { get; set; }
*/


export async function apiGetCategories<T, U extends Record<string, unknown>>() {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_PRODUCT_PREFIX}/Categories`,
        {
            idCompany:1,
            status:1,
        },
        'GET'
    );
}

export async function apiDeleteSalesProducts<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/products/delete',
        method: 'delete',
        data,
    })
}

/*export async function apiGetSalesProduct<T, U extends Record<string, unknown>>(params: U) {
    return ApiService.fetchData<T>({
        url: '/sales/product',
        method: 'get',  
        params,
    })
}*/

export async function apiGetSalesProduct<T, U extends Record<string, unknown>>(params: U) {
    return ApiServiceFetch.fetchData<T>(
        `${API_SERVER}${API_SERVER_AUTH_PREFIX}/product/ProductsByFilter`,
        params,
        'post'
    );
}



export async function apiPutSalesProduct<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/sales/products/update',
        method: 'put',
        data,
    })
}


export async function apiGetSalesOrders<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/sales/orders',
        method: 'get',
        params,
    })
}

export async function apiDeleteSalesOrders<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesOrderDetails<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/sales/orders-details',
        method: 'get',
        params,
    })
}
