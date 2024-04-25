import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { getLegalForm, getPersonType } from '../PeopleList/store'

type FormFieldsName = {
    name: string    
    lastName: string    
    idDocument: number
    idDocumentType: number
    idPersonType:number
    idLegalForm:number
    
}

type Options = {
    label: string
    value: string
}[]

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    pType?:any
    values: {        
        idDocumentType:string
        idPersonType: string
        idLegalForm:string
        [key: string]: unknown
    }
}

const personTypes:any = [];
const legalForms:any = [];
const documentTypes=[
    {label:"CC - Cédula de ciudadanía",value:1},
    {label:"NIT - Número de Identificación Tributaria",value:2},
    {label:"PSPT - Pasaporte ",value:3},
    {label:"TE - Tarjeta de extranjería ",value:4},
    {label:"CE - Cédula de extranjería",value:5},
    {label:"DIE - Documento de identificación extranjero ",value:6},
    {label:"PEP - Permiso especial de permanencia ",value:7},
    {label:"TI - Tarjeta de identidad",value:8},
    {label:"RC - Registro civil",value:9},
    {label:"PPT - Permiso por Protección Temporal",value:10},
    {label:"RIF - Registro Único de Información Fiscal",value:11},
];


const fetchData = async () => {
    let dataPer:any = await getPersonType(); // Se espera a que se resuelva la promesa de getCategories()
    dataPer.forEach((element:any) => {
        personTypes.push({label:element.name, value:parseInt(element.id)});
    });

    let dataLegForm:any = await getLegalForm();
    dataLegForm.forEach((element:any) => {
        legalForms.push({label:element.name, value:parseInt(element.id)});
    });

};

fetchData(); 



const BasicInformationFields = (props: BasicInformationFields) => {    
    const { values = { idPersonType: '', idLegalForm:'', idDocumentType:''}, touched, errors,pType } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Información {(pType=='account')?'Usuario':'Cliente'}</h5> 
            <p className="mb-6">Sección para configurar la información básica de la  Cliente.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="col-span-1">
                    <FormItem
                        label="Nombres"
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
                        label="Apellidos"
                        invalid={(errors.lastName && touched.lastName) as boolean}
                        errorMessage={errors.lastName}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="lastName"
                            placeholder="Apellidos"
                            component={Input}
                        />
                    </FormItem>
                </div>


                <div className="col-span-1">
                    <FormItem
                        label="Tipo Documento"
                        invalid={
                            (errors.idDocumentType && touched.idDocumentType) as boolean
                        }
                        errorMessage={errors.idDocumentType}
                    >
                        <Field name="idDocumentType">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={documentTypes}
                                    value={documentTypes.filter(
                                        (documentType:any) =>
                                            documentType.value === values.idDocumentType
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
                        label="Identificación"
                        invalid={(errors.idDocument && touched.idDocument) as boolean}
                        errorMessage={errors.idDocument}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="idDocument"
                            placeholder="Identificación"
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
                        <Field name="idPersonType">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={personTypes}
                                    value={personTypes.filter(
                                        (personType:any) =>
                                            parseInt(personType.value) === parseInt(values.idPersonType)
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

                <div className="col-span-1">
                    <FormItem
                        label="Forma Legal"
                        invalid={
                            (errors.idLegalForm && touched.idLegalForm) as boolean
                        }
                        errorMessage={errors.idLegalForm}
                    >
                        <Field name="idLegalForm">
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
