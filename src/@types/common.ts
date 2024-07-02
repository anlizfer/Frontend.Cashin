import { ReactNode, CSSProperties } from 'react'

export interface CommonProps {
    className?: string
    children?: ReactNode
    style?: CSSProperties
}

export type TableQueries = {
    total?: number
    pageIndex?: number
    pageSize?: number
    query?: string
    idCompany?:number
    idStore?:string
    idProduct?:string
    sort?: {
        order: 'asc' | 'desc' | ''
        key: string | number
    }
}
