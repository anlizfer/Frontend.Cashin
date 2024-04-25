import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteCompany,
    useAppDispatch,
    useAppSelector,
} from '../store'

const CompanyDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.salesCompanyList.data.deleteConfirmation
    )
    const selectedCompany = useAppSelector(
        (state) => state.salesCompanyList.data.selectedCompany
    )
    const tableData = useAppSelector(
        (state) => state.salesCompanyList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteCompany({ id: selectedCompany, idCompany:1 })

        if (success) {
            //dispatch(getCompanies(tableData))
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

export default CompanyDeleteConfirmation
