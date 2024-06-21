import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetInventory,
    apiPutInventory,
    apiDeleteInventory,
} from '@/services/InventoryService'

type InventoryData = {
    id?: string
    name?: string    
    status?: number    
}

export type SalesInventoryEditState = {
    loading: boolean
    InventoryData: InventoryData
}

type GetSalesInventoryResponse = InventoryData

export const SLICE_NAME = 'salesInventoryEdit'

export const getInventory = createAsyncThunk(
    SLICE_NAME + '/getInventorys',
    async (data: { id: string }) => {
        const response = await apiGetInventory<
            GetSalesInventoryResponse,
            { id: string }
        >(data)        
        return response.data[0]
    }
)

export const updateInventory = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutInventory<T, U>(data)
    return response.data
}

export const deleteInventory = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteInventory<T, U>(data)
    return response.data
}

const initialState: SalesInventoryEditState = {
    loading: true,
    InventoryData: {},
}

const InventoryEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getInventory.fulfilled, (state, action) => {
                state.InventoryData = action.payload
                state.loading = false
            })
            .addCase(getInventory.pending, (state) => {
                state.loading = true
            })
    },
})

export default InventoryEditSlice.reducer
