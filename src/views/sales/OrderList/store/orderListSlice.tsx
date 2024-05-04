import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetOrders,
    apiDeleteOrder,    
    apiCreateOrder,    
} from '@/services/OrderServices'
import type { TableQueries } from '@/@types/common'



type Order = {
    id: string
    name: string 
    idPersonType: number
    idLegalForm: number
    idCity: number    
    nameRepLegal: string 
    nitOrder: string     
    neighborhood:string
    idState:number
    addres:string    
    statusOrder:string
    dateDelivery:string
}

type AddOrdersRequest = {
    id: string
    name: string 
    idPersonType: number
    idLegalForm: number
    idCity: number    
    nameRepLegal: string 
    nitOrder: string
    neighborhood:string
    idState:number
    addres:string    
}

type MetadataSetting = {
    totalCount:number
}

type Meta=MetadataSetting;

export type GetOrdersResponse = {
    data: Order[]
}

export type GetPersonTypeResponse={
    id: string
    name: string 
}

export type GetStatusOrderResponse={
    id: string
    name: string 
}

export type FilterQueries = {
    name: string    
    status: number[]    
    idOrder:number    
    idStatusOrder:number
}

export type SalesOrderListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedOrder: string
    tableData: TableQueries
    filterData: FilterQueries
    OrderList: Order[]
}

export type GetOrdersRequest = TableQueries & { filterData?: FilterQueries }


export const SLICE_NAME = 'salesOrderList'

export const getOrders = createAsyncThunk(
    SLICE_NAME + '/getOrders',
    async (data: GetOrdersRequest) => {        
        const response = await apiGetOrders<GetOrdersResponse,GetOrdersRequest>(data)   
        return response
    }
)


// export const getPersonType = async () => {
//     const response = await apiGetPersonType<GetPersonTypeResponse>();
//     return response.data
// }





export const deleteOrder = async (data: { id: string | string[], idOrder:number }) => {
    const response = await apiDeleteOrder<
        boolean,
        { id: string | string[], idOrder:number }
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

const initialState: SalesOrderListState = {
    loading: false,
    deleteConfirmation: false,
    selectedOrder: '',
    OrderList: [],    
    tableData: initialTableData,
    filterData: {
        name: '',        
        status: [0, 1],        
        idOrder:0,
        idStatusOrder:0
    },
}

const OrderListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateOrderList: (state, action) => {
            state.OrderList = action.payload
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
        setSelectedOrder: (state, action) => {
            state.selectedOrder = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {                
                state.OrderList = action.payload.data
                state.tableData.total = action.payload.meta.totalCount
                state.loading = false
            })
            .addCase(getOrders.pending, (state) => {
                state.loading = true
            })            
    },
})

export const {
    updateOrderList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedOrder,    
} = OrderListSlice.actions

export default OrderListSlice.reducer
