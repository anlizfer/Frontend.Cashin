import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import Select from '@/components/ui/Select'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { useAppSelector,useAppDispatch,setUser, CompanyState } from '@/store'
import { setIdStore } from './store'


import { useEffect, useState } from 'react'
import { apiGetBranchRemission, apiGetDeliveryCompanies, apiGetStatusRemission, apiGetStoreRemission } from '@/services/RemissionServices'
import Checkbox from '@/components/ui/Checkbox/Checkbox'




type FormFieldsName = {

    dateDelivery: string    
    idBranch:string
    idStore:string
    shippingWithCollection:number
    idDeliveryCompany:string
}

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {        
        idBranch: string
        idStore:string
        shippingWithCollection:number
        idDeliveryCompany:string
        [key: string]: unknown
    }
}

const BasicInformationFields = (props: BasicInformationFields) => {    
    const { values = { idBranch: '', idStore:'',shippingWithCollection:0, idDeliveryCompany:'', dateDelivery:''}, touched, errors } = props

    const { avatar, userName, authority, email,companies,companyDefault } = useAppSelector(
        (state) => state.auth.user
    )
    const dispatch = useAppDispatch();    
    const [branch,setBranch] = useState<any>([]);
    const [store,setStore]=useState<any>([]);
    const [deliveryCompanies,setDeliveryCompanies]=useState<any>([]);
    
    useEffect(()=>{
        if(values.dateDelivery==undefined || values.dateDelivery==''){
            values.dateDelivery=obtenerFechaActual();
        }
        
        GetBranches();     
        GetDeliveryCompanies();   
    },[]);

    useEffect(()=>{
        GetStores(values.idBranch);
    },[values.idBranch]);

    const obtenerFechaActual=()=> {
        const hoy = new Date();
        const año = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');
        return `${año}-${mes}-${dia}`;
    }

    const GetBranches = async ()=>{
        let dataBranch:any = await apiGetBranchRemission({idCompany:1});
        let branchD:any=[];
        dataBranch=dataBranch.data;
        dataBranch.forEach((element:any) => {
            branchD.push({label:element.name, value:element.id});
        });          
        if(values.idBranch==undefined || values.idBranch==''){
            values.idBranch=branchD[0].value;
        }
        setBranch(branchD);        
    };

    const GetStores = async (idBr:any)=>{
        let dataStore:any = await apiGetStoreRemission({idBranch:idBr});
        let storeD:any=[];

        dataStore=dataStore.data;
        dataStore.forEach((element:any) => {
            storeD.push({label:element.name, value:element.id});
        });      

        if(values.idStore==undefined || values.idStore==''){
            values.idStore=storeD[0].value;
            dispatch(setIdStore(storeD[0].value));
        }


        

        setStore(storeD);
    };

    const GetDeliveryCompanies=async ()=>{
        let dataDeliveryCompany:any = await apiGetDeliveryCompanies();
        let deliveryCompany:any=[];

        dataDeliveryCompany=dataDeliveryCompany.data;
        dataDeliveryCompany.forEach((element:any) => {
            deliveryCompany.push({label:element.name, value:element.id});
        });      

        if(values.idDeliveryCompany==undefined || values.idDeliveryCompany==''){
            values.idDeliveryCompany=deliveryCompany[0].value;
        }

        setDeliveryCompanies(deliveryCompany);



    };

    return (
        <AdaptableCard>
            <h5>Nueva Remisión</h5>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                <div className="col-span-2">
                    <FormItem
                        label="Fecha de Remisión"
                        invalid={(errors.dateDelivery && touched.dateDelivery) as boolean}
                        errorMessage={errors.dateDelivery}
                    >   
                        <Field
                            type="date"
                            autoComplete="off"
                            name="dateDelivery"
                            placeholder="Fecha"
                            component={Input}
                        />
                    </FormItem>
                </div>

                <div className="col-span-5">

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4"  style={{backgroundColor:"#f1f1f1", paddingLeft:"5px", paddingRight:"5px", border:"1px solid #ccc"}}>

                        <div className="col-span-6">
                            
                            <FormItem
                                label="Sucursal Origen"
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

                        <div className="col-span-6">
                            
                            <FormItem
                                label="Bodega Origen"
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
                                                dispatch(setIdStore(option?.value));
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

                    </div>                    
                </div>


                <div className="col-span-5">

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4"  style={{backgroundColor:"#f1f1f1", paddingLeft:"5px", paddingRight:"5px", border:"1px solid #ccc"}}>

                        <div className="col-span-6">
                            
                            <FormItem
                                label="Sucursal Destino"
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

                        <div className="col-span-6">
                            
                            <FormItem
                                label="Bodega Destino"
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
                                                dispatch(setIdStore(option?.value));
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

                    </div>                    
                </div>

                

                

                

                
            </div>
        </AdaptableCard>
    )
}

export default BasicInformationFields
