import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getCategory,
    updateCategory,
    deleteCategory,
    useAppSelector,
    useAppDispatch,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import CategoryForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/sales/CategoryForm'
import isEmpty from 'lodash/isEmpty'

injectReducer('salesCategoryEdit', reducer)

const CategoryEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const CategoryData = useAppSelector(
        (state) => state.salesCategoryEdit.data.CategoryData
    )
    const loading = useAppSelector(
        (state) => state.salesCategoryEdit.data.loading
    )

    const fetchData = (data: { id: string }) => {
        dispatch(getCategory(data))
    }

    const handleFormSubmit = async (values: FormModel, setSubmitting: SetSubmitting ) => {
        
        setSubmitting(true)
        const success = await updateCategory(values)
        setSubmitting(false)
        if (success) {
            popNotification('actualizada')
        }
    }

    const handleDiscard = () => {
        navigate('/app/Category-list')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteCategory({ id: CategoryData.id })
        if (success) {
            popNotification('eliminada')
        }
    }

    const popNotification = (keyword: string) => {
        toast.push(
            <Notification
                title={`Proceso de ${keyword}`}
                type="success"
                duration={2500}
            >
                La cateogría fue {keyword} correctamente
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/app/categories-list')
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { id: path }
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(CategoryData) && (
                    <>
                        <CategoryForm
                            type="edit"
                            initialData={CategoryData}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}                            
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(CategoryData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No Category found!"
                    />
                    <h3 className="mt-8">No Category found!</h3>
                </div>
            )}
        </>
    )
}

export default CategoryEdit
