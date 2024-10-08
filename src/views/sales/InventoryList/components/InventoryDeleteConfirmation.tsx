import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteInventory,
    useAppDispatch,
    useAppSelector,
} from '../store'

const InventoryDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.salesInventoryList.data.deleteConfirmation
    )
    const selectedInventory = useAppSelector(
        (state) => state.salesInventoryList.data.selectedInventory
    )
    const tableData = useAppSelector(
        (state) => state.salesInventoryList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteInventory({ id: selectedInventory, idCompany:1 })

        if (success) {
            //dispatch(getInventories(tableData))
            location.reload();

            toast.push(
                <Notification
                    title={'Eliminado exitosamente'}
                    type="success"
                    duration={2500}
                >
                    Categoría eliminado exitosamente
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
            title="Borrar Categoría"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
            ¿Estás seguro de que deseas eliminar esta categoría? También se eliminarán todos 
            los registros relacionados con este Categoría. 
            Esta acción no se puede deshacer.
            </p>
        </ConfirmDialog>
    )
}

export default InventoryDeleteConfirmation
