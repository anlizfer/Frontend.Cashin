import PeopleForm, {
    FormModel,
    SetSubmitting,
} from '@/views/sales/PeopleForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreatePeople } from '@/services/PeopleService'

const PeopleNew = () => {
    const navigate = useNavigate()

    const addPeople = async (data: FormModel) => {       
        data.idCompany=1;
        const response = await apiCreatePeople<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addPeople(values)
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
            navigate('/app/people-list')
        }
    }

    const handleDiscard = () => {
        navigate('/app/people-list')
    }

    return (
        <>
            <PeopleForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}                
            />
        </>
    )
}

export default PeopleNew
