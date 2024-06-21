import { useEffect, useMemo, useRef, useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FaExchangeAlt } from "react-icons/fa";

import { FiPackage } from 'react-icons/fi'
import {
    getOrders,
    setTableData,
    setSelectedOrder,
    toggleDeleteConfirmation,
    toggleStatusConfirmation,
    setStatusOrderData,
    useAppDispatch,
    useAppSelector,
    GetOrdersRequest,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import OrderDeleteConfirmation from './OrderDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import OrderChangeStatusConfirmation from './OrderChangeStatusModal'
import { apiGetStatusOrder } from '@/services/OrderServices'




type Order = {
    id: string        
    date:string
    dateDelivery:string
    idPeople: number
    idCompany: number
    idAppUser: number
    idStatusOrder: number
    nameCustomer:string
    lastnameCustomer:string
    emailCustomer:string
    genderCustomer:string
    phoneCustomer:string
    identifyCustomer:string
    addressCustomer:string
    observation:string
    idStore:number
    total:number
    shippingWithCollection:number
    codeOrder:string
    status:number
    statusOrder:string
}
/*
public List<OrderLineDtoResponse>? OrderLines { get; set; }
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

const ActionColumn = ({ row }: { row: Order }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/app/order/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedOrder(row.id))
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

const OrderColumn = ({ row }: { row: Order }) => {
   
    return (
        <div className="flex items-center">   
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.nameCustomer+' '+row.lastnameCustomer}</span>
        </div>
    )
}

const OrderTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const [openModalStatusOrder, setOpenModalStatusOrder] = useState(false);
    const [statusOrderData, setStatusOrderDataApi] = useState<any[]>([]);

    useEffect(()=>{
        getStatusOrderData();
        
    },[]);

    const getStatusOrderData=async()=>{
        const dataStatusOrder:any = await apiGetStatusOrder();
        const dataStatus=dataStatusOrder.data;
        const dataStatusD:any=[];
        dataStatus.forEach((element:any) => {
            dataStatusD.push({label:element.id+" - "+element.name, value:element.id});
        });          
        setStatusOrderDataApi(dataStatusD);
        dispatch(setStatusOrderData(dataStatusD));       
    }

    const dispatch = useAppDispatch()

    const { companyDefault } = useAppSelector(
        (state) => state.auth.user
    )
    

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.salesOrderList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.salesOrderList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.salesOrderList.data.loading
    )

    const data = useAppSelector(
        (state) => state.salesOrderList.data.OrderList
    )


    const showModalStatus=(idOrder:any)=>{
        /*setOpenModalStatusOrder(true);*/
        console.log("Abra");
        
        dispatch(toggleStatusConfirmation(true))
        dispatch(setSelectedOrder(idOrder));
    }

    const onCloseDialogStatus=()=>{
        setOpenModalStatusOrder(false);
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
        let pageParams:GetOrdersRequest={ pageIndex, pageSize, sort, query, filterData,idCompany:companyDefault?.id };
        dispatch(getOrders(pageParams))
    }

    const columns: ColumnDef<Order>[] = useMemo(
        () => [
            {
                header: 'Ref',
                accessorKey: 'codeOrder',
                cell: (props) => {
                    const { codeOrder } = props.row.original
                    return <span>{codeOrder}</span>
                },
            },
            {
                header: 'Fecha',
                accessorKey: 'dateDelivery',
                cell: (props) => {
                    const { dateDelivery } = props.row.original
                    return <span>{dateDelivery}</span>
                },
            },

            {
                header: 'Estado Pedido',
                accessorKey: 'statusOrder',
                cell: (props) => {
                    const { statusOrder } = props.row.original
                    return <span>{statusOrder}</span>
                },
            },

            {
                header: '',
                accessorKey: 'statusOrderId',
                cell: (props) => {
                    const { statusOrder } = props.row.original
                    return <span
                    className="cursor-pointer p-2 hover:text-red-500" title='Cambiar Estado'    
                    onClick={()=>{showModalStatus(props.row.original.id)}}
                >
                    <FaExchangeAlt />
                </span>
                },
            },

            {
                header: 'Id. Cliente',
                accessorKey: 'identifyCustomer',
                cell: (props) => {
                    const { identifyCustomer } = props.row.original
                    return <span>{identifyCustomer}</span>
                },
            },
            {
                header: 'Cliente',
                accessorKey: 'nameRepLegal',
                cell: (props) => {
                    const row = props.row.original
                    return <OrderColumn row={row} />
                },
            },

            {
                header: 'Envío con Recaudo',
                accessorKey: 'shippingWithCollection',
                cell: (props) => {
                    const { shippingWithCollection } = props.row.original
                    return <span>{(shippingWithCollection==1)?'SI':'NO'}</span>
                },
            },

            {
                header: 'Total',
                accessorKey: 'total',
                cell: (props) => {
                    const { total } = props.row.original
                    return <span>${total}</span>
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
            <OrderDeleteConfirmation />

            <OrderChangeStatusConfirmation />
        </>
    )
}

export default OrderTable
