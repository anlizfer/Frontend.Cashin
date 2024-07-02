import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const SLICE_NAME = 'salesOrderForm'

const initialState: any = {
    loading: false,
    idStoreData:0
}

export type SalesOrderState = {
    idStoreData:number
}


const OrderFormSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {        
        setIdStore:(state, action)=>{
            state.idStoreData = action.payload
        },        
    },    
})

export const {
    setIdStore
} = OrderFormSlice.actions

export default OrderFormSlice.reducer