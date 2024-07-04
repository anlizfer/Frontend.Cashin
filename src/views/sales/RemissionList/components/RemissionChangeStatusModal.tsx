import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleStatusConfirmation,    
    deleteRemission,
    changeStatusRemission,
    useAppDispatch,
    useAppSelector,
} from '../store'
import { Select } from '@/components/ui'
import { useEffect, useRef, useState } from 'react'

const RemissionChangeStatusConfirmation = () => {
    const dispatch = useAppDispatch();    
    const [idStatusRemission, setIdStatusRemission] = useState<number>(0);
    useEffect(() => {
        console.log("select status remission=>", idStatusRemission);
    }, [idStatusRemission]);
    

    

    const dialogOpen = useAppSelector(
        (state) => state.salesRemissionList.data.statusConfirmation
    )
    const selectedRemission = useAppSelector(
        (state) => state.salesRemissionList.data.selectedRemission
    )
    const tableData = useAppSelector(
        (state) => state.salesRemissionList.data.tableData
    )

    const statusRemissionData = useAppSelector(
        (state) => state.salesRemissionList.data.statusRemissionData
    )

    

    const onDialogClose = () => {
        dispatch(toggleStatusConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleStatusConfirmation(false))
        const success = await changeStatusRemission({ id: selectedRemission, idStatusRemission:idStatusRemission.toString()})

        if (success) {
            //dispatch(getRemissions(tableData))
            

            toast.push(
                <Notification
                    title={'Cambio de Estado'}
                    type="success"
                    duration={2500}
                    onClose={()=>{location.reload()}}
                >
                    La Remisión ha cambiado de estado.
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
            title="Cambiar Estado Remisión"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
            ¿Estás seguro de que deseas cambiar el estado de esta remisión?            
            </p>
            <Select  className='mt-5' 
                options={statusRemissionData} 
                placeholder="Estado Remisión" 
                onChange={(option)=>{
                    setIdStatusRemission(option?.value);
                }}
            >
            </Select>
        </ConfirmDialog>
    )
}

export default RemissionChangeStatusConfirmation
