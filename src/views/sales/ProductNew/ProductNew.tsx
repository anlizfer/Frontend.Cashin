import ProductForm, {
    FormModel,
    SetSubmitting,
} from '@/views/sales/ProductForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateSalesProduct } from '@/services/SalesService'

const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data: FormModel) => {
        data.idCompany=1;
        const response = await apiCreateSalesProduct<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addProduct(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Producto añadido exitosamente'}
                    type="success"
                    duration={2500}
                >
                    Producto generado correctamente
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/product-list')
        }
    }

    const handleDiscard = () => {
        navigate('/app/product-list')
    }

    return (
        <>
            <ProductForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}                
            />
        </>
    )
}

export default ProductNew
