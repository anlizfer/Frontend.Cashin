import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { getLegalForm, getPersonType } from '../CompanyList/store'

type FormFieldsName = {
    name: string    
    nameRepLegal: string    
    nitCompany: string    
    idPersonType:string
    idLegalForm:string
}

type Options = {
    label: string
    value: string
}[]

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {        
        idPersonType: string
        idLegalForm:string
        [key: string]: unknown
    }
}

const personTypes:any = []
const legalForms:any = []


const fetchData = async () => {
    let dataPer:any = await getPersonType(); // Se espera a que se resuelva la promesa de getCategories()
    dataPer.forEach((element:any) => {
        personTypes.push({label:element.name, value:element.id});
    });

    let dataLegForm:any = await getLegalForm();
    dataLegForm.forEach((element:any) => {
        legalForms.push({label:element.name, value:element.id});
    });

};

fetchData(); 



const BasicInformationFields = (props: BasicInformationFields) => {    
    const { values = { idPersonType: '', idLegalForm:''}, touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Información Compañía</h5>
            <p className="mb-6">Sección para configurar la información básica de la  Compañía.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="col-span-1">
                    <FormItem
                        label="Nombre Compañía"
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

                <div className="col-span-1">
                    <FormItem
                        label="Representante Legal"
                        invalid={(errors.nameRepLegal && touched.nameRepLegal) as boolean}
                        errorMessage={errors.nameRepLegal}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="nameRepLegal"
                            placeholder="Representante Legal"
                            component={Input}
                        />
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        label="Nit"
                        invalid={(errors.nitCompany && touched.nitCompany) as boolean}
                        errorMessage={errors.nitCompany}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="nitCompany"
                            placeholder="Nit"
                            component={Input}
                        />
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        label="Tipo Persona"
                        invalid={
                            (errors.idPersonType && touched.idPersonType) as boolean
                        }
                        errorMessage={errors.idPersonType}
                    >
                        <Field name="personType">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={personTypes}
                                    value={personTypes.filter(
                                        (personType:any) =>
                                            personType.value === values.idPersonType
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
                    <FormItem
                        label="Forma Legal"
                        invalid={
                            (errors.idLegalForm && touched.idLegalForm) as boolean
                        }
                        errorMessage={errors.idLegalForm}
                    >
                        <Field name="legalForm">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={legalForms}
                                    value={legalForms.filter(
                                        (legalForm:any) =>
                                            legalForm.value === values.idLegalForm
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
