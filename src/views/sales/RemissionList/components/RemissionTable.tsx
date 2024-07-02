import { useEffect, useMemo, useRef, useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FaExchangeAlt } from "react-icons/fa";

import { FiPackage } from 'react-icons/fi'
import {
    getRemissions,
    setTableData,
    setSelectedRemission,
    toggleDeleteConfirmation,
    toggleStatusConfirmation,
    setStatusRemissionData,
    useAppDispatch,
    useAppSelector,
    GetRemissionsRequest,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import RemissionDeleteConfirmation from './RemissionDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import RemissionChangeStatusConfirmation from './RemissionChangeStatusModal'
import { apiGetStatusRemission } from '@/services/RemissionServices'




type Remission = {
    id: string        
    date:string
    dateRemissionF:string    
    idCompany: number
    idAppUser: number
    idStatusRemission: number
    observation:string
    idStoreOrigin:number
    idStoreDestination:number
    nameStoreOrigin:string
    nameStoreDestination:string    
    codeRemission:string
    status:number
    statusRemission:string
}
/*
public List<RemissionLineDtoResponse>? RemissionLines { get; set; }
*/


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

const ActionColumn = ({ row }: { row: Remission }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/app/remission/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedRemission(row.id))
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



const RemissionTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const [openModalStatusRemission, setOpenModalStatusRemission] = useState(false);
    const [statusRemissionData, setStatusRemissionDataApi] = useState<any[]>([]);

    useEffect(()=>{
        getStatusRemissionData();
        
    },[]);

    const getStatusRemissionData=async()=>{
        const dataStatusRemission:any = await apiGetStatusRemission();
        const dataStatus=dataStatusRemission.data;
        const dataStatusD:any=[];
        dataStatus.forEach((element:any) => {
            dataStatusD.push({label:element.id+" - "+element.name, value:element.id});
        });          
        setStatusRemissionDataApi(dataStatusD);
        dispatch(setStatusRemissionData(dataStatusD));       
    }

    const dispatch = useAppDispatch()

    const { companyDefault } = useAppSelector(
        (state) => state.auth.user
    )
    

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.salesRemissionList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.salesRemissionList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.salesRemissionList.data.loading
    )

    const data = useAppSelector(
        (state) => state.salesRemissionList.data.RemissionList
    )


    const showModalStatus=(idRemission:any)=>{
        /*setOpenModalStatusRemission(true);*/
        console.log("Abra");
        
        dispatch(toggleStatusConfirmation(true))
        dispatch(setSelectedRemission(idRemission));
    }

    const onCloseDialogStatus=()=>{
        setOpenModalStatusRemission(false);
        console.log("Cerró cadabra");
    }

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
        let pageParams:GetRemissionsRequest={ pageIndex, pageSize, sort, query, filterData,idCompany:companyDefault?.id };
        dispatch(getRemissions(pageParams))
    }

    const columns: ColumnDef<Remission>[] = useMemo(
        () => [
            {
                header: 'Ref',
                accessorKey: 'codeRemission',
                cell: (props) => {
                    const { codeRemission } = props.row.original
                    return <span>{codeRemission}</span>
                },
            },
            {
                header: 'Fecha',
                accessorKey: 'DateRemissionF',
                cell: (props) => {
                    const { dateRemissionF } = props.row.original
                    return <span>{dateRemissionF}</span>
                },
            },

            {
                header: 'Estado Remisión',
                accessorKey: 'statusRemission',
                cell: (props) => {
                    const { statusRemission } = props.row.original
                    return <span>{statusRemission}</span>
                },
            },

            {
                header: '',
                accessorKey: 'statusRemissionId',
                cell: (props) => {
                    const { statusRemission } = props.row.original
                    return <span
                    className="cursor-pointer p-2 hover:text-red-500" title='Cambiar Estado'    
                    onClick={()=>{showModalStatus(props.row.original.id)}}
                >
                    <FaExchangeAlt />
                </span>
                },
            },

            {
                header: 'Bodega Origen',
                accessorKey: 'nameStoreOrigin',
                cell: (props) => {
                    const { nameStoreOrigin } = props.row.original
                    return <span>{nameStoreOrigin}</span>
                },
            },
            {
                header: 'Bodega Destino',
                accessorKey: 'nameStoreDestination',
                cell: (props) => {
                    const { nameStoreDestination } = props.row.original
                    return <span>{nameStoreDestination}</span>
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
            <RemissionDeleteConfirmation />

            <RemissionChangeStatusConfirmation />
        </>
    )
}

export default RemissionTable
