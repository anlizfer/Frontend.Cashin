import BranchForm, {
    FormModel,
    SetSubmitting,
} from '@/views/sales/BranchForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateBranch } from '@/services/BranchService'
import { useAppSelector } from '../SalesDashboard/store'

const BranchNew = () => {
    const navigate = useNavigate()
    const { companyDefault } = useAppSelector(
        (state) => state.auth.user
    )

    const addBranch = async (data: FormModel) => {
        data.idCompany=companyDefault?.id;
        const response = await apiCreateBranch<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addBranch(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Sucursal añadida exitosamente'}
                    type="success"
                    duration={2500}
                >
                    Sucursal generada correctamente
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/Branch-list')
        }
    }

    const handleDiscard = () => {
        navigate('/app/sales/branch-list')
    }

    return (
        <>
            <BranchForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}                
            />
        </>
    )
}

export default BranchNew
