import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from '@/utils/hooks/useAuth'
import type { CommonProps } from '@/@types/common'

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type SignUpFormSchema = {
    name: string
    password: string
    email: string
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter your user name')
                      .matches(/^[a-zA-Z0-9.]+$/, 'Solo se permiten letras, números y el carácter "."')
                      .min(5, 'El nombre de usuario debe tener al menos 6 caracteres'),
    email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email'),
    password: Yup.string().required('Please enter your password').min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: Yup.string().required('Please enter your password').min(6, 'La contraseña debe tener al menos 6 caracteres').oneOf(
        [Yup.ref('password')],
        'Tus contraseñas no coinciden'
    ),
})

const SignUpForm = (props: SignUpFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/login' } = props

    const { signUp } = useAuth()

    const [message, setMessage] = useTimeOutMessage()

    const handleKeyDown = (event:any) => {
        const allowedChars = /^[a-zA-Z0-9]$/;
        const key = event.key;
        // Permitir el uso de teclas de control como retroceso y borrar
        if (event.ctrlKey || event.metaKey || event.altKey || key === "Backspace" || key === "Delete") {
            return;
        }
        if (!allowedChars.test(key)) {
            event.preventDefault();
        }
    };
    
    
    const handlePaste = (event:any) => {
        event.preventDefault();
        const text = event.clipboardData.getData('text/plain');
        const allowedChars = /^[a-zA-Z0-9]+$/;
        if (!allowedChars.test(text)) {
            // Si el texto pegado contiene caracteres no permitidos, no lo pega.
            return;
        }
        // Pega el texto.
        document.execCommand('insertText', false, text);
    };

    const onSignUp = async (
        values: SignUpFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const { name, password, email } = values
        setSubmitting(true)
        const result = await signUp!({ name, password, email })        
        if (result?.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    name: 'admin1',
                    password: '123Qwe1',
                    confirmPassword: '123Qwe1',
                    email: 'test@testmail.com',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="Usuario"
                                invalid={errors.name && touched.name}
                                errorMessage={errors.name}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Nombre de Usuario"
                                    component={Input}
                                    onKeyDown={(e:any) => handleKeyDown(e)} 
                                    onPaste={(e:any) => handlePaste(e)} 
                                />
                            </FormItem>
                            <FormItem
                                label="Email"
                                invalid={errors.email && touched.email}
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
                            <FormItem
                                label="Contraseña"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Contraseña"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <FormItem
                                label="Confirmar Contraseña"
                                invalid={
                                    errors.confirmPassword &&
                                    touched.confirmPassword
                                }
                                errorMessage={errors.confirmPassword}
                            >
                                <Field
                                    autoComplete="off"
                                    name="confirmPassword"
                                    placeholder="Confirmar Contraseña"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting
                                    ? 'Creando Cuenta...'
                                    : 'Crear Cuenta Cashin'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>¿Ya tienes una cuenta? </span>
                                <ActionLink to={signInUrl}>Login</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUpForm
