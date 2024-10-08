import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Bienvenido!</h3>
                <p>¡Ingrese sus credenciales para iniciar sesión!</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
