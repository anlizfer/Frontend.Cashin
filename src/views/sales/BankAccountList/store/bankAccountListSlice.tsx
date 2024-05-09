import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetBankAccounts,
    apiDeleteBankAccount,    
    apiCreateBankAccount,
} from '@/services/BankAccountServices'
import type { TableQueries } from '@/@types/common'



type BankAccount = {
    id: string
    name: string 
    idCity:number
    idState:number
    idCompany: number 
    cityName: string 
}

type AddBankAccountsRequest = {
    id: string
    name: string 
    idCompany: number        
}

type MetadataSetting = {
    totalCount:number
}

type Meta=MetadataSetting;

export type GetBankAccountsResponse = {
    data: BankAccount[]
}

export type FilterQueries = {
    name: string
    BankAccount: string[]
    status: number[]    
    idCompany:number    
    BankAccountstatus:number
}

export type SalesBankAccountListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedBankAccount: string
    tableData: TableQueries
    filterData: FilterQueries
    BankAccountList: BankAccount[]
}

export type GetBankAccountsRequest = TableQueries & { filterData?: FilterQueries }


export const SLICE_NAME = 'salesBankAccountList'

export const getBankAccounts = createAsyncThunk(
    SLICE_NAME + '/getBankAccounts',
    async (data: GetBankAccountsRequest) => {        
        const response = await apiGetBankAccounts<GetBankAccountsResponse,GetBankAccountsRequest>(data)   
        return response
    }
)


export const deleteBankAccount = async (data: { id: string | string[], idCompany:number }) => {
    const response = await apiDeleteBankAccount<
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

const initialState: SalesBankAccountListState = {
    loading: false,
    deleteConfirmation: false,
    selectedBankAccount: '',
    BankAccountList: [],    
    tableData: initialTableData,
    filterData: {
        name: '',
        BankAccount: [],
        status: [0, 1],        
        idCompany:0,        
        BankAccountstatus:0
    },
}

const BankAccountListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateBankAccountList: (state, action) => {
            state.BankAccountList = action.payload
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
        setSelectedBankAccount: (state, action) => {
            state.selectedBankAccount = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBankAccounts.fulfilled, (state, action) => {                
                state.BankAccountList = action.payload.data
                state.tableData.total = action.payload.meta.totalCount
                state.loading = false
            })
            .addCase(getBankAccounts.pending, (state) => {
                state.loading = true
            })            
    },
})

export const {
    updateBankAccountList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedBankAccount,    
} = BankAccountListSlice.actions

export default BankAccountListSlice.reducer
