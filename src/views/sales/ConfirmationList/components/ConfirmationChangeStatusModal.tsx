import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleStatusConfirmation,    
    deleteConfirmation,
    changeStatusConfirmation,
    useAppDispatch,
    useAppSelector,
} from '../store'
import { Select } from '@/components/ui'
import { useEffect, useRef, useState } from 'react'

const ConfirmationChangeStatusConfirmation = () => {
    const dispatch = useAppDispatch();    
    const [idStatusConfirmation, setIdStatusConfirmation] = useState<number>(0);
    useEffect(() => {
        console.log("select status order=>", idStatusConfirmation);
    }, [idStatusConfirmation]);
    

    

    const dialogOpen = useAppSelector(
        (state) => state.salesConfirmationList.data.statusConfirmation
    )
    const selectedConfirmation = useAppSelector(
        (state) => state.salesConfirmationList.data.selectedConfirmation
    )
    const tableData = useAppSelector(
        (state) => state.salesConfirmationList.data.tableData
    )

    const statusConfirmationData = useAppSelector(
        (state) => state.salesConfirmationList.data.statusConfirmationData
    )

    

    const onDialogClose = () => {
        dispatch(toggleStatusConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleStatusConfirmation(false))
        const success = await changeStatusConfirmation({ id: selectedConfirmation, idStatusConfirmation:idStatusConfirmation.toString()})

        if (success) {
            //dispatch(getConfirmations(tableData))
            

            toast.push(
                <Notification
                    title={'Cambio de Estado'}
                    type="success"
                    duration={2500}
                    onClose={()=>{location.reload()}}
                >
                    La Orden ha cambiado de estado.
                </Notification>,
                {
                    placement: 'top-center',
                }
            )

            //
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="Cambiar Estado Orden"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
            ¿Estás seguro de que deseas cambiar el estado de esta Orden?            
            </p>
            <Select  className='mt-5' 
                options={statusConfirmationData} 
                placeholder="Estado Orden" 
                onChange={(option)=>{
                    setIdStatusConfirmation(option?.value);
                }}
            >
            </Select>
        </ConfirmDialog>
    )
}

export default ConfirmationChangeStatusConfirmation
