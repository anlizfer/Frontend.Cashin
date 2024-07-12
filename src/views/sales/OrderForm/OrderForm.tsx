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
import CustomerInformationFields from './CustomerInformationFields'
import ProductsInformationFields from './ProductsInformationField'
injectReducer('salesOrderForm', reducer)

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type Options = {
    label: string
    value: string
}[]

type InitialData = {
    id?: string
    idBranch?:string
    idStore?:string
    idDeliveryCompany?:string
    shippingWithCollection?:number
    dateDelivery?: string   
    status?: number    
    idCompany?:number  
    idPeople?:string
    observation?:string
    idPeopleContact?:string
    lineProducts?:any[],
    taxValor?:number,
    valorBruto?:number,
    valorTotal?:number,
    cant?:string,
    valorUnit?:string,
    idProduct?: string,
    idTaxes?:Options[]
    taxRate?:string,   
    discount?:string    
}

export type FormModel = Omit<InitialData, 'idTaxes'> & {
    idTaxes: { label: string; value: string }[] | string[]
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
    dateDelivery: Yup.string().required('La fecha de entrega  es requerida'),

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
            id:"",
            idBranch:"",
            idStore:"",
            idDeliveryCompany:"",
            shippingWithCollection:0,
            dateDelivery:"",
            status:0,
            idCompany:0,
            idPeople:"",
            observation:"",
            idPeopleContact:"",
            lineProducts:[],
            taxValor:0,
            valorBruto:0,
            valorTotal:0,
            cant:"1",
            valorUnit:"0",
            idProduct: "",
            idTaxes:[],
            taxRate:"",   
            discount:"0"  
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
                                        type={type}
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
