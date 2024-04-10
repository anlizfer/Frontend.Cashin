import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteCategory,
    useAppDispatch,
    useAppSelector,
} from '../store'

const CategoryDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.salesCategoryList.data.deleteConfirmation
    )
    const selectedCategory = useAppSelector(
        (state) => state.salesCategoryList.data.selectedCategory
    )
    const tableData = useAppSelector(
        (state) => state.salesCategoryList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteCategory({ id: selectedCategory, idCompany:1 })

        if (success) {
            //dispatch(getCategories(tableData))
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

export default CategoryDeleteConfirmation
