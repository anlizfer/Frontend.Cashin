import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCategories,
    apiDeleteCategory,    
    apiCreateCategory,
} from '@/services/CategoryService'
import type { TableQueries } from '@/@types/common'



type Category = {
    id: string
    name: string 
    idCompany: number    
}

type AddCategoriesRequest = {
    id: string
    name: string 
    idCompany: number        
}

type MetadataSetting = {
    totalCount:number
}

type Meta=MetadataSetting;

export type GetCategoriesResponse = {
    data: Category[]
}

export type FilterQueries = {
    name: string
    category: string[]
    status: number[]    
    idCompany:number
    Categoriestatus:number
}

export type SalesCategoryListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedCategory: string
    tableData: TableQueries
    filterData: FilterQueries
    CategoryList: Category[]
}

export type GetCategoriesRequest = TableQueries & { filterData?: FilterQueries }


export const SLICE_NAME = 'salesCategoryList'

export const getCategories = createAsyncThunk(
    SLICE_NAME + '/getCategories',
    async (data: GetCategoriesRequest) => {        
        const response = await apiGetCategories<GetCategoriesResponse,GetCategoriesRequest>(data)   
        return response
    }
)


export const deleteCategory = async (data: { id: string | string[], idCompany:number }) => {
    const response = await apiDeleteCategory<
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

const initialState: SalesCategoryListState = {
    loading: false,
    deleteConfirmation: false,
    selectedCategory: '',
    CategoryList: [],    
    tableData: initialTableData,
    filterData: {
        name: '',
        category: [],
        status: [0, 1],        
        idCompany:0,
        Categoriestatus:0
    },
}

const CategoryListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateCategoryList: (state, action) => {
            state.CategoryList = action.payload
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
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state, action) => {                
                state.CategoryList = action.payload.data
                state.tableData.total = action.payload.meta.totalCount
                state.loading = false
            })
            .addCase(getCategories.pending, (state) => {
                state.loading = true
            })            
    },
})

export const {
    updateCategoryList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedCategory,    
} = CategoryListSlice.actions

export default CategoryListSlice.reducer
