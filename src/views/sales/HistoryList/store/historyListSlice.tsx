import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetInventoriesHistories    
} from '@/services/InventoryService'
import type { TableQueries } from '@/@types/common'



type History = {
    id: string
    name: string 
    idCompany: number    
    productName:string
    productCode:string
    branchName:string
    codeOrder:String
    idOrder:number
    storeName:string
    idProduct:number
    idStore:number
}

type AddHistoriesRequest = {
    id: string
    name: string 
    idCompany: number     
    idProduct:number  
    idStore:number     
}

type MetadataSetting = {
    totalCount:number
}

type Meta=MetadataSetting;

export type GetHistoriesResponse = {
    data: History[]
}

export type FilterQueries = {
    name: string
    history: string[]
    status: number[]    
    idCompany:number
    idProduct:number
    idStore:number
    Historiestatus:number
}

export type SalesHistoryListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedHistory: string
    tableData: TableQueries
    filterData: FilterQueries
    HistoryList: History[]
}

export type GetHistoriesRequest = TableQueries & { filterData?: FilterQueries }


export const SLICE_NAME = 'salesHistoryList'

export const getHistories = createAsyncThunk(
    SLICE_NAME + '/getHistories',
    async (data: GetHistoriesRequest) => {        
        const response = await apiGetInventoriesHistories<GetHistoriesResponse,GetHistoriesRequest>(data)   
        return response
    }
)




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

const initialState: SalesHistoryListState = {
    loading: false,
    deleteConfirmation: false,
    selectedHistory: '',
    HistoryList: [],    
    tableData: initialTableData,
    filterData: {
        name: '',
        history: [],
        status: [0, 1],        
        idCompany:0,
        Historiestatus:0
    },
}

const HistoryListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateHistoryList: (state, action) => {
            state.HistoryList = action.payload
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
        setSelectedHistory: (state, action) => {
            state.selectedHistory = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHistories.fulfilled, (state, action) => {                
                state.HistoryList = action.payload.data
                state.tableData.total = action.payload.meta.totalCount
                state.loading = false
            })
            .addCase(getHistories.pending, (state) => {
                state.loading = true
            })            
    },
})

export const {
    updateHistoryList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedHistory,    
} = HistoryListSlice.actions

export default HistoryListSlice.reducer
