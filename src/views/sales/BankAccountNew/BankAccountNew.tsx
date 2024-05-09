import BankAccountForm, {
    FormModel,
    SetSubmitting,
} from '@/views/sales/BankAccountForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateBankAccount } from '@/services/BankAccountServices'
import { useAppSelector } from '../SalesDashboard/store'

const BankAccountNew = () => {
    const navigate = useNavigate()
    const { companyDefault } = useAppSelector(
        (state) => state.auth.user
    )

    const addBankAccount = async (data: FormModel) => {
        data.idCompany=companyDefault?.id;
        const response = await apiCreateBankAccount<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addBankAccount(values)
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
            navigate('/app/BankAccount-list')
        }
    }

    const handleDiscard = () => {
        navigate('/app/sales/BankAccount-list')
    }

    return (
        <>
            <BankAccountForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}                
            />
        </>
    )
}

export default BankAccountNew
