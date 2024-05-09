import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import Select from '@/components/ui/Select'
import { useEffect, useState } from 'react'
import { getCities, getStates } from '../companyList/store'
import { apiGetBanks } from '@/services/BankAccountServices'

type FormFieldsName = {
    name: string,
    numberAccount:string
    idTypeBankAccount: number
    idBank: number
}

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {        
        idTypeBankAccount: number
        idBank: number
        [key: string]: unknown
    }
}



const BasicInformationFields = (props: BasicInformationFields) => {
    const { values = { idTypeBankAccount: 0, idBank:0}, touched, errors } = props

    const [banks,setBanks]=useState<any>([]);
    const [typeBankAccount,setTypeBankAccount]=useState<any>([{value:1,label:'AHORROS'},{value:2,label:'CORRIENTE'}]);

    useEffect(()=>{   
        getBanksFetch();
    },[]);

    const getBanksFetch= async () => {
        let dataBank:any = await apiGetBanks(); 
        let dBankList:any=[];
        dataBank=dataBank.data;
        dataBank.forEach((element:any) => {
            dBankList.push({label:element.name, value:parseInt(element.id)});
        });          

        setBanks(dBankList);
    }


    return (
        <AdaptableCard divider className="mb-4">
            <h5>Información Cuenta Bancaria</h5>
            <p className="mb-6">Sección para configurar la información básica de la Cuenta Bancaria.</p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="col-span-3">
                    <FormItem
                        label="Nombre Cuenta Bancaria"
                        invalid={(errors.name && touched.name) as boolean}
                        errorMessage={errors.name}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="name"
                            placeholder="Nombre"
                            component={Input}
                        />
                    </FormItem>     
                </div>

                <div className="col-span-3">
                    <FormItem
                        label="Número Cuenta Bancaria"
                        invalid={(errors.numberAccount && touched.numberAccount) as boolean}
                        errorMessage={errors.numberAccount}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="numberAccount"
                            placeholder="Número Cuenta Bancaria"
                            component={Input}
                        />
                    </FormItem>     
                </div>


                <div className="col-span-3">

                    <FormItem
                        label="Banco"
                        invalid={
                            (errors.idBank && touched.idBank) as boolean
                        }
                        errorMessage={errors.idBank}
                    >
                        <Field name="idBank">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={banks}
                                    value={banks.filter(
                                        (state:any) =>
                                            state.value == values.idBank
                                    )}  

                                    onChange={(option) => {
                                        form.setFieldValue(
                                            field.name,
                                            option?.value
                                        );
                                    }}
                                />
                            )}
                        </Field>

                        
                    </FormItem>

                </div>

                <div className="col-span-3">
                    <FormItem
                        label="Tipo Cuenta"
                        invalid={
                            (errors.idTypeBankAccount && touched.idTypeBankAccount) as boolean
                        }
                        errorMessage={errors.idTypeBankAccount}
                    >
                        <Field name="idTypeBankAccount">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    
                                    options={typeBankAccount}
                                    value={typeBankAccount.filter(
                                        (city:any) =>
                                            city.value == values.idTypeBankAccount
                                    )}
                                    onChange={(option) =>
                                        form.setFieldValue(
                                            field.name,
                                            option?.value
                                        )
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
