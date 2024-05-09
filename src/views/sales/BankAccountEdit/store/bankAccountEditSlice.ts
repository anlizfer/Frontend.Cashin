import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetBankAccount,
    apiPutBankAccount,
    apiDeleteBankAccount,
} from '@/services/BankAccountServices'

type BankAccountData = {
    id?: string
    name?: string    
    status?: number    
}

export type SalesBankAccountEditState = {
    loading: boolean
    BankAccountData: BankAccountData
}

type GetSalesBankAccountResponse = BankAccountData

export const SLICE_NAME = 'salesBankAccountEdit'

export const getBankAccount = createAsyncThunk(
    SLICE_NAME + '/getBankAccounts',
    async (data: { id: string }) => {
        const response = await apiGetBankAccount<
            GetSalesBankAccountResponse,
            { id: string }
        >(data)        
        return response.data[0]
    }
)

export const updateBankAccount = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutBankAccount<T, U>(data)
    return response.data
}

export const deleteBankAccount = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteBankAccount<T, U>(data)
    return response.data
}

const initialState: SalesBankAccountEditState = {
    loading: true,
    BankAccountData: {},
}

const BankAccountEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBankAccount.fulfilled, (state, action) => {
                state.BankAccountData = action.payload
                state.loading = false
            })
            .addCase(getBankAccount.pending, (state) => {
                state.loading = true
            })
    },
})

export default BankAccountEditSlice.reducer
