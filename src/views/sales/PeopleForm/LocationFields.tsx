import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { getStates,getCities } from '../PeopleList/store'
import { useEffect,useRef } from 'react'

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
    idCity: number    
    idState:number    
}

type Options = {
    label: string
    value: string
}[]

type LocationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {        
        idCity: number
        idState: number
        [key: string]: unknown
    }
}

const states:any = []
let cities:any = []


const fetchData = async () => {
    let dataStates:any = await getStates(1); 
    dataStates.forEach((element:any) => {
        states.push({label:element.name, value:parseInt(element.id)});
    });           
    
};

const fetchDataCities = async (idState:any) => {
    let dataCities:any = await getCities(idState);
    cities=[];
    dataCities.forEach((element:any) => {
        cities.push({label:element.name, value:parseInt(element.id)});
    });    
};

fetchData(); 





const LocationFields = (props: LocationFields) => {    
    const { values = { idState: 0, idCity:0}, touched, errors } = props
    
    useEffect(()=>{

        const fetchCities = async () => {
            // Simular un retraso de 500ms antes de llamar a fetchDataCities
            await new Promise(resolve => setTimeout(resolve, 500));    
            await fetchDataCities(values.idState);
        };
    
        fetchCities();        
        

       
    },[values.idState]);

    useEffect(() => {        
    }, []);

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Ubicación y Datos de Contacto</h5>
            <p className="mb-6">Sección para configurar la ubicación del cliente y datos de contacto</p>

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
                                            state.value == values.idState
                                    )}  

                                    onChange={(option) => {
                                        form.setFieldValue(
                                            field.name,
                                            option?.value
                                        );
                                        
                                        fetchDataCities(option?.value); // Consultar ciudades para el estado seleccionado
                                    }}
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
                                            city.value == values.idCity
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
