import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetInventories,
    apiDeleteInventory,    
    apiCreateInventory,
} from '@/services/InventoryService'
import type { TableQueries } from '@/@types/common'



type Inventory = {
    id: string
    name: string 
    idCompany: number    
}

type AddInventoriesRequest = {
    id: string
    name: string 
    idCompany: number        
}

type MetadataSetting = {
    totalCount:number
}

type Meta=MetadataSetting;

export type GetInventoriesResponse = {
    data: Inventory[]
}

export type FilterQueries = {
    name: string
    inventory: string[]
    status: number[]    
    idCompany:number
    Inventoriestatus:number
}

export type SalesInventoryListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedInventory: string
    tableData: TableQueries
    filterData: FilterQueries
    InventoryList: Inventory[]
}

export type GetInventoriesRequest = TableQueries & { filterData?: FilterQueries }


export const SLICE_NAME = 'salesInventoryList'

export const getInventories = createAsyncThunk(
    SLICE_NAME + '/getInventories',
    async (data: GetInventoriesRequest) => {        
        const response = await apiGetInventories<GetInventoriesResponse,GetInventoriesRequest>(data)   
        return response
    }
)


export const deleteInventory = async (data: { id: string | string[], idCompany:number }) => {
    const response = await apiDeleteInventory<
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

const initialState: SalesInventoryListState = {
    loading: false,
    deleteConfirmation: false,
    selectedInventory: '',
    InventoryList: [],    
    tableData: initialTableData,
    filterData: {
        name: '',
        inventory: [],
        status: [0, 1],        
        idCompany:0,
        Inventoriestatus:0
    },
}

const InventoryListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateInventoryList: (state, action) => {
            state.InventoryList = action.payload
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
        setSelectedInventory: (state, action) => {
            state.selectedInventory = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getInventories.fulfilled, (state, action) => {                
                state.InventoryList = action.payload.data
                state.tableData.total = action.payload.meta.totalCount
                state.loading = false
            })
            .addCase(getInventories.pending, (state) => {
                state.loading = true
            })            
    },
})

export const {
    updateInventoryList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedInventory,    
} = InventoryListSlice.actions

export default InventoryListSlice.reducer
