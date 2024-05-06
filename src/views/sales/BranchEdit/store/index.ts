import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SLICE_NAME, SalesBranchEditState } from './branchEditSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: SalesBranchEditState
        }
    }
> = useSelector

export * from './branchEditSlice'
export { useAppDispatch } from '@/store'
export default reducer
