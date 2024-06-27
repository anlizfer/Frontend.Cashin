import InventoryForm, {
    FormModel,
    SetSubmitting,
} from '@/views/sales/InventoryForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateInventory } from '@/services/InventoryService'
import { useAppSelector } from '../SalesDashboard/store'

const InventoryNew = () => {
    const navigate = useNavigate()
    const { companyDefault } = useAppSelector(
        (state) => state.auth.user
    )

    const addInventory = async (data: FormModel) => {
        data.idCompany=companyDefault?.id;
        const response = await apiCreateInventory<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addInventory(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Inventario añadido exitosamente'}
                    type="success"
                    duration={2500}
                >
                    Inventario generado correctamente
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/inventory-list')
        }
    }

    const handleDiscard = () => {
        navigate('/app/sales/Inventory-list')
    }

    return (
        <>
            <InventoryForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}                
            />
        </>
    )
}

export default InventoryNew
