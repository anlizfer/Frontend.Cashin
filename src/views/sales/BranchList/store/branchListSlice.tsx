import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetBranches,
    apiDeleteBranch,    
    apiCreateBranch,
} from '@/services/BranchService'
import type { TableQueries } from '@/@types/common'



type Branch = {
    id: string
    name: string 
    idCity:number
    idState:number
    idCompany: number 
    cityName: string 
}

type AddBranchesRequest = {
    id: string
    name: string 
    idCompany: number        
}

type MetadataSetting = {
    totalCount:number
}

type Meta=MetadataSetting;

export type GetBranchesResponse = {
    data: Branch[]
}

export type FilterQueries = {
    name: string
    Branch: string[]
    status: number[]    
    idCompany:number    
    Branchestatus:number
}

export type SalesBranchListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedBranch: string
    tableData: TableQueries
    filterData: FilterQueries
    BranchList: Branch[]
}

export type GetBranchesRequest = TableQueries & { filterData?: FilterQueries }


export const SLICE_NAME = 'salesBranchList'

export const getBranches = createAsyncThunk(
    SLICE_NAME + '/getBranches',
    async (data: GetBranchesRequest) => {        
        const response = await apiGetBranches<GetBranchesResponse,GetBranchesRequest>(data)   
        return response
    }
)


export const deleteBranch = async (data: { id: string | string[], idCompany:number }) => {
    const response = await apiDeleteBranch<
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

const initialState: SalesBranchListState = {
    loading: false,
    deleteConfirmation: false,
    selectedBranch: '',
    BranchList: [],    
    tableData: initialTableData,
    filterData: {
        name: '',
        Branch: [],
        status: [0, 1],        
        idCompany:0,        
        Branchestatus:0
    },
}

const BranchListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateBranchList: (state, action) => {
            state.BranchList = action.payload
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
        setSelectedBranch: (state, action) => {
            state.selectedBranch = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBranches.fulfilled, (state, action) => {                
                state.BranchList = action.payload.data
                state.tableData.total = action.payload.meta.totalCount
                state.loading = false
            })
            .addCase(getBranches.pending, (state) => {
                state.loading = true
            })            
    },
})

export const {
    updateBranchList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedBranch,    
} = BranchListSlice.actions

export default BranchListSlice.reducer
