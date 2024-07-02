import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SalesRemissionState, SLICE_NAME } from './remissionFormSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {            
            data: SalesRemissionState
        }
    }
> = useSelector

export * from './remissionFormSlice'
export { useAppDispatch } from '@/store'
export default reducer
