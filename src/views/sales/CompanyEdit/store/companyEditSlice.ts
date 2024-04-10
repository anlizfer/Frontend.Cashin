import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCompany,
    apiPutCompany,
    apiDeleteCompany,
} from '@/services/CompanyService'

type CompanyData = {
    id?: string
    name?: string    
    status?: number    
}

export type SalesCompanyEditState = {
    loading: boolean
    CompanyData: CompanyData
}

type GetSalesCompanyResponse = CompanyData

export const SLICE_NAME = 'salesCompanyEdit'

export const getCompany = createAsyncThunk(
    SLICE_NAME + '/getCompanys',
    async (data: { id: string }) => {
        const response = await apiGetCompany<
            GetSalesCompanyResponse,
            { id: string }
        >(data)        
        return response.data[0]
    }
)

export const updateCompany = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutCompany<T, U>(data)
    return response.data
}

export const deleteCompany = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteCompany<T, U>(data)
    return response.data
}

const initialState: SalesCompanyEditState = {
    loading: true,
    CompanyData: {},
}

const CompanyEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCompany.fulfilled, (state, action) => {
                state.CompanyData = action.payload
                state.loading = false
            })
            .addCase(getCompany.pending, (state) => {
                state.loading = true
            })
    },
})

export default CompanyEditSlice.reducer
