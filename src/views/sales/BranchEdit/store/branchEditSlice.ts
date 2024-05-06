import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetBranch,
    apiPutBranch,
    apiDeleteBranch,
} from '@/services/BranchService'

type BranchData = {
    id?: string
    name?: string    
    status?: number    
}

export type SalesBranchEditState = {
    loading: boolean
    BranchData: BranchData
}

type GetSalesBranchResponse = BranchData

export const SLICE_NAME = 'salesBranchEdit'

export const getBranch = createAsyncThunk(
    SLICE_NAME + '/getBranchs',
    async (data: { id: string }) => {
        const response = await apiGetBranch<
            GetSalesBranchResponse,
            { id: string }
        >(data)        
        return response.data[0]
    }
)

export const updateBranch = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutBranch<T, U>(data)
    return response.data
}

export const deleteBranch = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteBranch<T, U>(data)
    return response.data
}

const initialState: SalesBranchEditState = {
    loading: true,
    BranchData: {},
}

const BranchEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBranch.fulfilled, (state, action) => {
                state.BranchData = action.payload
                state.loading = false
            })
            .addCase(getBranch.pending, (state) => {
                state.loading = true
            })
    },
})

export default BranchEditSlice.reducer
