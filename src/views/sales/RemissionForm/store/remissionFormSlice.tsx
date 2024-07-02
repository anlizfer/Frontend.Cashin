import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const SLICE_NAME = 'salesRemissionForm'

const initialState: any = {
    loading: false,
    idStoreData:0
}

export type SalesRemissionState = {
    idStoreData:number
}


const RemissionFormSlice = createSlice({
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
} = RemissionFormSlice.actions

export default RemissionFormSlice.reducer