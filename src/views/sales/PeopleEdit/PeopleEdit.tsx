import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getPeople,
    updatePeople,
    deletePeople,
    useAppSelector,
    useAppDispatch,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import PeopleForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/sales/PeopleForm'
import isEmpty from 'lodash/isEmpty'

injectReducer('salesPeopleEdit', reducer)

const PeopleEdit = () => {
    const dispatch = useAppDispatch()
    const { peopleId,pType } = useParams();

    const location = useLocation()
    const navigate = useNavigate()

    const PeopleData = useAppSelector(
        (state) => state.salesPeopleEdit.data.PeopleData
    )
    const loading = useAppSelector(
        (state) => state.salesPeopleEdit.data.loading
    )

    const { companyDefault } = useAppSelector(
        (state) => state.auth.user
    )

    const fetchData = (data: { id: string,idTypePeople:string }) => {
        dispatch(getPeople(data))
    }

    const handleFormSubmit = async (values: FormModel, setSubmitting: SetSubmitting ) => {
        values.idCompany=companyDefault?.id;
        setSubmitting(true)
        const success = await updatePeople(values)
        setSubmitting(false)
        if (success) {
            popNotification('actualizado')
        }
    }

    const handleDiscard = () => {
        navigate('/app/people-list')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deletePeople({ id: PeopleData.id })
        if (success) {
            popNotification('eliminado')
        }
    }

    const popNotification = (keyword: string) => {
        toast.push(
            <Notification
                title={`Proceso de ${keyword}`}
                type="success"
                duration={2500}
            >
                {(pType=="account")?'La cuenta':'El cliente'} fue {keyword} correctamente
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        if(pType=="account"){
            navigate('/app/home')
        }else{
            navigate('/app/people-list')
        }
        
    }

    useEffect(() => {
        /*const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )*/
        const path:any=peopleId;
        const rquestParam = { id: path, idTypePeople:(pType=="account")?"1":"2"}
        
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <>
            
            <Loading loading={loading}>
                {!isEmpty(PeopleData) && (
                    <>
                        <PeopleForm
                            type="edit"
                            pType={pType}
                            initialData={PeopleData}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}                            
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(PeopleData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No People found!"
                    />
                    <h3 className="mt-8">No People found!</h3>
                </div>
            )}
        </>
    )
}

export default PeopleEdit
