import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type CompanyState={
    id?:number,
    name?:string
}

export type UserState = {
    avatar?: string
    userName?: string
    email?: string
    authority?: string[],
    companies?:CompanyState[]
}

const initialState: UserState = {
    avatar: '',
    userName: '',
    email: '',
    authority: [],
    companies:[]
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.avatar = action.payload?.avatar
            state.email = action.payload?.email
            state.userName = action.payload?.userName
            state.authority = action.payload?.authority
            state.companies = action.payload?.companies
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
