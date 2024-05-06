import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetStores,
    apiDeleteStore,    
    apiCreateStore,
} from '@/services/StoreService'
import type { TableQueries } from '@/@types/common'



type Store = {
    id: string
    name: string 
    idCity:number
    idState:number
    idCompany: number 
    idBranch:string
    cityName: string 
}

type AddStoresRequest = {
    id: string
    name: string 
    idCompany: number        
}

type MetadataSetting = {
    totalCount:number
}

type Meta=MetadataSetting;

export type GetStoresResponse = {
    data: Store[]
}

export type FilterQueries = {
    name: string
    Store: string[]
    status: number[]    
    idCompany:number
    idBranch:number
    Storestatus:number
}

export type SalesStoreListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedStore: string
    tableData: TableQueries
    filterData: FilterQueries
    StoreList: Store[]
}

export type GetStoresRequest = TableQueries & { filterData?: FilterQueries }


export const SLICE_NAME = 'salesStoreList'

export const getStores = createAsyncThunk(
    SLICE_NAME + '/getStores',
    async (data: GetStoresRequest) => {        
        const response = await apiGetStores<GetStoresResponse,GetStoresRequest>(data)   
        return response
    }
)


export const deleteStore = async (data: { id: string | string[], idCompany:number }) => {
    const response = await apiDeleteStore<
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

const initialState: SalesStoreListState = {
    loading: false,
    deleteConfirmation: false,
    selectedStore: '',
    StoreList: [],    
    tableData: initialTableData,
    filterData: {
        name: '',
        idBranch:0,
        Store: [],
        status: [0, 1],        
        idCompany:0,
        Storestatus:0
    },
}

const StoreListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateStoreList: (state, action) => {
            state.StoreList = action.payload
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
        setSelectedStore: (state, action) => {
            state.selectedStore = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStores.fulfilled, (state, action) => {                
                state.StoreList = action.payload.data
                state.tableData.total = action.payload.meta.totalCount
                state.loading = false
            })
            .addCase(getStores.pending, (state) => {
                state.loading = true
            })            
    },
})

export const {
    updateStoreList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedStore,    
} = StoreListSlice.actions

export default StoreListSlice.reducer
