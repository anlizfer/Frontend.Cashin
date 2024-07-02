import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetRemission,
    apiPutRemission,
    apiDeleteRemission,
} from '@/services/RemissionServices'

type RemissionData = {
    id?: string
    idBranch?:string
    idStore?:string
    idDeliveryCompany?:string
    shippingWithCollection?:number
    date?: string   
    status?: number    
    idCompany?:number  
    idPeople?:string
    observation?:string
    idPeopleContact?:string
    lineProducts?:any[]
    
}

export type SalesRemissionEditState = {
    loading: boolean
    RemissionData: RemissionData
}

type GetSalesRemissionResponse = RemissionData

export const SLICE_NAME = 'salesRemissionEdit'

export const getRemission = createAsyncThunk(
    SLICE_NAME + '/getRemissions',
    async (data: { id: string }) => {
        const response = await apiGetRemission<
            GetSalesRemissionResponse,
            { id: string }
        >(data)        
        return response.data[0]
    }
)

export const updateRemission = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutRemission<T, U>(data)
    return response.data
}

export const deleteRemission = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteRemission<T, U>(data)
    return response.data
}

const initialState: SalesRemissionEditState = {
    loading: true,
    RemissionData: {},
}

const RemissionEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRemission.fulfilled, (state, action) => {
                state.RemissionData = action.payload
                state.loading = false
            })
            .addCase(getRemission.pending, (state) => {
                state.loading = true
            })
    },
})

export default RemissionEditSlice.reducer
