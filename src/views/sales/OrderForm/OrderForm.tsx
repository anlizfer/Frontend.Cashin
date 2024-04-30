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
import CustomerInformationFields from './CustomerInformationFields'
import ProductsInformationFields from './ProductsInformationField'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    id?: string
    name?: string   
    status?: number    
    idCompany?:number    
}

export type FormModel = Omit<InitialData, 'tags'> & {
    tags: { label: string; value: string }[] | string[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type OrderForm = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: FormModel, setSubmitting: SetSubmitting) => void
}

const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
    name: Yup.string().required('El Nombre de la categoría es Requerido'),    

})

const DeleteOrderButton = ({ onDelete }: { onDelete: OnDelete }) => {
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
                ¿Estás seguro de que deseas eliminar esta orden? Todo los registros
                     relacionados con esta orden también se eliminarán. Esta acción
                     no se puede deshacer.
                </p>
            </ConfirmDialog>
        </>
    )
}

const OrderForm = forwardRef<FormikRef, OrderForm>((props, ref) => {
    const {
        type,
        initialData = {
            id: '',
            name: '',           
            idCompany:1,            
        },
        onFormSubmit,
        onDiscard,
        onDelete,
    } = props

    const newId = useUniqueId('Order-')



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
                                    <CustomerInformationFields
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
                                    />
                                </div>
                                
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    {type === 'edit' && (
                                        <DeleteOrderButton
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

OrderForm.displayName = 'OrderForm'

export default OrderForm
