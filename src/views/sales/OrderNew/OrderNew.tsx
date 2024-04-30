import OrderForm, {
    FormModel,
    SetSubmitting,
} from '@/views/sales/OrderForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateOrder } from '@/services/OrderServices'
import { useAppSelector } from '../SalesDashboard/store'

const OrderNew = () => {
    const navigate = useNavigate()
    const { companyDefault } = useAppSelector(
        (state) => state.auth.user
    )

    const addOrder = async (data: FormModel) => {
        debugger
        data.idCompany=companyDefault?.id;
        const response = await apiCreateOrder<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addOrder(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Categoría añadida exitosamente'}
                    type="success"
                    duration={2500}
                >
                    ORden generada correctamente
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/order-list')
        }
    }

    const handleDiscard = () => {
        navigate('/app/sales/order-list')
    }

    return (
        <>
            <OrderForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}                
            />
        </>
    )
}

export default OrderNew
