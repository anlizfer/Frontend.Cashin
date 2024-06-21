import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getInventory,
    updateInventory,
    deleteInventory,
    useAppSelector,
    useAppDispatch,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import InventoryForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/sales/InventoryForm'
import isEmpty from 'lodash/isEmpty'


injectReducer('salesInventoryEdit', reducer)

const InventoryEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const InventoryData = useAppSelector(
        (state) => state.salesInventoryEdit.data.InventoryData
    )
    const loading = useAppSelector(
        (state) => state.salesInventoryEdit.data.loading
    )

    const { companyDefault } = useAppSelector(
        (state) => state.auth.user
    )

    const fetchData = (data: { id: string }) => {        
        dispatch(getInventory(data))
    }

    const handleFormSubmit = async (values: FormModel, setSubmitting: SetSubmitting ) => {
        values.idCompany=companyDefault?.id;
        setSubmitting(true)
        const success = await updateInventory(values)
        setSubmitting(false)
        if (success) {
            popNotification('actualizada')
        }
    }

    const handleDiscard = () => {
        navigate('/app/Inventory-list')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteInventory({ id: InventoryData.id })
        if (success) {
            popNotification('eliminada')
        }
    }

    const popNotification = (keyword: string) => {
        toast.push(
            <Notification
                title={`Proceso de ${keyword}`}
                type="success"
                duration={2500}
            >
                La cateogría fue {keyword} correctamente
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/app/inventories-list')
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { id: path }
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(InventoryData) && (
                    <>
                        <InventoryForm
                            type="edit"
                            initialData={InventoryData}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}                            
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(InventoryData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No Inventory found!"
                    />
                    <h3 className="mt-8">No Inventory found!</h3>
                </div>
            )}
        </>
    )
}

export default InventoryEdit
