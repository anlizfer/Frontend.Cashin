import CategoryForm, {
    FormModel,
    SetSubmitting,
} from '@/views/sales/CategoryForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateCategory } from '@/services/CategoryService'
import { useAppSelector } from '../SalesDashboard/store'

const CategoryNew = () => {
    const navigate = useNavigate()
    const { companyDefault } = useAppSelector(
        (state) => state.auth.user
    )

    const addCategory = async (data: FormModel) => {
        data.idCompany=companyDefault?.id;
        const response = await apiCreateCategory<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addCategory(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Categoría añadida exitosamente'}
                    type="success"
                    duration={2500}
                >
                    Categoría generada correctamente
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/category-list')
        }
    }

    const handleDiscard = () => {
        navigate('/app/sales/Category-list')
    }

    return (
        <>
            <CategoryForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}                
            />
        </>
    )
}

export default CategoryNew
