import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { getStates,getCities } from '../CompanyList/store'

/*

address
email
idCity
*/

type FormFieldsName = {
    phone: string    
    address: string   
    email:string 
    neighborhood:string
    idCity: string    
    idState:string    
}

type Options = {
    label: string
    value: string
}[]

type LocationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {        
        idCity: string
        idState:string
        [key: string]: unknown
    }
}

const states:any = []
let cities:any = []


const fetchData = async () => {
    let dataStates:any = await getStates(1); 
    dataStates.forEach((element:any) => {
        states.push({label:element.name, value:element.id});
    });

};

const fetchDataCities = async (idState:any) => {
    let dataCities:any = await getCities(idState);
    dataCities.forEach((element:any) => {
        cities.push({label:element.name, value:element.id});
    });
};



fetchData(); 



const LocationFields = (props: LocationFields) => {    
    const { values = { idState: '', idCity:''}, touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Ubicación y Datos de Contacto</h5>
            <p className="mb-6">Sección para configurar la ubicación de la empresa y datos de contacto</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="col-span-1">
                    <FormItem
                        label="Teléfono"
                        invalid={(errors.phone && touched.phone) as boolean}
                        errorMessage={errors.phone}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="phone"
                            placeholder="Teléfono"
                            component={Input}
                        />
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        label="Email"
                        invalid={(errors.email && touched.email) as boolean}
                        errorMessage={errors.email}
                    >
                        <Field
                            type="email"
                            autoComplete="off"
                            name="email"
                            placeholder="Email"
                            component={Input}
                        />
                    </FormItem>
                </div>
                

                <div className="col-span-1">
                    <FormItem
                        label="Departamento"
                        invalid={
                            (errors.idState && touched.idState) as boolean
                        }
                        errorMessage={errors.idState}
                    >
                        <Field name="idState">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={states}
                                    value={states.filter(
                                        (state:any) =>
                                            state.value === values.idState
                                    )}
                                    onChange={(option) =>{
                                            fetchDataCities(option?.value),
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
                        label="Ciudad"
                        invalid={
                            (errors.idCity && touched.idCity) as boolean
                        }
                        errorMessage={errors.idCity}
                    >
                        <Field name="idCity">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    
                                    options={cities}
                                    value={cities.filter(
                                        (city:any) =>
                                            city.value === values.idCity
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
                        label="Dirección"
                        invalid={(errors.address && touched.address) as boolean}
                        errorMessage={errors.address}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="address"
                            placeholder="Dirección"
                            component={Input}
                        />
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        label="Barrio"
                        invalid={(errors.neighborhood && touched.neighborhood) as boolean}
                        errorMessage={errors.neighborhood}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="neighborhood"
                            placeholder="Barrio"
                            component={Input}
                        />
                    </FormItem>
                </div>

                


            </div>       

        </AdaptableCard>
    )
}

export default LocationFields
