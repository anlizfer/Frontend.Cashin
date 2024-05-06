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
}

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {                
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
    const { touched, errors } = props    
    
    
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

            </div>
                   
        </AdaptableCard>
    )
}

export default BasicInformationFields
