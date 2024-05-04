import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import Select from '@/components/ui/Select'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { useAppSelector,useAppDispatch,setUser, CompanyState } from '@/store'
import { useEffect, useState } from 'react'
import { apiGetBranchOrder, apiGetStatusOrder, apiGetStoreOrder } from '@/services/OrderServices'
import { apiGetPeoples } from '@/services/PeopleService'

type FormFieldsName = {    
    idPeople:number
    idPeopleContact:number
}

type CustomerInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {        
        idPeople: number
        idPeopleContact:number
        [key: string]: unknown
    }
}

const CustomerInformationFields = (props: CustomerInformationFields) => {    
    const { values = { idPeople: '', idPeopleContact:''}, touched, errors } = props

    const { avatar, userName, authority, email,companies,companyDefault } = useAppSelector(
        (state) => state.auth.user
    )

    const [people,setPeople] = useState<any>([]);
    const [contactInfo,setContactInfo]=useState<any>([]);
    
    useEffect(()=>{

        const fetchData = async () => {
            await GetPeople();
        }        
          // call the function
        fetchData();

        
    },[]);

    useEffect( ()=>  {

        const fetchData = async () => {
            await GetContactInfo(values.idPeople);        
        }        
          // call the function
        fetchData();

        
    },[values.idPeople]);

    const GetPeople = async ()=>{
        let dataPeople:any = await apiGetPeoples({idCompany:companyDefault?.id});
        let peopleD:any=[];
        dataPeople=dataPeople.data;
        dataPeople.forEach((element:any) => {
            peopleD.push({
                label:element.idDocument+" - "+element.name+" "+element.lastName, 
                value:element.id,
                contactInfo:[{
                    label:`${element.address} ${element.neighborhood} (${element.nameCity}) Tel: ${element.phone}`,
                    value:element.idPeopleContact,
                    phone:element.phone,
                    email:element.email,
                    address:element.address,
                    neighborhood:element.neighborhood,
                    nameCity:element.nameCity
                }]
            });
        });            
        setPeople(peopleD);
    };

    const GetContactInfo = (idCustomer:any)=>{        
        people.forEach((element:any) => {
            if(idCustomer== element.value){                
                setContactInfo(element.contactInfo);
                
                return;
            }
        });
    };

    return (
        <AdaptableCard className="mb-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1">

                    <FormItem
                        label="Cliente"
                        invalid={
                                (errors.idPeople && touched.idPeople) as boolean
                        }
                            errorMessage={errors.idPeople}
                        >
                        <Field name="idPeople">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={people}
                                    value={people.filter(
                                        (state:any) =>
                                            state.value === values.idPeople
                                    )}
                                    onChange={(option) =>{         
                                        console.log(field.name,option?.value);               
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

                <div className="col-span-2">
                <FormItem
                        label="Dirección de Envío"
                        invalid={
                                (errors.idPeopleContact && touched.idPeopleContact) as boolean
                        }
                            errorMessage={errors.idPeopleContact}
                        >
                        <Field name="idPeopleContact">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={contactInfo}
                                    value={contactInfo.filter(
                                        (state:any) =>
                                            state.value === values.idPeopleContact
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

export default CustomerInformationFields
