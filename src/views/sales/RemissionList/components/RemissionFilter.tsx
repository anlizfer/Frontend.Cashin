import { useState, useRef, forwardRef, useEffect } from 'react'
import { HiOutlineFilter, HiOutlineSearch } from 'react-icons/hi'
import {
    getRemissions,
    setFilterData,
    initialTableData,
    useAppDispatch,
    useAppSelector,    
    GetRemissionsResponse,
    GetRemissionsRequest,    
} from '../store'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import Radio from '@/components/ui/Radio'
import Drawer from '@/components/ui/Drawer'
import Select from '@/components/ui/Select'
import { Field, Form, Formik, FormikProps, FieldProps } from 'formik'
import type { MouseEvent } from 'react'
import { TableQueries } from '@/@types/common'
import { apiGetStatusRemission } from '@/services/RemissionServices'

type FormModel = {
    name: string    
    status: number[]    
    idStatusRemission:number
    
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
        const [statusRemission,setStatusRemission] = useState([]);
        useEffect(()=>{
            fetchStatusRemission();            
        },[]);

        const fetchStatusRemission=async ()=>{            
            let dataStatusRemission:any = await apiGetStatusRemission();
            let statusOrd:any=[];            
            dataStatusRemission=dataStatusRemission.data;
            dataStatusRemission.forEach((element:any) => {
                statusOrd.push({label:element.name, value:element.id});
            });
            
            setStatusRemission(statusOrd);
        };

        

        const dispatch = useAppDispatch()

        const filterData = useAppSelector(
            (state) => state.salesRemissionList.data.filterData
        )        

        const handleSubmit = (values: FormModel) => {
            onSubmitComplete?.()            
            dispatch(setFilterData(values))
            let filterDataRemission:GetRemissionsRequest={
                pageIndex:1,
                pageSize:10,
                query:"",
                filterData:{
                    name:values.name,                    
                    status:[],                    
                    idRemission:1,
                    idStatusRemission:0

                }
                
            };
            
            dispatch(getRemissions(filterDataRemission))
        }

        const getRemissionComponent=()=>{
            
            
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
                                label="Estado Orden"
                                invalid={
                                    (errors.idStatusRemission && touched.idStatusRemission) as boolean
                                }
                                errorMessage={errors.idStatusRemission}
                            >
                                <Field name="idStatusRemission">
                                    {({ field, form }: FieldProps) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            options={statusRemission}                                           
                                            
                                            onChange={(val) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    val
                                                )
                                            }
                                        />
                                    )}
                                </Field>

                                
                            </FormItem>
                            
                            
                            <FormItem
                                invalid={
                                    errors.status &&
                                    touched.status
                                }
                                errorMessage={errors.status?.toString()}
                            >
                                <h6 className="mb-4">Estado</h6>
                                <Field name="status">
                                    {({ field, form }: FieldProps) => (
                                        <Radio.Group
                                            vertical
                                            value={values.status}
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

const RemissionFilter = () => {
    const formikRef = useRef<FormikProps<FormModel>>(null)

    const [dataRemission,setDataRemission]=useState<GetRemissionsResponse>();
        

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
                title="Filtro Órdenes"
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
                <FilterForm ref={formikRef} onSubmitComplete={onDrawerClose} dataCat={dataRemission} />
            </Drawer>
        </>
    )
}

FilterForm.displayName = 'FilterForm'

export default RemissionFilter
