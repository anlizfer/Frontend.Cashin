import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteBranch,
    useAppDispatch,
    useAppSelector,
} from '../store'

const BranchDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.salesBranchList.data.deleteConfirmation
    )
    const selectedBranch = useAppSelector(
        (state) => state.salesBranchList.data.selectedBranch
    )
    const tableData = useAppSelector(
        (state) => state.salesBranchList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteBranch({ id: selectedBranch, idCompany:1 })

        if (success) {
            //dispatch(getBranches(tableData))
            location.reload();

            toast.push(
                <Notification
                    title={'Eliminado exitosamente'}
                    type="success"
                    duration={2500}
                >
                    Sucursal eliminado exitosamente
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
            title="Borrar Sucursal"
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

export default BranchDeleteConfirmation
