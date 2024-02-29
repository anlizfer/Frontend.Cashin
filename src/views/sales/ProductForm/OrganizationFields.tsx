import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'

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

const categories = [
    { label: 'Bolsos', value: 'bags' },
    { label: 'Ropa', value: 'cloths' },
    { label: 'Dispositivos', value: 'devices' },
    { label: 'Zapatos', value: 'shoes' },
    { label: 'Relojes', value: 'watches' },
]

const tags = [
    { label: 'trend', value: 'trend' },
    { label: 'unisex', value: 'unisex' },
]

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
                                        (category) =>
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
