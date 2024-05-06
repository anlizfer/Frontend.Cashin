import StoreForm, {
    FormModel,
    SetSubmitting,
} from '@/views/sales/StoreForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate, useParams } from 'react-router-dom'
import { apiCreateStore } from '@/services/StoreService'
import { useAppSelector } from '../SalesDashboard/store'

const StoreNew = () => {
    const navigate = useNavigate()
    const { companyDefault } = useAppSelector(
        (state) => state.auth.user
    )

    const {branchId}=useParams();

    const addStore = async (data: FormModel) => {
        data.idBranch=branchId?.toString();
        const response = await apiCreateStore<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addStore(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Bodega añadida exitosamente'}
                    type="success"
                    duration={2500}
                >
                    Bodega generada correctamente
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/Store-list')
        }
    }

    const handleDiscard = () => {
        navigate('/app/sales/Store-list')
    }

    return (
        <>
            <StoreForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}                
            />
        </>
    )
}

export default StoreNew
