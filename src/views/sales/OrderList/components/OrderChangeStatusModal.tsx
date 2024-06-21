import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleStatusConfirmation,    
    deleteOrder,
    changeStatusOrder,
    useAppDispatch,
    useAppSelector,
} from '../store'
import { Select } from '@/components/ui'
import { useEffect, useRef, useState } from 'react'

const OrderChangeStatusConfirmation = () => {
    const dispatch = useAppDispatch();    
    const [idStatusOrder, setIdStatusOrder] = useState<number>(0);
    useEffect(() => {
        console.log("select status order=>", idStatusOrder);
    }, [idStatusOrder]);
    

    

    const dialogOpen = useAppSelector(
        (state) => state.salesOrderList.data.statusConfirmation
    )
    const selectedOrder = useAppSelector(
        (state) => state.salesOrderList.data.selectedOrder
    )
    const tableData = useAppSelector(
        (state) => state.salesOrderList.data.tableData
    )

    const statusOrderData = useAppSelector(
        (state) => state.salesOrderList.data.statusOrderData
    )

    

    const onDialogClose = () => {
        dispatch(toggleStatusConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleStatusConfirmation(false))
        const success = await changeStatusOrder({ id: selectedOrder, idStatusOrder:idStatusOrder.toString()})

        if (success) {
            //dispatch(getOrders(tableData))
            

            toast.push(
                <Notification
                    title={'Cambio de Estado'}
                    type="success"
                    duration={2500}
                    onClose={()=>{location.reload()}}
                >
                    La Orden ha cambiado de estado.
                </Notification>,
                {
                    placement: 'top-center',
                }
            )

            //
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="Cambiar Estado Orden"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
            ¿Estás seguro de que deseas cambiar el estado de esta Orden?            
            </p>
            <Select  className='mt-5' 
                options={statusOrderData} 
                placeholder="Estado Orden" 
                onChange={(option)=>{
                    setIdStatusOrder(option?.value);
                }}
            >
            </Select>
        </ConfirmDialog>
    )
}

export default OrderChangeStatusConfirmation
