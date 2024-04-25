import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetPeople,
    apiPutPeople,
    apiDeletePeople,
} from '@/services/PeopleService'

type PeopleData = {
    id?: string
    name?: string    
    lastName?: string   
    idDocumentType?: string    
    idPersonType?:string
    idLegalForm?:string
    idDocument?: string    
    status?: number     
    idCompany?:number   
    idTypePeople?:number
    idCity?:number
    address?: string    
    email?: string    
    phone?: string    
    neighborhood?: string       

}

export type SalesPeopleEditState = {
    loading: boolean
    PeopleData: PeopleData
}

type GetSalesPeopleResponse = PeopleData

export const SLICE_NAME = 'salesPeopleEdit'

export const getPeople = createAsyncThunk(
    SLICE_NAME + '/getPeoples',
    async (data: { id: string,idTypePeople:string }) => {
        const response = await apiGetPeople<
            GetSalesPeopleResponse,
            { id: string, idTypePeople:string }
        >(data)        
        return response.data[0]
    }
)

export const updatePeople = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutPeople<T, U>(data)
    return response.data
}

export const deletePeople = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeletePeople<T, U>(data)
    return response.data
}

const initialState: SalesPeopleEditState = {
    loading: true,
    PeopleData: {},
}

const PeopleEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPeople.fulfilled, (state, action) => {
                state.PeopleData = action.payload
                state.loading = false
            })
            .addCase(getPeople.pending, (state) => {
                state.loading = true
            })
    },
})

export default PeopleEditSlice.reducer
