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
        data.idCompany=companyDefault?.id;

        if(data.lineProducts?.length==0){
            openNotification('warning','Líneas de Productos','Debes agregar por lo menos 1 línea de producto.');
            return;
        }

        if(data.date=="" || data.date==undefined){
            openNotification('warning','Fecha de Entrega','Debes seleccionar una fecha de entrega');
            return;
        }

        if(data.idPeople=="" || data.idPeople==undefined){
            openNotification('warning','Cliente','Debes seleccionar un cliente');
            return;
        }

        if(data.idPeopleContact=="" || data.idPeopleContact==undefined){
            openNotification('warning','Dirección de Envío','Debes seleccionar la dirección de envío');
            return;
        }        

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
                    Orden generada correctamente
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/order-list')
        }
    }

    const openNotification = (type: 'success' | 'warning' | 'danger' | 'info', title:string, message:string ) => {
        toast.push(
            <Notification
                title={title}
                type={type}
            >
                {message}
            </Notification>,{
                    placement: 'top-center',
                }
        )
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
