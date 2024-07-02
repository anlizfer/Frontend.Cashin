import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetRemissions,
    apiDeleteRemission,    
    apiCreateRemission,
    apiChangeStatusRemission,    
} from '@/services/RemissionServices'
import type { TableQueries } from '@/@types/common'



type Remission = {
    id: string
    name: string 
    idPersonType: number
    idLegalForm: number
    idCity: number    
    nameRepLegal: string 
    nitRemission: string     
    neighborhood:string
    idState:number
    addres:string    
    statusRemission:string
    dateDelivery:string
}

type AddRemissionsRequest = {
    id: string
    name: string 
    idPersonType: number
    idLegalForm: number
    idCity: number    
    nameRepLegal: string 
    nitRemission: string
    neighborhood:string
    idState:number
    addres:string    
}

type MetadataSetting = {
    totalCount:number
}

type Meta=MetadataSetting;

export type GetRemissionsResponse = {
    data: Remission[]
}

export type GetPersonTypeResponse={
    id: string
    name: string 
}

export type GetStatusRemissionResponse={
    id: string
    name: string 
}

export type FilterQueries = {
    name: string    
    status: number[]    
    idRemission:number    
    idStatusRemission:number
}

export type SalesRemissionListState = {
    loading: boolean
    deleteConfirmation: boolean
    statusConfirmation: boolean
    statusRemissionData:any[]
    selectedRemission: string
    tableData: TableQueries
    filterData: FilterQueries
    RemissionList: Remission[]
}

export type GetRemissionsRequest = TableQueries & { filterData?: FilterQueries }


export const SLICE_NAME = 'salesRemissionList'

export const getRemissions = createAsyncThunk(
    SLICE_NAME + '/getRemissions',
    async (data: GetRemissionsRequest) => {        
        const response = await apiGetRemissions<GetRemissionsResponse,GetRemissionsRequest>(data)   
        return response
    }
)


// export const getPersonType = async () => {
//     const response = await apiGetPersonType<GetPersonTypeResponse>();
//     return response.data
// }

export const deleteRemission = async (data: { id: string | string[]}) => {
    const response = await apiDeleteRemission<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data
}



export const changeStatusRemission = async (data: { id: string, idStatusRemission:string}) => {
    const response = await apiChangeStatusRemission<
        boolean,
        { 
            id: string
            idStatusRemission:string
        }
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

const initialState: SalesRemissionListState = {
    loading: false,
    deleteConfirmation: false,
    statusConfirmation:false,
    statusRemissionData:[],
    selectedRemission: '',
    RemissionList: [],    
    tableData: initialTableData,
    filterData: {
        name: '',        
        status: [0, 1],        
        idRemission:0,
        idStatusRemission:0
    },
}

const RemissionListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateRemissionList: (state, action) => {
            state.RemissionList = action.payload
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
        toggleStatusConfirmation: (state, action) => {
            state.statusConfirmation = action.payload
        },
        setStatusRemissionData:(state, action)=>{
            state.statusRemissionData = action.payload
        },
        setSelectedRemission: (state, action) => {
            state.selectedRemission = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRemissions.fulfilled, (state, action) => {                
                state.RemissionList = action.payload.data
                state.tableData.total = action.payload.meta.totalCount
                state.loading = false
            })
            .addCase(getRemissions.pending, (state) => {
                state.loading = true
            })            
    },
})

export const {
    updateRemissionList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    toggleStatusConfirmation,
    setStatusRemissionData,
    setSelectedRemission,    
} = RemissionListSlice.actions

export default RemissionListSlice.reducer
