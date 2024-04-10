import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getCompany,
    updateCompany,
    deleteCompany,
    useAppSelector,
    useAppDispatch,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import CompanyForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/sales/CompanyForm'
import isEmpty from 'lodash/isEmpty'

injectReducer('salesCompanyEdit', reducer)

const CompanyEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const CompanyData = useAppSelector(
        (state) => state.salesCompanyEdit.data.CompanyData
    )
    const loading = useAppSelector(
        (state) => state.salesCompanyEdit.data.loading
    )

    const fetchData = (data: { id: string }) => {
        dispatch(getCompany(data))
    }

    const handleFormSubmit = async (values: FormModel, setSubmitting: SetSubmitting ) => {
        
        setSubmitting(true)
        const success = await updateCompany(values)
        setSubmitting(false)
        if (success) {
            popNotification('actualizada')
        }
    }

    const handleDiscard = () => {
        navigate('/app/Company-list')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteCompany({ id: CompanyData.id })
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
                La compañía fue {keyword} correctamente
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/app/companies-list')
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
                {!isEmpty(CompanyData) && (
                    <>
                        <CompanyForm
                            type="edit"
                            initialData={CompanyData}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}                            
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(CompanyData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No Company found!"
                    />
                    <h3 className="mt-8">No Company found!</h3>
                </div>
            )}
        </>
    )
}

export default CompanyEdit
