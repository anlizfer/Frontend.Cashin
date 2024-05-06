import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetStore,
    apiPutStore,
    apiDeleteStore,
} from '@/services/StoreService'

type StoreData = {
    id?: string
    name?: string    
    status?: number    
}

export type SalesStoreEditState = {
    loading: boolean
    StoreData: StoreData
}

type GetSalesStoreResponse = StoreData

export const SLICE_NAME = 'salesStoreEdit'

export const getStore = createAsyncThunk(
    SLICE_NAME + '/getStores',
    async (data: { id: string }) => {
        const response = await apiGetStore<
            GetSalesStoreResponse,
            { id: string }
        >(data)        
        return response.data[0]
    }
)

export const updateStore = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutStore<T, U>(data)
    return response.data
}

export const deleteStore = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteStore<T, U>(data)
    return response.data
}

const initialState: SalesStoreEditState = {
    loading: true,
    StoreData: {},
}

const StoreEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStore.fulfilled, (state, action) => {
                state.StoreData = action.payload
                state.loading = false
            })
            .addCase(getStore.pending, (state) => {
                state.loading = true
            })
    },
})

export default StoreEditSlice.reducer
