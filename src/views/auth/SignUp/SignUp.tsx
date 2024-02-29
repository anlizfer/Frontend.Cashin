import SignUpForm from './SignUpForm'

const SignUp = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Haz parte de Cashin</h3>
                <p>Puedes comenzar gratis a crecer en el mundo del ecommerce.</p>
            </div>
            <SignUpForm disableSubmit={false} />
        </>
    )
}

export default SignUp
