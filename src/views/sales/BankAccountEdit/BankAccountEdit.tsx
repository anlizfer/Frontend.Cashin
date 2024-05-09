import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getBankAccount,
    updateBankAccount,
    deleteBankAccount,
    useAppSelector,
    useAppDispatch,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import BankAccountForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/sales/BankAccountForm'
import isEmpty from 'lodash/isEmpty'

injectReducer('salesBankAccountEdit', reducer)

const BankAccountEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const BankAccountData = useAppSelector(
        (state) => state.salesBankAccountEdit.data.BankAccountData
    )
    const loading = useAppSelector(
        (state) => state.salesBankAccountEdit.data.loading
    )

    const { companyDefault } = useAppSelector(
        (state) => state.auth.user
    )

    const fetchData = (data: { id: string }) => {        
        dispatch(getBankAccount(data))
    }

    const handleFormSubmit = async (values: FormModel, setSubmitting: SetSubmitting ) => {
        values.idCompany=companyDefault?.id;
        setSubmitting(true)
        const success = await updateBankAccount(values)
        setSubmitting(false)
        if (success) {
            popNotification('actualizada')
        }
    }

    const handleDiscard = () => {
        navigate('/app/BankAccount-list')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteBankAccount({ id: BankAccountData.id })
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
                La cuenta bancaria fue {keyword} correctamente
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/app/bank-account-list')
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
                {!isEmpty(BankAccountData) && (
                    <>
                        <BankAccountForm
                            type="edit"
                            initialData={BankAccountData}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}                            
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(BankAccountData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No BankAccount found!"
                    />
                    <h3 className="mt-8">No BankAccount found!</h3>
                </div>
            )}
        </>
    )
}

export default BankAccountEdit
