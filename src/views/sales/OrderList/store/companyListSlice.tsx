import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCompanies,
    apiDeleteCompany,    
    apiCreateCompany,
    apiGetPersonType,
    apiGetLegalForm,
    apiGetStateForm,
    apiGetCitiesForm
} from '@/services/CompanyService'
import type { TableQueries } from '@/@types/common'



type Company = {
    id: string
    name: string 
    idPersonType: number
    idLegalForm: number
    idCity: number    
    nameRepLegal: string 
    nitCompany: string     
    neighborhood:string
    idState:number
    addres:string    
}

type AddCompaniesRequest = {
    id: string
    name: string 
    idPersonType: number
    idLegalForm: number
    idCity: number    
    nameRepLegal: string 
    nitCompany: string
    neighborhood:string
    idState:number
    addres:string    
}

type MetadataSetting = {
    totalCount:number
}

type Meta=MetadataSetting;

export type GetCompaniesResponse = {
    data: Company[]
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
    idCompany:number
    Companiestatus:number
}

export type SalesCompanyListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedCompany: string
    tableData: TableQueries
    filterData: FilterQueries
    CompanyList: Company[]
}

export type GetCompaniesRequest = TableQueries & { filterData?: FilterQueries }


export const SLICE_NAME = 'salesCompanyList'

export const getCompanies = createAsyncThunk(
    SLICE_NAME + '/getCompanies',
    async (data: GetCompaniesRequest) => {        
        const response = await apiGetCompanies<GetCompaniesResponse,GetCompaniesRequest>(data)   
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





export const deleteCompany = async (data: { id: string | string[], idCompany:number }) => {
    const response = await apiDeleteCompany<
        boolean,
        { id: string | string[], idCompany:number }
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

const initialState: SalesCompanyListState = {
    loading: false,
    deleteConfirmation: false,
    selectedCompany: '',
    CompanyList: [],    
    tableData: initialTableData,
    filterData: {
        name: '',        
        status: [0, 1],        
        idCompany:0,
        Companiestatus:0
    },
}

const CompanyListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateCompanyList: (state, action) => {
            state.CompanyList = action.payload
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
        setSelectedCompany: (state, action) => {
            state.selectedCompany = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCompanies.fulfilled, (state, action) => {                
                state.CompanyList = action.payload.data
                state.tableData.total = action.payload.meta.totalCount
                state.loading = false
            })
            .addCase(getCompanies.pending, (state) => {
                state.loading = true
            })            
    },
})

export const {
    updateCompanyList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedCompany,    
} = CompanyListSlice.actions

export default CompanyListSlice.reducer
