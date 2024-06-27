import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import Select from '@/components/ui/Select'
import { useEffect, useState } from 'react'
import { apiGetBranchOrder, apiGetStoreOrder } from '@/services/OrderServices'
import { useAppSelector } from '@/store'
import { apiGetSalesProducts } from '@/services/SalesService'

type FormFieldsName = {
    name: string        
    idBranch: string
    idStore:string  
    idProduct:string
    transactionType:number
    cant:number
    
}

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {        
        idBranch: string
        idStore:string     
        idProduct:string
        transactionType:string
        [key: string]: unknown
    }
}

const BasicInformationFields = (props: BasicInformationFields) => {
    
    const { values = { idBranch: '', idStore:'', idProduct:'', transactionType:'1'}, touched, errors } = props
    const [branch,setBranch] = useState<any>([]);
    const [store,setStore]=useState<any>([]);
    const [products,setProducts]=useState<any>([]);
    const [transactionTypes,setTransactionType]=useState<any>([{label:'Entrada',value:"1"},{label:'Salida',value:"2"}]);

    const { avatar, userName, authority, email,companies,companyDefault } = useAppSelector(
        (state) => state.auth.user
    )
    

    useEffect(()=>{                
        GetBranches();             
        GetProducts();
        values.transactionType="1";
    },[]);

    useEffect(()=>{
        GetStores(values.idBranch);
    },[values.idBranch]);

    const GetBranches = async ()=>{
        let dataBranch:any = await apiGetBranchOrder({idCompany:companyDefault?.id});
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
        let dataStore:any = await apiGetStoreOrder({idBranch:idBr});
        let storeD:any=[];

        dataStore=dataStore.data;
        dataStore.forEach((element:any) => {
            storeD.push({label:element.name, value:element.id});
        });      

        if(values.idStore==undefined || values.idStore==''){
            values.idStore=storeD[0].value;
        }

        setStore(storeD);
    };

    const GetProducts=async ()=>{
        let dataProduct:any = await apiGetSalesProducts({idCompany:companyDefault?.id});
        let productD:any=[];
        dataProduct=dataProduct.data;
        dataProduct.forEach((element:any) => {
            productD.push({label:`${element.productCode} - ${element.name} `, value:element.id, ...element});
        });            
        setProducts(productD);
    };

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Movimiento de Inventario</h5>            


            <div className="grid grid-cols-1 md:grid-cols-12 gap-4  mt-5">

                
                <div className="col-span-5">

                    <FormItem
                        label="Producto"
                        invalid={
                                (errors.idProduct && touched.idProduct) as boolean
                        }
                            errorMessage={errors.idProduct}
                        >
                        <Field name="idProduct">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={products}
                                    value={products.filter(
                                        (state:any) =>
                                            state.value === values.idProduct
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


            </div>


            <div className="grid grid-cols-1 md:grid-cols-12 gap-4  mt-5">

                <div className="col-span-2">
                    <FormItem
                        label="Cantidad"
                        invalid={(errors.cant && touched.cant) as boolean}
                        errorMessage={errors.cant}
                    >
                        <Field
                            type="number"
                            autoComplete="off"
                            name="cant"
                            placeholder="Cantidad"
                            component={Input}
                        />
                    </FormItem>            
                </div>


                <div className="col-span-3">

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

                <div className="col-span-3">
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


                <div className="col-span-3">

                    <FormItem
                        label="Tipo Movimiento"
                        invalid={
                                (errors.transactionType && touched.transactionType) as boolean
                        }
                            errorMessage={errors.transactionType}
                        >
                        <Field name="transactionType">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={transactionTypes}
                                    value={transactionTypes.filter(
                                        (state:any) =>
                                            state.value === values.transactionType
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

            </div>
            
        </AdaptableCard>
    )
}

export default BasicInformationFields
