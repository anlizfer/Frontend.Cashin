import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Checkbox from '@/components/ui/Checkbox'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { getCategories, GetCategoriesResponse } from '../ProductList/store'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    category: string
    tags: Options
    vendor: string
    brand: string
    
}

type OrganizationFieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        category: string
        tags: Options
        [key: string]: unknown
    }
}

let categories:any = [];

const fetchData = async () => {
    let dataCat:any = await getCategories(); // Se espera a que se resuelva la promesa de getCategories()
    dataCat.forEach((element:any) => {
        categories.push({label:element.name, value:element.id});
   });
};

fetchData(); 



const OrganizationFields = (props: OrganizationFieldsProps) => {   

    const { values = { category: '', tags: [] }, touched, errors } = props


    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <h5>Organización</h5>
            <p className="mb-6">Sección para configurar el atributo del producto.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">                    
                    <FormItem
                        label="Categorías"
                        invalid={
                            (errors.category && touched.category) as boolean
                        }
                        errorMessage={errors.category}
                    >
                        <Field name="category">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={categories}
                                    value={categories.filter(
                                        (category:any) =>
                                            category.value === values.category
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

export default OrganizationFields
