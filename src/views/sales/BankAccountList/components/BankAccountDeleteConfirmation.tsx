import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteBankAccount,
    useAppDispatch,
    useAppSelector,
} from '../store'

const BankAccountDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.salesBankAccountList.data.deleteConfirmation
    )
    const selectedBankAccount = useAppSelector(
        (state) => state.salesBankAccountList.data.selectedBankAccount
    )
    const tableData = useAppSelector(
        (state) => state.salesBankAccountList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteBankAccount({ id: selectedBankAccount, idCompany:1 })

        if (success) {
            //dispatch(getBankAccounts(tableData))
            location.reload();

            toast.push(
                <Notification
                    title={'Eliminado exitosamente'}
                    type="success"
                    duration={2500}
                >
                    Cuenta Bancaria eliminado exitosamente
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
            title="Borrar Cuenta Bancaria"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
            ¿Estás seguro de que deseas eliminar esta Cuenta Bancaria? También se eliminarán todos 
            los registros relacionados con esta Cuenta Bancaria. 
            Esta acción no se puede deshacer.
            </p>
        </ConfirmDialog>
    )
}

export default BankAccountDeleteConfirmation
