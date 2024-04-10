import CompanyForm, {
    FormModel,
    SetSubmitting,
} from '@/views/sales/CompanyForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateCompany } from '@/services/CompanyService'

const CompanyNew = () => {
    const navigate = useNavigate()

    const addCompany = async (data: FormModel) => {        
        const response = await apiCreateCompany<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addCompany(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Compañía añadida exitosamente'}
                    type="success"
                    duration={2500}
                >
                    Compañía generada correctamente
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/Company-list')
        }
    }

    const handleDiscard = () => {
        navigate('/app/sales/Company-list')
    }

    return (
        <>
            <CompanyForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}                
            />
        </>
    )
}

export default CompanyNew
