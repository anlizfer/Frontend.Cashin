import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getOrder,
    updateOrder,
    deleteOrder,
    useAppSelector,
    useAppDispatch,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import OrderForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/sales/OrderForm'
import isEmpty from 'lodash/isEmpty'

injectReducer('salesOrderEdit', reducer)

const OrderEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const OrderData = useAppSelector(
        (state) => state.salesOrderEdit.data.OrderData
    )
    const loading = useAppSelector(
        (state) => state.salesOrderEdit.data.loading
    )

    const { companyDefault } = useAppSelector(
        (state) => state.auth.user
    )

    const fetchData = (data: { id: string }) => {        
        dispatch(getOrder(data))
    }

    const handleFormSubmit = async (values: FormModel, setSubmitting: SetSubmitting ) => {
        values.idCompany=companyDefault?.id;
        setSubmitting(true)
        const success = await updateOrder(values)
        setSubmitting(false)
        if (success) {
            popNotification('actualizada')
        }
    }

    const handleDiscard = () => {
        navigate('/app/orders-list')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteOrder({ id: OrderData.id })
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
        navigate('/app/orders-list')
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
                {!isEmpty(OrderData) && (
                    <>
                        <OrderForm
                            type="edit"
                            initialData={OrderData}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}                            
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(OrderData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No Order found!"
                    />
                    <h3 className="mt-8">No Order found!</h3>
                </div>
            )}
        </>
    )
}

export default OrderEdit
