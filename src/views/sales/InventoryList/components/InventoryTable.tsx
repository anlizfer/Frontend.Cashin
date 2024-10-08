import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    getInventories,
    setTableData,
    setSelectedInventory,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
    GetInventoriesRequest,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import InventoryDeleteConfirmation from './InventoryDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import { FaHistory } from 'react-icons/fa'

type Inventory = {
    id: string    
    idProduct:number
    idStore:number
    productName: string
    productCode:string
    cant:string
    storeName:string
    branchName:string    
    status: number    
}


const inventoryStatusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    1: {
        label: 'Activo',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },    
    0: {
        label: 'Inactivo',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}

const ActionColumn = ({ row }: { row: Inventory }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onShowHistory = () => {
        navigate(`/app/inventory-history-list/${row.idProduct}/${row.idStore}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedInventory(row.id))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onShowHistory}
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

const InventoryColumn = ({ row }: { row: Inventory }) => {
   
    return (
        <div className="flex items-center">   
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.productName}</span>
        </div>
    )
}

const InventoryTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { companyDefault } = useAppSelector(
        (state) => state.auth.user
    )
    

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.salesInventoryList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.salesInventoryList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.salesInventoryList.data.loading
    )

    const data = useAppSelector(
        (state) => state.salesInventoryList.data.InventoryList
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
        let pageParams:GetInventoriesRequest={ pageIndex, pageSize, sort, query, filterData,idCompany:companyDefault?.id };
        dispatch(getInventories(pageParams))
    }

    const columns: ColumnDef<Inventory>[] = useMemo(
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
                    return <InventoryColumn row={row} />
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
                header: 'Estado',
                accessorKey: 'status',
                cell: (props) => {
                    const { status } = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <Badge
                                className={
                                    inventoryStatusColor[status].dotClass                                    
                                }
                            />
                            <span
                                className={`capitalize font-semibold ${inventoryStatusColor[status].textClass}`}
                            >
                                {inventoryStatusColor[status].label}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
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
            <InventoryDeleteConfirmation />
        </>
    )
}

export default InventoryTable
