import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deletePeople,
    useAppDispatch,
    useAppSelector,
} from '../store'

const PeopleDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.salesPeopleList.data.deleteConfirmation
    )
    const selectedPeople = useAppSelector(
        (state) => state.salesPeopleList.data.selectedPeople
    )
    const tableData = useAppSelector(
        (state) => state.salesPeopleList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deletePeople({ id: selectedPeople, idPeople:1 })

        if (success) {
            //dispatch(getPeoples(tableData))
            location.reload();

            toast.push(
                <Notification
                    title={'Eliminado exitosamente'}
                    type="success"
                    duration={2500}
                >
                    Cliente eliminado exitosamente
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
            title="Borrar Cliente"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
            ¿Estás seguro de que deseas eliminar este cliente? También se eliminarán todos 
            los registros relacionados con este cliente. 
            Esta acción no se puede deshacer.
            </p>
        </ConfirmDialog>
    )
}

export default PeopleDeleteConfirmation
