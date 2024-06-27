import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    getHistories,
    setTableData,
    setSelectedHistory,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
    GetHistoriesRequest,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import { FaHistory } from 'react-icons/fa'

type History = {
    id: string    
    productName: string
    productCode:string
    cant:string
    storeName:string
    branchName:string    
    status: number    
    transactionType:number
}


const historyStatusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    1: {
        label: 'Entrada',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },    
    0: {
        label: 'Salida',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}

const ActionColumn = ({ row }: { row: History }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/app/History-History/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedHistory(row.id))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
                title='Ver Movimientos de Inventario'
            >
                <FaHistory />
            </span>
            {/*<span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>*/}
        </div>
    )
}

const HistoryColumn = ({ row }: { row: History }) => {
   
    return (
        <div className="flex items-center">   
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.productName}</span>
        </div>
    )
}

const HistoryTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { companyDefault } = useAppSelector(
        (state) => state.auth.user
    )
    

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.salesHistoryList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.salesHistoryList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.salesHistoryList.data.loading
    )

    const data = useAppSelector(
        (state) => state.salesHistoryList.data.HistoryList
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    useEffect(() => {        
        if (tableRef) {
            //tableRef.current?.resetSorting()            
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = () => { 
        let pageParams:GetHistoriesRequest={ pageIndex, pageSize, sort, query, filterData,idCompany:companyDefault?.id };
        dispatch(getHistories(pageParams))
    }

    const columns: ColumnDef<History>[] = useMemo(
        () => [
            {
                header:'Código',
                accessorKey:'productCode',
                cell:(props)=>{
                    const row=props.row.original;
                    return <div className={'flex items-center'}>
                        <span>{row.productCode}</span>
                    </div>
                }
            },
            {
                header: 'Producto',
                accessorKey: 'productName',
                cell: (props) => {
                    const row = props.row.original
                    return <HistoryColumn row={row} />
                },
            },  
            {
                header:'Cantidad',
                accessorKey:'cant',
                cell:(props)=>{
                    const row=props.row.original;
                    return <div className={'flex items-center'}>
                        <span>{row.cant}</span>
                    </div>
                }
            },
            
            {
                header:'Sucursal',
                accessorKey:'branchName',
                cell:(props)=>{
                    const row=props.row.original;
                    return <div className={'flex items-center'}>
                        <span>{row.branchName}</span>
                    </div>
                }
            },

            {
                header:'Bodega',
                accessorKey:'storeName',
                cell:(props)=>{
                    const row=props.row.original;
                    return <div className={'flex items-center'}>
                        <span>{row.storeName}</span>
                    </div>
                }
            },
            {
                header: 'Tipo Movimiento',
                accessorKey: 'transactionType',
                cell: (props) => {
                    const { transactionType } = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <Badge
                                className={
                                    historyStatusColor[transactionType].dotClass                                    
                                }
                            />
                            <span
                                className={`capitalize font-semibold ${historyStatusColor[transactionType].textClass}`}
                            >
                                {historyStatusColor[transactionType].label}
                            </span>
                        </div>
                    )
                },
            },            
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            
        </>
    )
}

export default HistoryTable
