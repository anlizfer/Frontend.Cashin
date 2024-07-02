import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SalesOrderState, SLICE_NAME } from './orderFormSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {            
            data: SalesOrderState
        }
    }
> = useSelector

export * from './orderFormSlice'
export { useAppDispatch } from '@/store'
export default reducer
