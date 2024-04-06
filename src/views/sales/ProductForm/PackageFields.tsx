import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import {
    Field,
    FormikErrors,
    FormikTouched,
    FieldProps,
    FieldInputProps,
} from 'formik'
import type { ComponentType } from 'react'
import type { InputProps } from '@/components/ui/Input'

type FormFieldsName = {    
    sizeH: number
    sizeW: number
    sizeL: number
    weight: number
}

type PackageFieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}



const NumberInput = (props: InputProps) => {
    return <Input {...props} value={props.field.value} />
}


const NumericFormatInput = ({
    onValueChange,
    ...rest
}: Omit<NumericFormatProps, 'form'> & {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    form: any
    field: FieldInputProps<unknown>
}) => {
    return (
        <NumericFormat
            customInput={Input as ComponentType}
            type="text"
            autoComplete="off"
            onValueChange={onValueChange}
            {...rest}
        />
    )
}

const PackageFields = (props: PackageFieldsProps) => {
    const { touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Paquetería</h5>
            <p className="mb-6">Sección para configurar el tamaño y el peso del producto, estos valores se deben diligenciar en cms y el peso en gramos (gr)</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="col-span-1">
                    <FormItem
                        label="Tamaño (Ancho)"
                        invalid={(errors.sizeW && touched.sizeW) as boolean}
                        errorMessage={errors.sizeW}
                    >
                        <Field name="sizeW">
                            {({ field, form }: FieldProps) => {
                                return (
                                    <NumericFormatInput
                                        form={form}
                                        field={field}
                                        placeholder="Ancho (cm)"
                                        customInput={
                                            NumberInput as ComponentType
                                        }
                                        onValueChange={(e) => {
                                            form.setFieldValue(
                                                field.name,
                                                e.value
                                            )
                                        }}
                                    />
                                )
                            }}
                        </Field>
                    </FormItem>

                    
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Tamaño (Alto)"
                        invalid={
                            (errors.sizeH &&
                                touched.sizeH) as boolean
                        }
                        errorMessage={errors.sizeH}
                    >
                        <Field name="sizeH">
                            {({ field, form }: FieldProps) => {
                                return (
                                    <NumericFormatInput
                                        form={form}
                                        field={field}
                                        placeholder="Alto (cm)"
                                        customInput={
                                            NumberInput as ComponentType
                                        }
                                        onValueChange={(e) => {
                                            form.setFieldValue(
                                                field.name,
                                                e.value
                                            )
                                        }}
                                    />
                                )
                            }}
                        </Field>
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        label="Tamaño (Largo)"
                        invalid={
                            (errors.sizeL &&
                                touched.sizeL) as boolean
                        }
                        errorMessage={errors.sizeL}
                    >
                        <Field name="sizeL">
                            {({ field, form }: FieldProps) => {
                                return (
                                    <NumericFormatInput
                                        form={form}
                                        field={field}
                                        placeholder="Largo (cm)"
                                        customInput={
                                            NumberInput as ComponentType
                                        }
                                        onValueChange={(e) => {
                                            form.setFieldValue(
                                                field.name,
                                                e.value
                                            )
                                        }}
                                    />
                                )
                            }}
                        </Field>
                    </FormItem>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="col-span-1">
                    <FormItem
                        label="Peso (gr)"
                        invalid={(errors.weight && touched.weight) as boolean}
                        errorMessage={errors.weight}
                    >
                        <Field name="weight">
                            {({ field, form }: FieldProps) => {
                                return (
                                    <NumericFormatInput
                                        form={form}
                                        field={field}
                                        placeholder="Peso (gr) "
                                        customInput={
                                            NumberInput as ComponentType
                                        }                                        
                                        onValueChange={(e) => {
                                            form.setFieldValue(
                                                field.name,
                                                e.value
                                            )
                                        }}
                                    />
                                )
                            }}
                        </Field>
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default PackageFields
