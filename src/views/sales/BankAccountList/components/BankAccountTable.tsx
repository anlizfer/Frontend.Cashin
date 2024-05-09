import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    getBankAccounts,
    setTableData,
    setSelectedBankAccount,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
    GetBankAccountsRequest,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import BankAccountDeleteConfirmation from './BankAccountDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import { TbBuildingWarehouse } from 'react-icons/tb'

type BankAccount = {
    id: string
    name: string 
    nameBank:string
    idBank:number
    idCompany: number 
    idTypeBankAccount: number  
    numberAccount: string  
    status:number   
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

const ActionColumn = ({ row }: { row: BankAccount }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/app/bank-account/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedBankAccount(row.id))
    }

    return (
        <div className="flex justify-end text-lg">
           
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const BankAccountColumn = ({ row }: { row: BankAccount }) => {
   
    return (
        <div className="flex items-center">   
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const BankAccountTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { companyDefault } = useAppSelector(
        (state) => state.auth.user
    )
    

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.salesBankAccountList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.salesBankAccountList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.salesBankAccountList.data.loading
    )

    const data = useAppSelector(
        (state) => state.salesBankAccountList.data.BankAccountList
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
        let pageParams:GetBankAccountsRequest={ pageIndex, pageSize, sort, query, filterData,idCompany:companyDefault?.id };
        dispatch(getBankAccounts(pageParams))
    }

    const columns: ColumnDef<BankAccount>[] = useMemo(
        () => [
            {
                header: 'Cuenta Bancaria',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <BankAccountColumn row={row} />
                },
            },     
            {
                header: 'Banco',
                accessorKey: 'nameBank',
                cell: (props) => {
                    const {nameBank} = props.row.original
                    return <span>{nameBank}</span>
                },
            },   
            
            {
                header: 'Número Cuenta',
                accessorKey: 'numberAccount',
                cell: (props) => {
                    const {numberAccount} = props.row.original
                    return <span>{numberAccount}</span>
                },
            },   

            {
                header: 'Tipo Cuenta',
                accessorKey: 'idTypeBankAccount',
                cell: (props) => {
                    const {idTypeBankAccount} = props.row.original
                    return <span>{(idTypeBankAccount==1)?'AHORROS':'CORRIENTE'}</span>
                },
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
            <BankAccountDeleteConfirmation />
        </>
    )
}

export default BankAccountTable
