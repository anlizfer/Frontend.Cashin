import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSalesProducts,
    apiDeleteSalesProducts,
    apiGetCategories,
    apiCreateSalesProduct,
} from '@/services/SalesService'
import type { TableQueries } from '@/@types/common'
type Category = {
    id: string
    name: string 
    idCompany: number    
}


type Product = {
    id: string
    name: string
    description: string
    productCode: string
    brand: string
    img: string        
    sizeL: number
    sizeM: number
    sizeH: number
    weight: number
    price: number
    suggestedPrice: number
    stock: number
    status: number
    idCompany: number
    productCategory:ProductCategory[]
}

type AddSalesProductsRequest = {
    id?: string
    name: string
    description: string
    productCode: string
    brand: string
    img: string        
    sizeL: number
    sizeM: number
    sizeH: number
    weight: number
    price: number
    stock: number
    status: number
    idCompany: number 
}

type ProductCategory={
    id: number,
    name: string
    idProduct:number
    idCategory: number
}


type Products = Product[]

type MetadataSetting = {
    totalCount:number
}

type Meta=MetadataSetting;

type GetSalesProductsResponse = {
    data: Products    
}


export type GetCategoriesResponse = {
    data: Category,    
}

export type FilterQueries = {
    name: string
    category: string[]
    status: number[]
    productStatus: number
    idCompany:number
}

export type SalesProductListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedProduct: string
    tableData: TableQueries
    filterData: FilterQueries
    productList: Product[]
}

export type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }
type GetCategoriesRequest={
    IdCompany:number
}

export const SLICE_NAME = 'salesProductList'

export const getProducts = createAsyncThunk(
    SLICE_NAME + '/getProducts',
    async (data: GetSalesProductsRequest) => {        
        const response = await apiGetSalesProducts<GetSalesProductsResponse,GetSalesProductsRequest>(data)   
        return response
    }
)




export const getCategories = async () => {
    const response = await apiGetCategories<GetCategoriesResponse,GetCategoriesRequest>();
    return response.data
}


export const deleteProduct = async (data: { id: string | string[], idCompany:number }) => {
    const response = await apiDeleteSalesProducts<
        boolean,
        { id: string | string[], idCompany:number }
    >(data)
    return response.data
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    idCompany:0,
    sort: {
        order: '',
        key: '',
    },
}

const initialState: SalesProductListState = {
    loading: false,
    deleteConfirmation: false,
    selectedProduct: '',
    productList: [],    
    tableData: initialTableData,
    filterData: {
        name: '',
        category: [],
        status: [0, 1],
        productStatus: 0,
        idCompany:0
    },
}

const productListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            state.productList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {                
                state.productList = action.payload.data
                state.tableData.total = action.payload.meta.totalCount
                state.loading = false
            })
            .addCase(getProducts.pending, (state) => {
                state.loading = true
            })            
    },
})

export const {
    updateProductList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedProduct,    
} = productListSlice.actions

export default productListSlice.reducer
