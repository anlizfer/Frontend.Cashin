import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import Select from '@/components/ui/Select'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { useAppSelector,useAppDispatch,setUser, CompanyState } from '@/store'
import { useEffect, useState } from 'react'
import { apiGetBranchOrder, apiGetStatusOrder, apiGetStoreOrder } from '@/services/OrderServices'
import Checkbox from '@/components/ui/Checkbox/Checkbox'

type FormFieldsName = {
    date: string    
    idBranch:string
    idStore:string
    shippingWithCollection:number
}

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {        
        idBranch: string
        idStore:string
        shippingWithCollection:number
        [key: string]: unknown
    }
}

const BasicInformationFields = (props: BasicInformationFields) => {    
    const { values = { idBranch: '', idStore:'',shippingWithCollection:0}, touched, errors } = props

    const { avatar, userName, authority, email,companies,companyDefault } = useAppSelector(
        (state) => state.auth.user
    )

    const [branch,setBranch] = useState<any>([]);
    const [store,setStore]=useState<any>([]);
    
    useEffect(()=>{
        GetBranches();        
    },[]);

    useEffect(()=>{
        GetStores(values.idBranch);
    },[values.idBranch]);

    const GetBranches = async ()=>{
        let dataBranch:any = await apiGetBranchOrder({idCompany:1});
        let branchD:any=[];
        dataBranch=dataBranch.data;
        dataBranch.forEach((element:any) => {
            branchD.push({label:element.name, value:element.id});
        });            
        setBranch(branchD);
    };

    const GetStores = async (idBr:any)=>{
        let dataStore:any = await apiGetStoreOrder({idBranch:idBr});
        let storeD:any=[];

        dataStore=dataStore.data;
        dataStore.forEach((element:any) => {
            storeD.push({label:element.name, value:element.id});
        });      
        setStore(storeD);
    };

    return (
        <AdaptableCard>
            <h5>Nueva Orden</h5>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <div className="col-span-1">
                    <FormItem
                        label="Fecha de Entrega"
                        invalid={(errors.date && touched.date) as boolean}
                        errorMessage={errors.date}
                    >   
                        <Field
                            type="date"
                            autoComplete="off"
                            name="date"
                            placeholder="Fecha"
                            component={Input}
                        />
                    </FormItem>
                </div>

                <div className="col-span-1">

                    <FormItem
                        label="Sucursal"
                        invalid={
                                (errors.idBranch && touched.idBranch) as boolean
                        }
                            errorMessage={errors.idBranch}
                        >
                        <Field name="idBranch">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={branch}
                                    value={branch.filter(
                                        (state:any) =>
                                            state.value === values.idBranch
                                    )}
                                    onChange={(option) =>{                        
                                        form.setFieldValue(
                                                    field.name,
                                                    option?.value
                                                )
                                        }
                                           
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        label="Bodega"
                        invalid={
                                (errors.idStore && touched.idStore) as boolean
                        }
                            errorMessage={errors.idStore}
                        >
                        <Field name="idStore">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={store}
                                    value={store.filter(
                                        (state:any) =>
                                            state.value === values.idStore
                                    )}
                                    onChange={(option) =>{                        
                                        form.setFieldValue(
                                                    field.name,
                                                    option?.value
                                                )
                                        }
                                           
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        label="Envío con Recaudo"
                        invalid={(errors.shippingWithCollection && touched.shippingWithCollection) as boolean}
                        errorMessage={errors.shippingWithCollection}
                    >   
                        <Field
                            type="checkbox"
                            autoComplete="off"
                            name="shippingWithCollection"                            
                            component={Checkbox}
                        />
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default BasicInformationFields
