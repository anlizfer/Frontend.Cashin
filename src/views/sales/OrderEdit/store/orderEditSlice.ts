import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetOrder,
    apiPutOrder,
    apiDeleteOrder,
} from '@/services/OrderServices'

type OrderData = {
    id?: string
    idBranch:string
    idStore:string
    idDeliveryCompany:string
    shippingWithCollection:number
    date?: string   
    status?: number    
    idCompany?:number  
    idPeople:string
    observation:string
    idPeopleContact:string
    lineProducts?:any[]
    
}

export type SalesOrderEditState = {
    loading: boolean
    OrderData: OrderData
}

type GetSalesOrderResponse = OrderData

export const SLICE_NAME = 'salesOrderEdit'

export const getOrder = createAsyncThunk(
    SLICE_NAME + '/getOrders',
    async (data: { id: string }) => {
        const response = await apiGetOrder<
            GetSalesOrderResponse,
            { id: string }
        >(data)        
        return response.data[0]
    }
)

export const updateOrder = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutOrder<T, U>(data)
    return response.data
}

export const deleteOrder = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteOrder<T, U>(data)
    return response.data
}

const initialState: SalesOrderEditState = {
    loading: true,
    OrderData: {},
}

const OrderEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrder.fulfilled, (state, action) => {
                state.OrderData = action.payload
                state.loading = false
            })
            .addCase(getOrder.pending, (state) => {
                state.loading = true
            })
    },
})

export default OrderEditSlice.reducer
