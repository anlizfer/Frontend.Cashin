import reducer from './store'
import { injectReducer } from '@/store'
import { forwardRef, useState } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import hooks from '@/components/ui/hooks'
import StickyFooter from '@/components/shared/StickyFooter'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Form, Formik, FormikProps } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import ProductsInformationFields from './ProductsInformationField'
injectReducer('salesRemissionForm', reducer)

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    id?: string
    idBranch?:string
    idStore?:string    
    idBranchDestination?:string
    idStoreDestination?:string 
    dateRemission?: string   
    status?: number    
    idCompany?:number      
    observation?:string    
    lineProducts?:any[],    
    cant?:string,    
    idProduct?: string,     
}

export type FormModel = Omit<InitialData, 'tags'> & {
    tags: { label: string; value: string }[] | string[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type RemissionForm = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: FormModel, setSubmitting: SetSubmitting) => void
}

const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
    dateRemission: Yup.string().required('La fecha de la remisión  es requerida'),

})

const DeleteRemissionButton = ({ onDelete }: { onDelete: OnDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Eliminar
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="Borrar orden"
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>
                ¿Estás seguro de que deseas eliminar esta remisión? Todo los registros
                     relacionados con esta remisión también se eliminarán. Esta acción
                     no se puede deshacer.
                </p>
            </ConfirmDialog>
        </>
    )
}

const RemissionForm = forwardRef<FormikRef, RemissionForm>((props, ref) => {
    const {
        type,
        initialData = {
            id:"",
            idBranch:"",
            idStore:"",
            idBranchDestination:"",
            idStoreDestination:"",
            dateRemission:"",
            status:0,
            idCompany:0,            
            observation:"",            
            lineProducts:[],            
            cant:"1",            
            idProduct: ""
            
        },
        onFormSubmit,
        onDiscard,
        onDelete,
    } = props

    const newId = useUniqueId('Remission-')



    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,                   
                }}
                validationSchema={validationSchema}
                onSubmit={(values: FormModel, { setSubmitting }) => {
                    
                    const formData = cloneDeep(values)
                    
                    if (type === 'new') {
                        formData.id = newId                        
                    }
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
                                <div className="lg:col-span-3">
                                    <BasicInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                </div>                               

                                <div className="lg:col-span-3">
                                  <ProductsInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        type={type}
                                    />
                                </div>
                                
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="bremission-t bg-white dark:bg-gray-800 bremission-gray-200 dark:bremission-gray-700"
                            >
                                <div>
                                    {type === 'edit' && (
                                        <DeleteRemissionButton
                                            onDelete={onDelete as OnDelete}
                                        />
                                    )}
                                </div>
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        onClick={() => onDiscard?.()}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Guardar
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

RemissionForm.displayName = 'RemissionForm'

export default RemissionForm
