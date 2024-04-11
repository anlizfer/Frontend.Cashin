import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetPeoples,
    apiDeletePeople,    
    apiCreatePeople,    
} from '@/services/PeopleService'

import {    
    apiGetPersonType,
    apiGetLegalForm,
    apiGetStateForm,
    apiGetCitiesForm
} from '@/services/CompanyService'

import type { TableQueries } from '@/@types/common'



type People = {
    id: string
    name: string 
    idPersonType: number
    idDocument:string
    idDocumentType:number
    idLegalForm: number
    idCity: number    
    nameRepLegal: string 
    nitPeople: string     
    neighborhood:string
    idState:number
    addres:string    
}

type AddPeoplesRequest = {
    id: string
    name: string 
    idPersonType: string
    idDocument:string
    idDocumentType:string
    idLegalForm: string
    idCity: string
    nameRepLegal: string 
    nitPeople: string
    neighborhood:string
    idState:number
    addres:string    
}

type MetadataSetting = {
    totalCount:number
}

type Meta=MetadataSetting;

export type GetPeoplesResponse = {
    data: People[]
}

export type GetPersonTypeResponse={
    id: string
    name: string 
}

export type GetStateResponse={
    id: string
    name: string 
}

export type FilterQueries = {
    name: string    
    status: number[]    
    idPeople:number
    Peoplestatus:number
}

export type SalesPeopleListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedPeople: string
    tableData: TableQueries
    filterData: FilterQueries
    PeopleList: People[]
}

export type GetPeoplesRequest = TableQueries & { filterData?: FilterQueries }


export const SLICE_NAME = 'salesPeopleList'

export const getPeoples = createAsyncThunk(
    SLICE_NAME + '/getPeoples',
    async (data: GetPeoplesRequest) => {        
        const response = await apiGetPeoples<GetPeoplesResponse,GetPeoplesRequest>(data)   
        return response
    }
)


export const getPersonType = async () => {
    const response = await apiGetPersonType<GetPersonTypeResponse>();
    return response.data
}

export const getLegalForm = async () => {
    const response = await apiGetLegalForm<GetPersonTypeResponse>();
    return response.data
}

export const getStates = async (idCountry:any) => {
    const response = await apiGetStateForm<GetStateResponse>(idCountry);
    return response.data
}

export const getCities = async (idState:any) => {
    const response = await apiGetCitiesForm<GetStateResponse>(idState);
    return response.data
}





export const deletePeople = async (data: { id: string | string[], idPeople:number }) => {
    const response = await apiDeletePeople<
        boolean,
        { id: string | string[], idPeople:number }
    >(data)
    return response.data
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    idCompany:0,
    sort: {
        order: '',
        key: '',
    },
}

const initialState: SalesPeopleListState = {
    loading: false,
    deleteConfirmation: false,
    selectedPeople: '',
    PeopleList: [],    
    tableData: initialTableData,
    filterData: {
        name: '',        
        status: [0, 1],        
        idPeople:0,
        Peoplestatus:0
    },
}

const PeopleListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updatePeopleList: (state, action) => {
            state.PeopleList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedPeople: (state, action) => {
            state.selectedPeople = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPeoples.fulfilled, (state, action) => {                
                state.PeopleList = action.payload.data
                state.tableData.total = action.payload.meta.totalCount
                state.loading = false
            })
            .addCase(getPeoples.pending, (state) => {
                state.loading = true
            })            
    },
})

export const {
    updatePeopleList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedPeople,    
} = PeopleListSlice.actions

export default PeopleListSlice.reducer
