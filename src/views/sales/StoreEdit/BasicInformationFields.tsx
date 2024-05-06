import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import Select from '@/components/ui/Select'
import { useEffect } from 'react'
import { getCities, getStates } from '../companyList/store'

type FormFieldsName = {
    name: string,
    idCity: number
    idState: number
}

type BasicInformationFields = {
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

const BasicInformationFields = (props: BasicInformationFields) => {
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
            <h5>Información Bodega</h5>
            <p className="mb-6">Sección para configurar la información básica de la Bodega.</p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="col-span-4">
                    <FormItem
                        label="Nombre Bodega"
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


                <div className="col-span-4">

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

                <div className="col-span-4">
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

            </div>
                   
        </AdaptableCard>
    )
}

export default BasicInformationFields
