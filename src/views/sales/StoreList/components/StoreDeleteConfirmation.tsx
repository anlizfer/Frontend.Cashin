import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteStore,
    useAppDispatch,
    useAppSelector,
} from '../store'

const StoreDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.salesStoreList.data.deleteConfirmation
    )
    const selectedStore = useAppSelector(
        (state) => state.salesStoreList.data.selectedStore
    )
    const tableData = useAppSelector(
        (state) => state.salesStoreList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteStore({ id: selectedStore, idCompany:1 })

        if (success) {
            //dispatch(getStores(tableData))
            location.reload();

            toast.push(
                <Notification
                    title={'Eliminado exitosamente'}
                    type="success"
                    duration={2500}
                >
                    Bodega eliminado exitosamente
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
            title="Borrar Bodega"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
            ¿Estás seguro de que deseas eliminar esta sucursal? También se eliminarán todos 
            los registros relacionados con esta sucursal. 
            Esta acción no se puede deshacer.
            </p>
        </ConfirmDialog>
    )
}

export default StoreDeleteConfirmation
