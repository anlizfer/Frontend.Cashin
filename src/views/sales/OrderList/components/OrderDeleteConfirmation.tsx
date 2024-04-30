import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteOrder,
    useAppDispatch,
    useAppSelector,
} from '../store'

const OrderDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.salesOrderList.data.deleteConfirmation
    )
    const selectedOrder = useAppSelector(
        (state) => state.salesOrderList.data.selectedOrder
    )
    const tableData = useAppSelector(
        (state) => state.salesOrderList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteOrder({ id: selectedOrder, idOrder:1 })

        if (success) {
            //dispatch(getOrders(tableData))
            location.reload();

            toast.push(
                <Notification
                    title={'Eliminado exitosamente'}
                    type="success"
                    duration={2500}
                >
                    Compañía eliminada exitosamente
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="Borrar Compañía"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
            ¿Estás seguro de que deseas eliminar esta Compañía? También se eliminarán todos 
            los registros relacionados con este Compañía. 
            Esta acción no se puede deshacer.
            </p>
        </ConfirmDialog>
    )
}

export default OrderDeleteConfirmation
