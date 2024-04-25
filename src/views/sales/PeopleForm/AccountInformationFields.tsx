import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { getLegalForm, getPersonType } from '../PeopleList/store'

type FormFieldsName = {
    password: string    
    newPassword: string    
    renewPassword: string    
}

type Options = {
    label: string
    value: string
}[]

type AccountInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    pType?:any
    values: {
        [key: string]: unknown
    }
}


const AccountInformationFields = (props: AccountInformationFields) => {    
    const { values = { }, touched, errors,pType } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Información {(pType=='account')?'Usuario':'Cliente'}</h5> 
            <p className="mb-6">Sección para configurar la información de acceso a cashin</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="col-span-1">
                    <FormItem
                        label="Contraseña Anterior"
                        invalid={(errors.password && touched.password) as boolean}
                        errorMessage={errors.password}
                    >
                        <Field
                            type="password"
                            autoComplete="off"
                            name="password"
                            placeholder="Contraseña Anterior"
                            component={Input}
                        />
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        label="Nueva Contraseña"
                        invalid={(errors.newPassword && touched.newPassword) as boolean}
                        errorMessage={errors.newPassword}
                    >
                        <Field
                            type="password"
                            autoComplete="off"
                            name="newPassword"
                            placeholder="Nueva Contraseña"
                            component={Input}
                        />
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        label="Repetir Nueva Contraseña"
                        invalid={(errors.renewPassword && touched.renewPassword) as boolean}
                        errorMessage={errors.renewPassword}
                    >
                        <Field
                            type="password"
                            autoComplete="off"
                            name="renewPassword"
                            placeholder="Nueva Contraseña"
                            component={Input}
                        />
                    </FormItem>
                </div>
                                
            </div>     

            

        </AdaptableCard>
    )
}

export default AccountInformationFields
