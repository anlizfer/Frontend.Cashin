import { useState, useRef, forwardRef, useEffect } from 'react'
import { HiOutlineFilter, HiOutlineSearch } from 'react-icons/hi'
import {
    getBankAccounts,
    setFilterData,
    initialTableData,
    useAppDispatch,
    useAppSelector,    
    GetBankAccountsResponse,
    GetBankAccountsRequest,    
} from '../store'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import Radio from '@/components/ui/Radio'
import Drawer from '@/components/ui/Drawer'
import { Field, Form, Formik, FormikProps, FieldProps } from 'formik'
import type { MouseEvent } from 'react'
import { TableQueries } from '@/@types/common'

type FormModel = {
    name: string
    BankAccount: string[]
    status: number[]
    BankAccountstatus: number
}

type FilterFormProps = {
    onSubmitComplete?: () => void,
    dataCat:any
}

type DrawerFooterProps = {
    onSaveClick: (event: MouseEvent<HTMLButtonElement>) => void
    onCancel: (event: MouseEvent<HTMLButtonElement>) => void
}

const FilterForm = forwardRef<FormikProps<FormModel>, FilterFormProps>(
    ({ onSubmitComplete,dataCat}, ref) => {
        const dispatch = useAppDispatch()

        const filterData = useAppSelector(
            (state) => state.salesBankAccountList.data.filterData
        )        

        const handleSubmit = (values: FormModel) => {
            onSubmitComplete?.()            
            dispatch(setFilterData(values))
            let filterDataBankAccount:GetBankAccountsRequest={
                pageIndex:1,
                pageSize:10,
                query:"",
                filterData:{
                    name:values.name,
                    BankAccount:[],
                    status:[],
                    BankAccountstatus:1,
                    idCompany:1
                }
                
            };
            
            dispatch(getBankAccounts(filterDataBankAccount))
        }

        const getBankAccountComponent=()=>{
            
            
        }



        return (
            <Formik
                enableReinitialize
                innerRef={ref}
                initialValues={filterData}
                onSubmit={(values) => {
                    handleSubmit(values)
                }}
            >
                {({ values, touched, errors }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                invalid={errors.name && touched.name}
                                errorMessage={errors.name}
                            >
                                <h6 className="mb-4">Por Palabra Clave</h6>
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Palabra Clave"
                                    component={Input}
                                    prefix={
                                        <HiOutlineSearch className="text-lg" />
                                    }
                                />
                            </FormItem>
                            
                            
                            <FormItem
                                invalid={
                                    errors.BankAccountstatus &&
                                    touched.BankAccountstatus
                                }
                                errorMessage={errors.BankAccountstatus}
                            >
                                <h6 className="mb-4">Estado Cuenta</h6>
                                <Field name="BankAccountstatus">
                                    {({ field, form }: FieldProps) => (
                                        <Radio.Group
                                            vertical
                                            value={values.BankAccountstatus}
                                            onChange={(val) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    val
                                                )
                                            }
                                        >                                         
                                            <Radio value={0}>Desactivados</Radio>
                                            <Radio value={1}>Activados</Radio>
                                        </Radio.Group>
                                    )}
                                </Field>
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        )
    }
)

const DrawerFooter = ({ onSaveClick, onCancel }: DrawerFooterProps) => {
    return (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={onCancel}>
                Cancelar
            </Button>
            <Button size="sm" variant="solid" onClick={onSaveClick}>
                Filtrar
            </Button>
        </div>
    )
}

const BankAccountFilter = () => {
    const formikRef = useRef<FormikProps<FormModel>>(null)

    const [dataBankAccount,setDataBankAccount]=useState<GetBankAccountsResponse>();
        

    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => {
        setIsOpen(true)
    }    

    const onDrawerClose = () => {
        setIsOpen(false)
    }

    const formSubmit = () => {
        formikRef.current?.submitForm()                
    }

    return (
        <>
            <Button
                size="sm"
                className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4"
                icon={<HiOutlineFilter />}
                onClick={() => openDrawer()}
            >
                Filtrar
            </Button>
            <Drawer
                title="Filtro Cuentas Bancarias"
                isOpen={isOpen}
                footer={
                    <DrawerFooter
                        onCancel={onDrawerClose}
                        onSaveClick={formSubmit}
                    />
                }
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
            >
                <FilterForm ref={formikRef} onSubmitComplete={onDrawerClose} dataCat={dataBankAccount} />
            </Drawer>
        </>
    )
}

FilterForm.displayName = 'FilterForm'

export default BankAccountFilter
