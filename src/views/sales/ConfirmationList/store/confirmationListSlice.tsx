import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetOrders,
    apiDeleteOrder,    
    apiCreateOrder,
    apiChangeStatusOrder,    
} from '@/services/OrderServices'
import type { TableQueries } from '@/@types/common'



type Confirmation = {
    id: string
    name: string 
    idPersonType: number
    idLegalForm: number
    idCity: number    
    nameRepLegal: string 
    nitConfirmation: string     
    neighborhood:string
    idState:number
    addres:string    
    statusConfirmation:string
    dateDelivery:string
}

type AddConfirmationsRequest = {
    id: string
    name: string 
    idPersonType: number
    idLegalForm: number
    idCity: number    
    nameRepLegal: string 
    nitConfirmation: string
    neighborhood:string
    idState:number
    addres:string    
}

type MetadataSetting = {
    totalCount:number
}

type Meta=MetadataSetting;

export type GetConfirmationsResponse = {
    data: Confirmation[]
}

export type GetPersonTypeResponse={
    id: string
    name: string 
}

export type GetStatusConfirmationResponse={
    id: string
    name: string 
}

export type FilterQueries = {
    name: string    
    status: number[]    
    idOrder:number    
    idStatusOrder:number
}

export type SalesConfirmationListState = {
    loading: boolean
    deleteConfirmation: boolean
    statusConfirmation: boolean
    statusConfirmationData:any[]
    selectedConfirmation: string
    tableData: TableQueries
    filterData: FilterQueries
    ConfirmationList: Confirmation[]
}

export type GetConfirmationsRequest = TableQueries & { filterData?: FilterQueries }


export const SLICE_NAME = 'salesConfirmationList'

export const getConfirmations = createAsyncThunk(
    SLICE_NAME + '/getConfirmations',
    async (data: GetConfirmationsRequest) => {        
        const response = await apiGetOrders<GetConfirmationsResponse,GetConfirmationsRequest>(data)   
        return response
    }
)


// export const getPersonType = async () => {
//     const response = await apiGetPersonType<GetPersonTypeResponse>();
//     return response.data
// }

export const deleteConfirmation = async (data: { id: string | string[]}) => {
    const response = await apiDeleteOrder<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data
}



export const changeStatusConfirmation = async (data: { id: string, idStatusOrder:string}) => {
    const response = await apiChangeStatusOrder<
        boolean,
        { 
            id: string
            idStatusOrder:string
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

const initialState: SalesConfirmationListState = {
    loading: false,
    deleteConfirmation: false,
    statusConfirmation:false,
    statusConfirmationData:[],
    selectedConfirmation: '',
    ConfirmationList: [],    
    tableData: initialTableData,
    filterData: {
        name: '',        
        status: [0, 1],        
        idOrder:0,
        idStatusOrder:0
    },
}

const ConfirmationListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateConfirmationList: (state, action) => {
            state.ConfirmationList = action.payload
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
        setStatusConfirmationData:(state, action)=>{
            state.statusConfirmationData = action.payload
        },
        setSelectedConfirmation: (state, action) => {
            state.selectedConfirmation = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConfirmations.fulfilled, (state, action) => {                
                state.ConfirmationList = action.payload.data
                state.tableData.total = action.payload.meta.totalCount
                state.loading = false
            })
            .addCase(getConfirmations.pending, (state) => {
                state.loading = true
            })            
    },
})

export const {
    updateConfirmationList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    toggleStatusConfirmation,
    setStatusConfirmationData,
    setSelectedConfirmation,    
} = ConfirmationListSlice.actions

export default ConfirmationListSlice.reducer
