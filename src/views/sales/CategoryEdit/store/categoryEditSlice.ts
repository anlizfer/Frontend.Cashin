import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCategory,
    apiPutCategory,
    apiDeleteCategory,
} from '@/services/CategoryService'

type CategoryData = {
    id?: string
    name?: string    
    status?: number    
}

export type SalesCategoryEditState = {
    loading: boolean
    CategoryData: CategoryData
}

type GetSalesCategoryResponse = CategoryData

export const SLICE_NAME = 'salesCategoryEdit'

export const getCategory = createAsyncThunk(
    SLICE_NAME + '/getCategorys',
    async (data: { id: string }) => {
        const response = await apiGetCategory<
            GetSalesCategoryResponse,
            { id: string }
        >(data)        
        return response.data[0]
    }
)

export const updateCategory = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutCategory<T, U>(data)
    return response.data
}

export const deleteCategory = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteCategory<T, U>(data)
    return response.data
}

const initialState: SalesCategoryEditState = {
    loading: true,
    CategoryData: {},
}

const CategoryEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategory.fulfilled, (state, action) => {
                state.CategoryData = action.payload
                state.loading = false
            })
            .addCase(getCategory.pending, (state) => {
                state.loading = true
            })
    },
})

export default CategoryEditSlice.reducer
