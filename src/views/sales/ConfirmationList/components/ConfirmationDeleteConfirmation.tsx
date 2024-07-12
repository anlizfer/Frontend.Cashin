import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteConfirmation,
    useAppDispatch,
    useAppSelector,
} from '../store'
import { useEffect } from 'react'

const ConfirmationDeleteConfirmation = () => {

    

    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.salesConfirmationList.data.deleteConfirmation
    )    

    const selectedConfirmation = useAppSelector(
        (state) => state.salesConfirmationList.data.selectedConfirmation
    )
    const tableData = useAppSelector(
        (state) => state.salesConfirmationList.data.tableData
    )    

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteConfirmation({ id: selectedConfirmation})

        if (success) {
            //dispatch(getConfirmations(tableData))
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

export default ConfirmationDeleteConfirmation
