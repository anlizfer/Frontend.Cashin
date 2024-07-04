import RemissionForm, {
    FormModel,
    SetSubmitting,
} from '@/views/sales/RemissionForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateRemission } from '@/services/RemissionServices'
import { useAppSelector } from '../SalesDashboard/store'

const RemissionNew = () => {
    const navigate = useNavigate()
    const { companyDefault } = useAppSelector(
        (state) => state.auth.user
    )

    const addRemission = async (data: FormModel) => {        
        data.idCompany=companyDefault?.id;

        /*if(data.lineProducts?.length==0){
            openNotification('warning','Líneas de Productos','Debes agregar por lo menos 1 línea de producto.');
            return;
        }*/

        if(data.dateRemission=="" || data.dateRemission==undefined){
            openNotification('warning','Fecha de Entrega','Debes seleccionar una fecha de remisión');
            return;
        }
         

        const response = await apiCreateRemission<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addRemission(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Remisión añadida exitosamente'}
                    type="success"
                    duration={2500}
                >
                    Remisión generada correctamente
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/remissions-list')
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
        navigate('/app/sales/remission-list')
    }

    return (
        <>
            <RemissionForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}                
            />
        </>
    )
}

export default RemissionNew
